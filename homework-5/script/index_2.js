/*
    1. Создайте 5 блоков с текстом. Добавьте в каждый из блоков кнопку для его удаления.
    Используйте только один обработчик.

    2. Доработайте пример 004_Attr_Tech.html таким образом, чтобы при наведении на span элементы,
    подсказка сплыва под ними, а не в модальном окне. Используйте addEventListener 
*/
// 1.
const btnRemove = document.querySelectorAll("#removeBlock");
const container = document.querySelector(".container");
const mainDiv = document.querySelector("#main-div");
let popup;

for (let i = 0; i < btnRemove.length; i++) {
  btnRemove[i].addEventListener('click', removeBlock);
}

function removeBlock() {
  this.parentElement.remove();
  if (container.childElementCount === 0) {mainDiv.style.display = 'block'}
}

//2.

mainDiv.addEventListener('mouseover', showPopup);
function showPopup(e) {
    var target = (e && e.target) || window.event.srcElement;
    var dataToggleId = target.getAttribute("data-tooltip");
    if (!dataToggleId) {
      return;
    }
    createPopup(target);
  };

function createPopup(e) {
  const clientRect = e.getBoundingClientRect();
  popup = document.createElement('span');
  popup.innerHTML = e.innerHTML;
  popup.classList.add('popup');
  popup.style.top = clientRect.bottom + 3 + 'px';
  popup.style.left = clientRect.left + 'px';
  popup.style.transform = "translateY(" + (clientRect.top) + "px)";
  document.body.appendChild(popup);
  
}
  
mainDiv.addEventListener('mouseout', hidePopup);

function hidePopup() {
  if (popup) {
    popup.remove();
    popup.null;    
  }
  
}