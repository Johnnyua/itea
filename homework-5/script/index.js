/*
Создайте ссылку и див с текстом внутри, который изначально при загрузке страницы будет скрыт.
При клике на ссылку див появляется, если повторно нажать ссылку див и текст должны пропасть.
Также создайте кнопку, которая будет отменять выполнение обработчика клика по ссылке.
*/
const link = document.querySelector('#link');
const block = document.querySelector("#block");
const btnReset = document.querySelector("#reset");

link.addEventListener('click', showBlock);
btnReset.addEventListener("click", removeEventLink);

function showBlock(event) {
    if (!block.classList.contains("active")) {
      block.classList.add("active");
    } else {
        block.classList.remove("active");
    }
     event.preventDefault();
}

function removeEventLink() {
    link.removeEventListener('click', showBlock);
}
