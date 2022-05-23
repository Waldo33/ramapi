const input = document.querySelector('[data-input]');
const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const character = document.querySelector('[data-character]');
const pageInput = document.querySelector('[data-page]');
const pagePrev = document.querySelector('[data-page-prev]');
const pageNext = document.querySelector('[data-page-next]');

// const Locations = document.querySelectorAll('[data-location]');

const url = 'https://rickandmortyapi.com/api/';
let page = 1;
let query = getCharacter(character, page);

let text = '';
input.addEventListener('input', function() {
    text = input.value;
})

character.addEventListener('input', function() {
    query = getCharacter(character);
})

pageInput.addEventListener('click', function(e) {
    if(e.target.tagName == 'UL') return;
    page = e.target.innerText;
    query = getCharacter(character, page);
    list.innerHTML = '';
    getData(url, query, text)
    // // console.log(page);
})

// pageNext.addEventListener('click', function(e) {
//     if(e.target.tagName == 'UL') return;
//     query = getCharacter(character, page);
//     list.innerHTML = '';
//     getData(url, query, text)
//     // // console.log(page);
// })

// pagePrev.addEventListener('click', function(e) {
//     if(e.target.tagName == 'UL') return;
//     query = getCharacter(character, page);
//     list.innerHTML = '';
//     getData(url, query, text)
//     // // console.log(page);
// })

form.addEventListener('submit', function(e) {
    e.preventDefault();
    getData(url, query, text)
    console.log(url+query+text);
    input.value = '';
    list.innerHTML = '';
})

function outputData(data) {
    for(let raw in data) {
        // console.log(data[raw]);
        list.innerHTML += getTemplate(data[raw]);
    }
    query = getCharacter(character, 1);
}

async function getData(url, query, param) {
    try {
        const response = await fetch(url + query + param);
        const data = await response.json();
        const results = data.results;
        const info = data.info;
        getPages(info);
        outputData(results);

    } catch(e) {
        console.log(e);
        console.log(query);
    }

}

function getTemplate(obj) {
    let {id, name, status, species, gender, image} = obj;
    const location = obj.location.name;
    return `<div class="card mt-2 p-2">
    <h1>${name}</h1>
    <img src=${image} width="300px" height="300px"/>
    <p>Location: <span data-location>${location}</span></p>
    <p>Species: <span>${species}</span></p>
    <p>Gender: <span>${gender}</span></p>
    <p>Status: <span>${status}</span></p>
    </div>`
}

function getCharacter(character, page) {

    if(character.value == "Name" ) {
        return `character?page=${page}&name=${character.name}`
    }
    if(character.value == "Gender") {
        return "character?page=${page}&gender="
    }
    if(character.value == "Species") {
        return "character?page=${page}&species="
    }
    if(character.value == "Status") {
        return "character?page=${page}&status="
    }
    return

}

function getPages(info) {
    // console.log(info.pages);
    pageInput.innerHTML = '';
    for(let p = 1; p <= info.pages; p++) {
        pageInput.innerHTML += `<li class="page-item page-link m-2">${p}</li>`
    }
}