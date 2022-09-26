window.addEventListener("load", async (e) => {
  await getCharacterByFilter(e, currentPage);
});

// const findBtn = document.querySelector('.btn-find-сharacters');
const characterContainerList = document.querySelector(
  ".сharacter-container-list"
);
const characterContainer = document.querySelector(".сharacter-container");
const characterSection = document.querySelector(".content-section");
const loader = document.querySelector(".loader");
let currentPage = 1;
let maxPage = 1;
let coords;

async function getCharacters(url = "", additionalParam = "") {
  try {
    const response = await fetch(url + additionalParam);
    if (!response.ok) {
      throw new Error("Error!");
    }
    const characters = await response.json();
    return characters;
  } catch (err) {
    return err;
  }
}

async function getCharacterByFilter(e, curPage) {
  currentPage = curPage;
  const searchParam = currentPage === 1 ? "" : `?page=${currentPage}`;
  characterContainerList.replaceChildren();
  const сharacterNameInput = document.querySelector(".сharacter-input");
  loader.style.display = "block";

  const url = "https://swapi.dev/api/people/";
  const characters = await getCharacters(url + searchParam);
  if (characters.name === "Error") {
    loader.style.display = "none";
    return (characterContainer.innerHTML = characters.message);
  }
  console.log(characters);
  maxPage = Math.ceil(characters.count / 10);
  loader.style.display = "none";
  const charUrl = characters.url;
  const charResults = characters.results;

  const char = createCharacters(charResults);

  characterContainerList.append(char);
  createPagination(currentPage, maxPage);
  loader.style.display = "none";
}

function createCharacters(results) {
  const charactersList = document.createElement("ul");
  charactersList.classList.add("сharacter-list");
  for (let item of results) {
    const charactersItemContainer = document.createElement("div");
    charactersItemContainer.classList.add("сharacter-items-container");
    const charactersItem = document.createElement("li");
    const charactersItemLink = document.createElement("a");
    charactersItemLink.setAttribute("href", item.url);
    charactersItem.innerHTML = item.name;
    charactersItem.classList.add("сharacter-items");
    charactersItemContainer.addEventListener("click", openCharacterCard);
    charactersItemContainer.append(charactersItem, charactersItemLink);
    charactersList.append(charactersItemContainer);
  }
  return charactersList;
}

function createPagination(currentPage, maxPage) {
  const paginationContainer = document.querySelector(".pagination-container");
  const paginationNumbers = document.querySelector(
    ".pagination-numbers-container"
  );
  paginationNumbers.innerHTML = "";
  paginationContainer.classList.add("active");
  const paginationNumbersList = document.createElement("ul");
  paginationNumbersList.classList.add("pagination-numbers-list");
  for (let i = currentPage - 1; i <= currentPage + 2; i++) {
    if (i > maxPage) {
      break;
    }
    if (i < 1) {
      continue;
    }
    const paginationNumbersItem = document.createElement("li");
    paginationNumbersItem.classList.add("pagination-numbers-item");
    if (i === currentPage) {
      paginationNumbersItem.classList.add("active");
    }
    paginationNumbersItem.innerHTML = i;
    paginationNumbersItem.addEventListener("click", (e) => {
      getCharacterByFilter(e, i);
    });
    paginationNumbersList.append(paginationNumbersItem);
  }
  paginationNumbers.append(paginationNumbersList);
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);
  firstBtn.addEventListener("click", firstPage);
  lastBtn.addEventListener("click", lastPage);
}

function nextPage(e) {
  getCharacterByFilter(e, currentPage + 1);
}

function prevPage(e) {
  getCharacterByFilter(e, currentPage - 1);
}

function firstPage(e) {
  getCharacterByFilter(e, 1);
}

function lastPage(e) {
  getCharacterByFilter(e, maxPage);
}

function openCharacterCard(e) {
  e.target.classList.toggle("card-active");
}

async function openCharacterCard(e) {
  const elem = e.currentTarget;
  coords = elem.getBoundingClientRect();
  const charSection = document.querySelector(".content-section");
  const getCharacterUrl = elem.lastElementChild.href;
  const charInfo = await getCharacters(getCharacterUrl);
  console.log(charInfo);
  const charInfoTable = await createCharacterInfo(charInfo);
  characterSection.appendChild(charInfoTable);
  loader.style.display = "none";
}

async function createCharacterInfo(obj) {
  characterContainer.classList.add("display-none");
  loader.style.display = "block";
  const charInfoContainer = document.createElement("div");
  const charBackBtn = document.createElement("button");

  charInfoContainer.classList.add(
    "character-info-container",
    "character-info-open"
  );

  charBackBtn.classList.add("btn-character-info-back");

  charBackBtn.innerHTML = "Back";
  const existChar = JSON.parse(sessionStorage.getItem(obj.name));

  if (existChar) {
    existChar ? (obj = existChar) : obj;
  } else {
    const charPlanet = await getCharacters(obj.homeworld);
    obj.homeworld = charPlanet.name;
    const charSpecies =
      obj.species.length !== 0 ? await getCharacters(obj.species[0]) : "";
    obj.species = charSpecies.name;
    const charFilms = await Promise.all(
      obj.films.map(async (item) => {
        const charFilm = await getCharacters(item);
        return charFilm;
      })
    );
    obj.films = charFilms;
  }

  charBackBtn.addEventListener("click", closeCharacterInfo);
  // Create character info table: start
  let charTable = `<table>
            <caption>${obj.name}</caption>
            <tbody>
                <tr>
                    <td>Birsday Year</td>
                    <td>${obj.birth_year}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${obj.gender}</td>
                </tr>
                <tr>
                    <td>Films</td>`;
  const charFilmsList = document.createElement("ul");
  for (let item of obj.films) {
    const charFilmsItem = document.createElement("li");
    const charFilmsItemLink = document.createElement("a");
    charFilmsItemLink.setAttribute("href", `films.html#${item.episode_id}`);
    charFilmsItemLink.innerHTML = item.title;
    charFilmsItem.append(charFilmsItemLink);
    charFilmsList.append(charFilmsItem);
  }

  charTable =
    charTable +
    `<td>${charFilmsList.outerHTML}</td>
                </tr>
                <tr>
                    <td>Planet</td>
                    <td>${obj.homeworld}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>${obj.species || ""}</td>
                </tr>
            </tbody>
            <tfoot>
            <tfoot>
            
        </table>`;
  charInfoContainer.innerHTML = charTable;
  charInfoContainer.append(charBackBtn);

  // Create new Character Object and save to session storage
  if (!existChar) {
    const newCharacter = new Character(
      obj.name,
      obj.birth_year,
      obj.gender,
      obj.films,
      obj.homeworld,
      obj.species
    );
    sessionStorage.setItem(newCharacter.name, JSON.stringify(newCharacter));
  }
  return charInfoContainer;
}

function closeCharacterInfo(e) {
  const parentEl = e.target.parentElement;
  characterContainer.classList.remove("display-none");
  characterSection.removeChild(parentEl);
  window.scrollTo(0, coords.top);
}

class Character {
  constructor(name, year, gender, films, planet, species) {
    this.name = name;
    this.birth_year = year;
    this.gender = gender;
    this.films = films;
    this.homeworld = planet;
    this.species = species;
  }
}
