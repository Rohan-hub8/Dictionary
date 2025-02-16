BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const btn = document.querySelector(".search button");
const audio = document.querySelector("audio");
const result = document.querySelector(".result");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateData();
});

async function updateData() {
    let input = document.querySelector("input");
    let inVal = input.value;

    const URL = `${BASE_URL}${inVal}`;
    let response = await fetch(URL);
    
    if(inVal === "") {
        result.innerHTML = `<div class="err">Enter the word</div>`;
    } else if(response.status == 404) {
        result.innerHTML = `<div class="err">Couldn't find the word</div>`;
    } else {
        let data = await response.json();
        result.innerHTML = `
        <div class="word">
                <h2>${data[0].word}</h2>
                <button onclick="playAudio()" class="voice"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="info">
                <div class="detail">
                    <p id="one">${data[0].meanings[0].partOfSpeech}</p>
                    <p id="two">${data[0].phonetics[0].text}</p>
                </div>
                <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
                <p class="ex">${data[0].meanings[0].definitions[0].example}</p>
            </div>`;
        audio.setAttribute("src", data[0].phonetics[0].audio);
    }
} 

function playAudio() {
    audio.play();
}