const urlParams = new URLSearchParams(window.location.search);
const PokemonId = urlParams.get("PokemonId");
const PokeDiv = document.getElementById('PokeDiv');
const page_content = document.getElementsByClassName('page-content');
const pokeDetails = document.getElementById('pokeDetails');
let link = `https://pokeapi.co/api/v2/pokemon/${PokemonId}`

function LoadInfo(){
	fetch(link)
        .then((response) => response.json())
		.then((pokemon)=> {
		pokemonData = new Pokemon();
        statsResume = [];
            pokemonData.name = pokemon.name
			pokemonData.number = pokemon.id
			pokemonData.types = pokemon.types.map((typeSlot) => typeSlot.type.name)
			pokemonData.type = pokemonData.types
			pokemonData.abilities = pokemon.abilities.map((abilitySlot) => abilitySlot.ability.name)
            pokemonData.ability = pokemonData.abilities
			pokemonData.photo = pokemon.sprites.other.dream_world.front_default
            pokemon.stats.forEach((item) => {
				PokeBaseStats = new BaseStats();
				PokeBaseStats.StatsName = item.stat.name;
				PokeBaseStats.StatsValue = item.base_stat;
				statsResume.push(PokeBaseStats);	
			});
			statsResume.forEach( (PokeBaseStats) => {
				console.log(PokeBaseStats.StatsName+" = "+PokeBaseStats.StatsValue);
			
			});
			
			pokemonData.stats = statsResume;
            
			const NewDiv = document.createElement('div');
			NewDiv.innerHTML += PokeToDiv(pokemonData);
        	pokeDetails.appendChild(NewDiv);
		}
	);
}

function PokeToDiv(pokemon) {
	return `
    <div class="PokeInfo1"> 
    <h1>${pokemon.name} - #${pokemon.number}</h1>
    <img class="PokeImg" src="${pokemon.photo}" alt="${pokemon.name}">
    <br><br>
</div>

<div class="PokeInfo2">
    <div class="detail-item">
    <table cellspacing="2" cellpadding="7" align="left" id="Table1">
    <thead>
        <tr>
        <th colspan="2">Base Stats</th>
        </tr>
     </thead>
    <tbody>
    ${pokemon.stats.map((stats) => `<tr><td style="width: 8.7rem">${stats.StatsName}</td>
    <td style="width: 4rem">${stats.StatsValue}</td></tr>`).join('')}
    </tbody>
    </table>

    <table cellspacing="2" cellpadding="7" align="right" id="Table2">
    <thead>
        <tr>
        <th colspan="1">Types</th>
        </tr>
     </thead>
    <tbody>
    ${pokemon.types.map((type) => `<tr"><td style="width: 6rem">${type}</td></tr>`).join('')}
    </tbody>
    </table>

    <table cellspacing="2" cellpadding="7" align="center" id="Table3">
    <thead>
        <tr>
        <th colspan="1">Abilities</th>
        </tr>
     </thead>
    <tbody>
    ${pokemon.ability.map((ability) => `<tr><td style="width: 8.7rem">${ability}</td></tr>`).join('')}
    </tbody>
    </table>
    </div>
    <br><br><br><br><br><br><br><br><br><br>
</div>
    `;
}

LoadInfo()