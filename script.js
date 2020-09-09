// BTNs
const drawAdviceBtn = document.querySelector('.draw_advice_btn');
const showFavouritesBtn = document.querySelector('.show_favourites_btn');
const returnBtn = document.querySelector('.return_btn');

//Sections
const mainSection = document.querySelector('.main_section');
const favsSadivesSection = document.querySelector('.favs_adives_section');
const result = document.querySelector('.result');

const favouriteAdvices = [];

class Adice {
    constructor(adviceText, id){
        this.adviceText = adviceText;
        this.id = id;
    }
}

// Interface

function swapFavMainSections() {
    mainSection.classList.toggle('active');
    mainSection.classList.toggle('unactive');
    favsSadivesSection.classList.toggle('active');
    favsSadivesSection.classList.toggle('unactive');
}

function renderDrawnAdvice(newAdvice, place) {
    const prevAdvice = place.querySelector('.advice');
    if(place == result && prevAdvice != null)
        place.removeChild(prevAdvice);
    

    const advice = document.createElement('div');
    advice.classList.add('advice');
    advice.dataset.id = newAdvice.id;
    
    const adviceText = document.createElement('p');
    adviceText.textContent = newAdvice.adviceText;
    advice.appendChild(adviceText);

    //const favouriteIcon;

    place.appendChild(advice);
}

showFavouritesBtn.addEventListener('click', swapFavMainSections);
returnBtn.addEventListener('click', swapFavMainSections);

// Using API


function getAdvice() {
    const url = 'https://api.adviceslip.com/advice';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newAdvice = new Adice(data.slip.advice, data.slip.id);
            renderDrawnAdvice(newAdvice, result);

        });
}

drawAdviceBtn.addEventListener('click', () => {
    getAdvice();

});