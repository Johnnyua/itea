const btn = document.querySelector("#get-date");
const inputDate = document.querySelector("#date");
const paragraph = document.querySelector(".h5");

inputDate.addEventListener("change", setDateText);
btn.addEventListener("click", getWeekNumber);

function setDateText(e) {
    const inputText = document.querySelector("#date-text");
    inputText.value = inputDate.value;
    return inputText;
}

function getWeekNumber(e) {
    const date = setDateText();
    if (!!date.value) {
      const newDate = new Date(date.value);
      const numberOfWeek = getNumberDay(newDate.getDay());

      paragraph.innerHTML =
        numberOfWeek +
        " - " +
        newDate.toLocaleString("en-US", { weekday: "long" });
    } else {
      paragraph.innerHTML = "Select date";
    }
}


// Second variant

// function getWeekNumber(e) {
//   if (!!inputDate.valueAsDate) {
//     const newDate = inputDate.valueAsDate;
//     const numberOfWeek = getNumberDay(newDate.getDay());

//     paragraph.innerHTML =
//       numberOfWeek +
//       " - " +
//       newDate.toLocaleString("en-US", { weekday: "long" });
//   } else {
//     paragraph.innerHTML = "Select date";
//   }
// }

function getNumberDay(day) {
  if (day === 0) {
    day = 7;
  }
  return day;
}
