const USER_CONFIG_REF = "extext-config";

let userConfig = {
  useHorizLayout: false,
  content: "",
};

onload = () => {
  let storedConfig = localStorage.getItem(USER_CONFIG_REF);
  if (storedConfig) userConfig = JSON.parse(storedConfig);
  const { content, useHorizLayout } = userConfig;

  // set the last run content
  editor.setValue(content);

  if (useHorizLayout) {
    document.body.className = 'horiz';
    horiz.checked = true;
  }

  //if user is already seeing the hash in the URL, it will render the shortcuts
  if (location.href.includes("#key-shortcuts")) renderKeyShortcuts();
};

// my commands
const runCode = () => {
  const content = editor.getValue()

  //save content before running
  userConfig.content = content;
  localStorage.setItem(USER_CONFIG_REF, JSON.stringify(userConfig));

  //run code in iframe
  f.srcdoc = content;
};

const capCamel = s => s.charAt(0).toUpperCase() + s.substring(1).split(/(?=[A-Z])/).join` `;

const mapToTableRows = (map, isSublime) => Object.keys(map).map(key => {
  const val = map[key];
  const action = (
    val === runCode ? "Run code" :
    val === showKeyShortcuts ? "Show Key Shortcuts" :
    capCamel(val));
  const isOverridden = isSublime && editor.options.extraKeys[key];
  return `<tr><td>${key}</td><td>${action}${isOverridden ? " <span class='overridden'>(overridden)</span>" : ""}</td></tr>`;
}).join("");

const renderKeyShortcuts = () => {
  const keyShortcutsTable = document.querySelector(".modal-window > div > .modal-content");
  keyShortcutsTable.innerHTML = `<table class="keyshortcuts-table"><thead><tr><th>Keys</th><th>Action</th></tr></thead>
    <tbody>
      ${mapToTableRows(editor.options.extraKeys)}
      <tr><th colspan="2" style="padding-top:.5rem">Sublime Keyshortcuts</th></tr>
      ${mapToTableRows(CodeMirror.keyMap.sublime, true)}
    </tbody>
  </table>`;
};
keyShortcuts.onclick = e => { e.preventDefault(); showKeyShortcuts(); };
const showKeyShortcuts = () => {
  window.location = "#key-shortcuts";
  renderKeyShortcuts();
};
const hideKeyShortcuts = () => {
  window.location = "#";
  editor.focus();
};
document.body.onkeydown = e => {
  if (e.keyCode === 27) hideKeyShortcuts();//Esc
  else if (e.ctrlKey && e.keyCode === 190) showKeyShortcuts(); //Ctrl+.
};

const saveToFile = () => {
  const content = editor.getValue();
  const mimeType = "text";
  const fileName = prompt("Enter filename", "extext-" + getTimestamp() + ".html");
  if (!fileName) return;

  //Code from: https://stackoverflow.com/a/64908345/1675237
  const a = document.createElement('a'); // Create "a" element
  const blob = new Blob([content], {type: mimeType}); // Create a blob (file-like object)
  const url = URL.createObjectURL(blob); // Create an object URL from blob
  a.setAttribute('href', url); // Set "a" element link
  a.setAttribute('download', fileName); // Set download filename
  a.click(); // Start downloading
};

const toggleHorizLayout = e => {
  const { checked } = e.target;
  userConfig.useHorizLayout = checked;
  document.body.className = checked ? 'horiz' : '';
};

const editor = CodeMirror.fromTextArea(c, {
  autofocus: true,
  mode: {name: "htmlmixed", globalVars: true}, //enables javascript-hint
  theme: 'material-darker',
  keyMap: "sublime",
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
  indentWithTabs: false,
  smartIndent: false,//it just indents to last indent level now
  matchBrackets: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
  matchTags: true,
  styleActiveLine: true,
  //for text match-highlighter and show on scrollbar.
  highlightSelectionMatches: {
    minChars: 2,
    showToken: /\w/,
    annotateScrollbar: true,
    style: 'matchhighlight',
  },
  extraKeys: {
    //run code
    "Cmd-'": runCode,
    "Ctrl-'": runCode,
    'Cmd-S': runCode,
    'Ctrl-S': runCode,
    'Cmd-Enter': runCode,
    'Ctrl-Enter': runCode,

    'Shift-Alt-Up': "duplicateLine",
    'Shift-Alt-Down': "duplicateLine",
    'Ctrl-.': showKeyShortcuts,

    "Ctrl-D": "deleteLine",
    "Cmd-D": "deleteLine",

    "Ctrl-Space": "autocomplete",
  },
});

// top bar buttons
run.onclick = () => runCode();
save.onclick = () => saveToFile();
horiz.onclick = toggleHorizLayout;

// util methods
const pad = n => n > 9 ? n : "0" + n;

const getTimestamp = () => {
  const format = "FullYear Month Date - Hours Minutes Seconds".split(" ");
  const date = new Date();
  //getMonth() needs to add 1 since January = 0, enabled '-' dash too
  return format.map(a => a === '-' ? a : pad(
    date["get" + a]() + (a === "Month" ? 1 : 0)
  )).join("");
};
//example output: "20220410-170928"
