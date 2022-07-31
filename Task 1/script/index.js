const result = document.getElementById("result");
const unsortedList = document.getElementById("unsort-programlg-list");
const selectElement = document.getElementById("delete-element");
const input = document.getElementById("add-element");

let currentValue = "";
let firstElement = "";
let lastElement = "";


function addValueFromListToSelect() {
  selectElement.innerHTML = "";
  for (let i = 0; i < unsortedList.childNodes.length; i++) {
    if (unsortedList.childNodes[i].nodeName === "LI") {
      const option = document.createElement("option");
      option.value = unsortedList.childNodes[i].innerHTML;
      option.innerHTML = unsortedList.childNodes[i].innerHTML;

      selectElement.appendChild(option);
    }
    }
    firstElement = selectElement.childNodes.firstChild;
    lastElement = selectElement.childNodes.lastChild;
}
addValueFromListToSelect();

function checkChildElement(elem, route) {
  if (elem.nodeName !== "LI") {
    elem = elem[route];
    return checkChildElement(elem, route);
  }
  return elem;
}

function addTextToResult(text, elem = null) {
  result.innerHTML = text;
  currentValue = elem;
}

function selectFirstElement() {
  const firstElement = unsortedList.firstChild;
  foundElem = checkChildElement(firstElement, "nextSibling");
  text = "First element: " + foundElem.innerHTML;
  addTextToResult(text, foundElem);
  return firstElement;
}

function selectLastElement() {
  const lastElement = unsortedList.lastChild;
  foundElem = checkChildElement(lastElement, "previousSibling");
  text = "Last element: " + foundElem.innerHTML;
  addTextToResult(text, foundElem);
}

function selectNextElement() {
  const nextElement =
    !currentValue
      ? unsortedList.firstChild.nextSibling
      : currentValue.nextSibling;
  foundElem = checkChildElement(nextElement, "nextSibling");
  text = "Next element: " + foundElem.innerHTML;
  addTextToResult(text, foundElem);
}

function selectPreviousElement() {
  const previousElement = !currentValue
    ? unsortedList.lastChild.previousSibling
    : currentValue.previousSibling;
  foundElem = checkChildElement(previousElement, "previousSibling");
  text = "Previous element: " + foundElem.innerHTML;
  addTextToResult(text, foundElem);
}

function addElement() {
  if (input.value !== "") {
    for (let i = 0; i < unsortedList.childNodes.length; i++) {
      if (
        unsortedList.childNodes[i].nodeName === "LI" &&
        unsortedList.childNodes[i].innerText.toLowerCase() ===
          input.value.toLowerCase()
      ) {
        text = "Item " + input.value + " already added";
        return addTextToResult(text);
      }
    }

    var newItem = document.createElement("li");
    newItem.classList.add("programlg-item");
    newItem.innerHTML = input.value;
    unsortedList.appendChild(newItem);
    addValueFromListToSelect();
    text = "Added item - " + input.value;
  } else {
    text = "Input  should not be empty";
  }
  addTextToResult(text, newItem);
}

function addTopElement() {
  if (input.value !== "") {
    for (let i = 0; i < unsortedList.childNodes.length; i++) {
      if (
        unsortedList.childNodes[i].nodeName === "LI" &&
        unsortedList.childNodes[i].innerText.toLowerCase() ===
          input.value.toLowerCase()
      ) {
        text = "Item " + input.value + " already added";
        return addTextToResult(text);
      }
    }

    var newItem = document.createElement("li");
    newItem.classList.add("programlg-item");
    newItem.innerHTML = input.value;
    unsortedList.insertBefore(newItem, unsortedList.firstChild);
    addValueFromListToSelect();
    text = "Added item - " + input.value;
  } else {
    text = "Input  should not be empty";
  }
  addTextToResult(text, newItem);
}

function deleteElement() {
  for (let i = 0; i < unsortedList.childNodes.length; i++) {
    if (unsortedList.childNodes[i].innerHTML === selectElement.value) {
      text = unsortedList.childNodes[i].innerHTML + " was removed";
      unsortedList.removeChild(unsortedList.childNodes[i]);
      break;
    }
  }
  addValueFromListToSelect();
  addTextToResult(text);
}
