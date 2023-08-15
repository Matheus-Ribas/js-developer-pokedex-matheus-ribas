
const PokeAPI = {}
PokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((PokeApiToPoke))
}

function PokeApiToPoke(pokeDetail) {
    const pokemon = new Pokemon ()
        pokemon.name = pokeDetail.name;
        pokemon.number = pokeDetail.id;
        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types
        pokemon.types = types
        pokemon.type = type

        const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
        const [ability] = abilities
        pokemon.abilities = abilities
        pokemon.ability = ability
        pokemon.stats = pokeDetail.stats[0]

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
        return pokemon
}

PokeAPI.GetPokemons = (offset=0, limit=10) => {
    const link = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(link)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(PokeAPI.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}