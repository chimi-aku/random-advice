// BTNs
const drawAdviceBtn = document.querySelector('.draw_advice_btn');
const showFavouritesBtn = document.querySelector('.show_favourites_btn');
const returnBtn = document.querySelector('.return_btn');

//Sections
const mainSection = document.querySelector('.main_section');
const favsSadivesSection = document.querySelector('.favs_adives_section');
const favsAdives = document.querySelector('.favs_adives');
const result = document.querySelector('.result');
let starUnClickedIconOfDrawnAdvice;
let starClickedIconOfDrawnAdvice;
let starIconOfFavouritesAdvices;

const favouriteAdvices = [];

class Advice {
    constructor(adviceText, id) {
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

    console.log(favouriteAdvices);
}

function renderDrawnAdvice(newAdvice, place) {
    const prevAdvice = place.querySelector('.advice');
    if (place == result && prevAdvice != null) place.removeChild(prevAdvice);

    const advice = document.createElement('div');
    advice.classList.add('advice');
    advice.dataset.id = newAdvice.id;

    const adviceText = document.createElement('p');
    adviceText.textContent = newAdvice.adviceText;
    advice.appendChild(adviceText);

    const favouriteIcon = document.createElement('span');
    //favouriteIcon.src = './img/star.png'
    favouriteIcon.innerHTML = '&#9733;';
    favouriteIcon.classList.add('icon-star');
    advice.appendChild(favouriteIcon);

    place.appendChild(advice);

    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();
}

function renderFavouriteAdvices() {
    console.log(favouriteAdvices);
    //Clearing
    favsAdives.innerHTML = '';

    for (const favAdvice of favouriteAdvices) {
        const advice = document.createElement('div');
        advice.classList.add('advice');
        advice.dataset.id = favAdvice.id;

        const adviceText = document.createElement('p');
        adviceText.textContent = favAdvice.adviceText;
        advice.appendChild(adviceText);
        const favouriteIcon = document.createElement('span');
        favouriteIcon.innerHTML = '&#9733;';
        favouriteIcon.classList.add('icon-star');
        favouriteIcon.classList.add('favourite');
        advice.appendChild(favouriteIcon);

        favsAdives.appendChild(advice);
    }

    starIconOfFavouritesAdvices = document.querySelectorAll('.favourite');

    console.log(starIconOfFavouritesAdvices);

    // Add event listener to star icon
    starIconOfDrawnAdvice = document.querySelector('.favs_adives .icon-star ');
    console.log(starIconOfDrawnAdvice);
    if (starIconOfDrawnAdvice != null) {
        starIconOfDrawnAdvice.addEventListener('click', function (e) {
            changeStarColor();
            addAdviceToFavourite(e);
            removeAdviceFromFavourites(e);
        });
    }
}

function setStarColor() {
    starUnClickedIconOfDrawnAdvice.classList.add('favourite');
    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();
}

function unsetStarColor() {
    starClickedIconOfDrawnAdvice.classList.remove('favourite');
    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();
}

// AddingListners Functions

function addEventListenerForUnClickedDrawnStar() {
    starUnClickedIconOfDrawnAdvice = document.querySelector(
        '.result .icon-star'
    );
    //console.log(starUnClickedIconOfDrawnAdvice);
    if (starUnClickedIconOfDrawnAdvice != null) {
        starUnClickedIconOfDrawnAdvice.addEventListener('click', function (e) {
            setStarColor();
            addAdviceToFavourite(e);
        });
    }
}

function addEventListenerForClickedDrawnStar() {
    starClickedIconOfDrawnAdvice = document.querySelector('.result .favourite');
    //console.log(starClickedIconOfDrawnAdvice);
    if (starClickedIconOfDrawnAdvice != null) {
        starClickedIconOfDrawnAdvice.addEventListener('click', function (e) {
            unsetStarColor();
        });
    }
}

showFavouritesBtn.addEventListener('click', swapFavMainSections);
returnBtn.addEventListener('click', swapFavMainSections);

// Favourites Advices

function addAdviceToFavourite(e) {
    if (!e.target.parentNode.classList.contains('favourite')) {
        // Getting values from drawn rendered advice
        const text = e.target.parentNode.querySelector('p').textContent;
        const id = e.target.parentNode.dataset.id;

        const newFavAdvice = new Advice(text, id);

        // Check if it exists in array
        let isThisAlreadyAdviceExists = false;
        for (const advice of favouriteAdvices) {
            if (newFavAdvice.id == advice.id) isThisAlreadyAdviceExists = true;
        }
        //console.log(isThisAlreadyAdviceExists);

        if (!isThisAlreadyAdviceExists) favouriteAdvices.push(newFavAdvice);
    }
}

// Using API

function getAdvice() {
    const url = 'https://api.adviceslip.com/advice';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const newAdvice = new Advice(data.slip.advice, data.slip.id);
            renderDrawnAdvice(newAdvice, result);
        });
}

drawAdviceBtn.addEventListener('click', getAdvice);
showFavouritesBtn.addEventListener('click', renderFavouriteAdvices);
