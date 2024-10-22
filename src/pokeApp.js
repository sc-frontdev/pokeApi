const URL = "https://pokeapi.co/api/v2/pokemon/";

const form = document.getElementById("form");
const input = document.getElementById("input");
const error = document.getElementById("error");

const nombre = document.getElementById("nombre");
const imagen = document.getElementById("img");
const tipos = document.getElementById("tipos");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");

const listaPokemon = document.getElementById("header");

for (let i = 1; i <= 25; i++) {
  fetch(URL + i)
    .then((res) => res.json())
    .then((pokemons) => listar(pokemons));
}
// render de pokemon en el header
function listar(pokemons) {
  const article = document.createElement("article");
  article.innerHTML = `
    <div class="header-img">
        <img src=${pokemons.sprites.other.home.front_default} alt="${pokemons.name}">
      </div>
    
    `;

  listaPokemon.append(article);
}

// buscador de pokemon

const fetchApi = async (pkmnId) => {
  const response = await fetch(URL + pkmnId);

  if (response.status === 200) {
    const pkmnData = await response.json();
    return pkmnData;
  }

  return false;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pkmnId = input.value;
  const pkmnData = await fetchApi(pkmnId);
  if (!pkmnData) alert("no existe el pokémon");
  input.value = "";

  nombre.innerHTML = pkmnData.name;
  imagen.src = pkmnData.sprites.other.home.front_default;
  peso.innerHTML = pkmnData.weight / 10 + "kg";
  altura.innerHTML = pkmnData.height / 10 + "mt";
  tipos.innerHTML = "";
  pkmnData.types.forEach((type) => {
    let newTipo = document.createElement("p");
    newTipo.innerHTML = type.type.name;
    newTipo.classList.add(`${type.type.name}`, "btn-tipos");

    tipos.appendChild(newTipo);
  });
});
