const main = (() => {
  const APP_DATA_KEY = "extext";

  const outputDiv = document.getElementById("output");
  const formOutput = document.getElementById("formOutput");
  const mainInputs = document.getElementById("mainInputs");
  const runBtn = document.getElementById("runBtn");
  const navbar = document.getElementById("navbar");
  const navbarToggleBtn = document.getElementById("navbarToggleBtn");

  let count = 0;
  let data = {};

  window.onload = () => {
    loadData();
    displayData();

    runBtn.onclick = () => {
      console.log('ran');
      count++;
      getDataByColumn(mainInputs, "dropdown", data);
      getDataByColumn(mainInputs, "title", data);
      displayData();
    };

    const OPEN_CLASS = 'show';
    const addOffClick = (e, callback) => {
      const offClick = evt => {
        if (e !== evt) {
          callback();
          document.removeEventListener('click', offClick)
        }
      }
      document.addEventListener('click', offClick)
    };
    const handleClick = (e) => {
      const toggleMenu = () => navbar.classList.toggle(OPEN_CLASS)
      //e.stopPropagation()
      if (!navbar.classList.contains(OPEN_CLASS)) {
        toggleMenu();
        addOffClick(e, toggleMenu)
      }
    };
    navbarToggleBtn.onclick = handleClick;
  }
  const displayData = () => {
    outputDiv.innerHTML = `Ran ${count} times.`;
    populateByColumn(formOutput, "dropdown", data);
    populateByColumn(formOutput, "title", data);
  }
  const loadData = () => {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) {
        data = parsedData;
      }
    }
  }
  const getDataByColumn = (parentElem, colName, obj) => {
    const input = parentElem.querySelector("." + colName);
    if (input) {
      const isCheckbox = input.getAttribute("type") === "checkbox";
      obj[colName] = isCheckbox ? (input.checked ? 'TRUE' : 'FALSE') : input.value;
    }
    else obj[colName] = "";
  };
  const populateByColumn = (parentElem, colName, obj, leaveBlank) => {
    if (!parentElem) return;
    var elemList = parentElem.querySelectorAll("." + colName);
    var value = obj[colName];
    value = value ? value : '';
    if (elemList) {
      var i, elem, size = elemList.length;
      for (i = 0; i < size; i++) {
        elem = elemList[i];
        if (elem.tagName === "I") {
          elem.className = colName + " " + (value === "TRUE" ? "far fa-check-square" : "far fa-square")
        }
        else if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
          if (elem.getAttribute("type") === "checkbox") {
            elem.checked = value === "TRUE";
          }
          else {
            elem.value = value;
          }
        }
        else if (elem.tagName === "SELECT") {
          var options = elem.querySelectorAll("option")
            , j, optionSize = options.length, selectedIndex = -1;
          for (j = 0; j < optionSize; j++) {
            if (value === options[j].value) {
              options[j].selected = true;
              selectedIndex = j;
              break;
            }
          }
          elem.value = value;
          elem.selectedIndex = selectedIndex;
          //$(elem).val(value);
          trigger(elem, "change");
        }
        else {
          if (value && (value + "").trim() !== "") {
            value = value
              .replace(/\n/g, '<br/>')
              .replace(/\s\s/g, '&nbsp;')
            ;
          }
          else {
            value = leaveBlank ? "" : 'N/A';
          } 
          elem.innerHTML = value;
        }
      }
    }
  };
  const saveData = () => window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  const clearData = () => window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
})();