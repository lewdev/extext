const USER_CONFIG_REF = "extext-config";

// my commands
const runCode = () => {
  const content = editor.getValue()

  //save content before running
  userConfig.content = content;
  localStorage.setItem(USER_CONFIG_REF, JSON.stringify(userConfig));

  //run code in iframe
  f.srcdoc = content;
};

const saveToFile = () => {
  const content = editor.getValue();
  const mimeType = "text";
  const fileName = "extext-" + getTimestamp() + ".html";

  //Code from: https://stackoverflow.com/a/64908345/1675237
  const a = document.createElement('a') // Create "a" element
  const blob = new Blob([content], {type: mimeType}) // Create a blob (file-like object)
  const url = URL.createObjectURL(blob) // Create an object URL from blob
  a.setAttribute('href', url) // Set "a" element link
  a.setAttribute('download', fileName) // Set download filename
  a.click() // Start downloading
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
    style:'matchhighlight',
  },
  extraKeys: {
    //run code
    "Cmd-'": runCode,
    "Ctrl-'": runCode,

    'Cmd-S': saveToFile,
    'Ctrl-S': saveToFile,

    'Shift-Alt-Up': "duplicateLine",
    'Shift-Alt-Down': "duplicateLine",

    "Ctrl-D": "deleteLine",
    "Cmd-D": "deleteLine",

    "Ctrl-Space": "autocomplete",
  },
});

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
};

// top bar buttons
run.onclick = () => runCode();
save.onclick = () => saveToFile();
horiz.onclick = toggleHorizLayout;


// util methods
const pad = n => n < 10 ? "0" + n : n;

const getTimestamp = () => {
  const d = new Date();
  const dateAttributes = "FullYear, Month, Date, -, Hours, Minutes, Seconds".split(", ");
  return dateAttributes.map(a => a === '-' ? a : pad(d["get" + a]())).join("");
};

// console.log(CodeMirror.keyMap.default, CodeMirror.keyMap.sublime);