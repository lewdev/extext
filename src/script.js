var editor = CodeMirror.fromTextArea(c, {
  autofocus: true,
  mode: 'htmlmixed',
  theme: 'material-darker',
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
  highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
});

const keyshortcuts = {
  //run code
  "Ctrl-Enter": () => f.srcdoc = editor.getValue(),

  //indenting
  "Shift-Tab": "indentLess",
  "Tab": "indentMore",

  //toggle comments
  'Ctrl-/': "toggleComment",
};

CodeMirror.keyMap.default = Object.assign(CodeMirror.keyMap.default, keyshortcuts);