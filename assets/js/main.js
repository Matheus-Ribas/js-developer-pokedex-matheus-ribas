const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')

let limit = 10
let offset = 0
const maxLoad = 151

function PokeToLi(pokemon){
            return `
            <li class="pokemon ${pokemon.type}">
            <span class="number"># ${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <a href='./pokemon.html?PokemonId=${pokemon.number}'><button class="SeeMoreButton">
                More
                </button></a>
                 <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
        `
}

function loadItems(offset, limit) {
    PokeAPI.GetPokemons(offset, limit).then((pokemons = []) => {
        const NewHTML = pokemons.map(PokeToLi).join('')
        pokemonList.innerHTML += NewHTML
    })
}

loadItems()

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qNext = offset + limit

    if (qNext >= maxLoad) {
        const newLimit = maxLoad - offset
        loadItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadItems(offset, limit)
    }
})