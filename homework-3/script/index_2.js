
    // Запросите у пользователя ввести какую-то фразу. 
    // Отобразите каждое отдельное слово в виде списка ul li. 
    // Также отобразите первое слово UPPERCASE, а последние 2 с маленькой. 
    // Найдите все буквы "а" их количество в модальное окно. 

const phrase = prompt("Enter any phrase", 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, Consequatur?');
const pattern = /[^A-Za-z0-9]+/;
const patternSearch = "[AaАа]";
const modal = document.querySelector("#modal");
const modalText = document.querySelector(".modal-body");
const btnModalClose = document.querySelectorAll(".btn-close");
const value = document.querySelector("#value");

//modal.style.display = 'block';

(function createList() {
    if (phrase === null) {
        value.innerHTML = 'Enter any phrase or confirm default';    
    } else {
        let array = phrase.split(pattern);
        const filterArray = array.filter(item => { return item })
        filterArray[0] = filterArray[0].toUpperCase();
        filterArray[filterArray.length - 1] =
          filterArray[filterArray.length - 1][0].toLowerCase() + filterArray[filterArray.length - 1].slice(1);
        filterArray[filterArray.length - 2] =
          filterArray[filterArray.length - 2][0].toLowerCase() + filterArray[filterArray.length - 2].slice(1);
       
        let list = "<ul>";
        filterArray.forEach((item, index) => {
          if (item.length !== 0) {
            list += "<li>" + item + "</li>";
          }
        });
        list += "</ul>";
        value.innerHTML = list;
        array = [...searchReg(phrase)];
      modalText.innerHTML = 'Value = ' + array.length;
      setTimeout(modalOpen, 3000);  
    }
}());


function searchReg(string) {
    const patt = new RegExp(patternSearch, "g");
    return result = string.match(patt);
}

function modalOpen() {
  modal.style.display = "block"; 
}

function modalClose() {
    modal.style.display = "none";  
}
for (let i = 0; i < btnModalClose.length; i++) {
    btnModalClose[i].onclick = modalClose;
}




