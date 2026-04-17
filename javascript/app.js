async function pesquisar() {
    const nome = document.getElementById("inputBusca").value
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`
    const resposta = await fetch(url)
    const pokemon = await resposta.json()
    document.getElementById("pokedex").innerHTML = ""/*limpa o que está dentro da descrição da pokedex (função mais pra baixo)*/

    mostrarPokemon(pokemon)

}

function mostrarPokemon(pokemon) {
  const divResultado = document.getElementById("resultado")

  divResultado.innerHTML = `
    <div class="card">
      <img src="${pokemon.sprites.front_default}">
      <h3>${pokemon.name}</h3>
      <p>Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p>ID: ${pokemon.id}</p>
      <button onclick="pokedex()">Veja mais na Pokedex</button>
    </div>
  `
}

async function pokedex() {
    const nomePokedex = document.getElementById("inputBusca").value;
    const urlPokedex = `https://pokeapi.co/api/v2/pokemon-species/${nomePokedex}`
    const respostaPokedex = await fetch(urlPokedex)
    const pokemonPokedex = await respostaPokedex.json()

    mostrarDescricaoPokedex(pokemonPokedex)
}

function mostrarDescricaoPokedex(pokemonPokedex) {
    const divPokedex = document.getElementById("pokedex")
     const descricao = pokemonPokedex.flavor_text_entries.find(item => item.language.name === "en")
     const textoLimpo = descricao.flavor_text.replace(/\n|\f/g, " ")

    divPokedex.innerHTML = `
    <div class="card">
        <h3>Descrição Pokedex</h3>
      <p>${textoLimpo}</p>
    </div>
    `
}