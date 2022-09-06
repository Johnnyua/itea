// регистрация события загрузки документа.
if (window.addEventListener) window.addEventListener("load", init, false);
else if (window.attachEvent) window.attachEvent("onload", init);

// регистрация обработчиков событий элементов формы.
function init() {
    form1.addEventListener("change", validate);
    document
      .querySelector("[type=submit]")
      .addEventListener("click", onSubmit);
 }

// метод проверки значения в элементе по регулярному выражению.
function validate(e) {
    let invalid = false;
    const elem = e.target || e;
    let res = true;
    const pattern = new RegExp(elem.pattern, elem.dataset.flag);

    if (!!elem.pattern) {
        res = pattern.test(elem.value);
    }
    
    if (res === false) {
        elem.className = "invalid";
        invalid = true;
    } // установка CSS класса 
    else {
        elem.className = "valid";
        invalid = false; 
    }
    return invalid;
}

// событие при отправке формы на сервер.
function onSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < form1.length; i++) {
        let invalid = validate(form1[i]);
        if (invalid){return false}
    }
    form1.submit();
}
