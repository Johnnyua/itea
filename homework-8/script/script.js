window.addEventListener("load", init);

function init() {

  if (!localStorage.admin) {
    localStorage.setItem("admin", "admin");
    document.cookie = "admin=admin";
  }

  const btnLogin = document.querySelector("#btnlogin");
  const text = document.querySelector(".text");
  const modal = document.querySelector(".modal");
  const errorMsg = document.querySelector("#error");

  btnLogin.addEventListener("click", logIn);

  function logIn(e) {
    const inputText = document.querySelector("#textlogin");
    let item = localStorage.getItem(inputText.value.toLowerCase());

    if (!item) {
      const allCookies = document.cookie;
      item = allCookies.match(new RegExp(inputText.value.toLowerCase()));
    }

    if (item) {
      modal.style.display = "none";
      text.innerHTML = `${inputText.value} is logged in`;
    } else {
      errorMsg.innerHTML = `Username ${inputText.value} is wrong!`;
    }
  }
}