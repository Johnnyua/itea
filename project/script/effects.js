window.addEventListener("load",init);

function init() {
  const cardParagraph = document.querySelectorAll('.card p');
  burger.addEventListener("click", openCloseMobileMenu);
  cardParagraph.forEach(item => { item.addEventListener("click", toggleCard); })
}

function openCloseMobileMenu(e) {
  const mobileNav = document.querySelector(".main-navbar-container-mobile");
    mobileNav.classList.toggle("menu-open");
    burger.classList.toggle("burger-close");
    e.currentTarget.children[0].classList.toggle("burger-rotate-positive");
    e.currentTarget.children[1].classList.toggle("display-none");
    e.currentTarget.children[2].classList.toggle("burger-rotate-negative");
    
}

function toggleCard(e) {
  const cards = document.querySelectorAll(".card");
  const currentCardFlipper = e.currentTarget.closest(".card-flipper");
  currentCardFlipper.classList.toggle("card-open");
  for (let item of currentCardFlipper.children) {
    item.classList.toggle("card-position");
  }
}