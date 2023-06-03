const URL = "https://pokeapi.co/api/v2/";

const KANTO = "pokemon?limit=151&offset=0"


const img__holder = null || document.getElementById("main__img_holder"); 
const choices__holder = null || document.getElementById("main__choices_holder")
const boton__jugar = null || document.getElementById("main__boton_jugar")

async function fetchData(_url){
    const response = await fetch(_url);
    const data = response.json();
    return data
}

function barajar(data){
    const resultado = data
        .map((valor) => ({valor, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(({valor}) => valor);
    return resultado;
}

async function getPokemons() {
    const all_pokemons =  await fetchData(URL + KANTO);
    return all_pokemons.results;
}

function showChoices(data){
    const choices__html = data.map((pokemon) => {
        return `<button class="choice" data-name="${pokemon.name}">${pokemon.name.toUpperCase()}</button>`
    }).join('')

    choices__holder.innerHTML = choices__html

}

function showHiddenPokemon(pokemon){
    const src_artwork = getArtwork(pokemon.url)
    const img__html = `
    <img class="hidden" src=${src_artwork}>
    `
    img__holder.innerHTML = img__html;
}

function getArtwork(url){
    const number = url.split('/')[6]
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`
}

function handleAnswer(target){
    choices__holder.addEventListener('click', e => {
        if(e.target.dataset.name === target.name){
            const src_artwork = getArtwork(target.url)
            img__holder.innerHTML = `
            <img class="revealed" src=${src_artwork}>
            `
        }else{
            alert("FALLASTE! \n Inténtalo de nuevo.")
        }
    })
}

(async () => {
    try{
        const data = barajar(await getPokemons())
        const juego = data.slice(0,4);
        
        const target = juego[Math.floor(Math.random()*juego.length)]
        
        showChoices(juego)
        showHiddenPokemon(target)
        handleAnswer(target)
        boton__jugar.addEventListener('click', () => window.location.reload())
    }catch(error){
        console.log(error)
    }
})()