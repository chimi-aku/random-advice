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
let starUnClickedIconOfFavouritesAdvices;
let starClickedIconOfFavouritesAdvices;

let favouriteAdvices = [];

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

    //console.log(favouriteAdvices);
    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();

    addEventListenerForClickedFavsStars();
    addEventListenerForUnClickedFavStars();

    //Clear result drawn advice
    result.innerHTML = '';
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
    //console.log(favouriteAdvices);
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


    // Add event listener to star icon
    addEventListenerForClickedFavsStars();
    addEventListenerForUnClickedFavStars();

}

function setStarColor(e) {
    e.target.classList.add('favourite');
    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();

    addEventListenerForClickedFavsStars();
    //addEventListenerForUnClickedFavStars();
}

function unsetStarColor(e) {
    e.target.classList.remove('favourite');
    // Add event listener to star icon
    addEventListenerForUnClickedDrawnStar();
    addEventListenerForClickedDrawnStar();

    //addEventListenerForClickedFavsStars();
    addEventListenerForUnClickedFavStars();
}

// AddingListners Functions

function addEventListenerForUnClickedDrawnStar() {
    starUnClickedIconOfDrawnAdvice = document.querySelector(
        '.result .icon-star'
    );
    //console.log(starUnClickedIconOfDrawnAdvice);
    if (starUnClickedIconOfDrawnAdvice != null) {
        starUnClickedIconOfDrawnAdvice.addEventListener('click', function (e) {
            setStarColor(e);
            addAdviceToFavourite(e);
        });
    }
}

function addEventListenerForClickedDrawnStar() {
    starClickedIconOfDrawnAdvice = document.querySelector('.result .favourite');
    //console.log(starClickedIconOfDrawnAdvice);
    if (starClickedIconOfDrawnAdvice != null) {
        starClickedIconOfDrawnAdvice.addEventListener('click', function (e) {
            unsetStarColor(e);
            removeAdviceFromFavourite(e);
            //console.log(favouriteAdvices);
        });
    }
}

function addEventListenerForClickedFavsStars() {
    starClickedIconOfFavouritesAdvices = document.querySelectorAll('.favs_adives .favourite');
    //console.log(starClickedIconOfFavouritesAdvices);
    if (starClickedIconOfFavouritesAdvices != null) {
        starClickedIconOfFavouritesAdvices.forEach((item, index) => {
            item.addEventListener('click', e =>{
                unsetStarColor(e);
                removeAdviceFromFavourite(e);
                //console.log('listening - Clicked');

            })
        });
    }
}

function addEventListenerForUnClickedFavStars() {
    starUnClickedIconOfFavouritesAdvices = document.querySelectorAll(
        '.favs_adives .icon-star'
    );
    //console.log(starUnClickedIconOfFavouritesAdvices);
    if (starUnClickedIconOfFavouritesAdvices != null) {
        starUnClickedIconOfFavouritesAdvices.forEach((item, index) => {
            item.addEventListener('click', e =>{
                setStarColor(e);
                addAdviceToFavourite(e);
                //console.log('listening - Unclicked');
            })
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
        updateLocalStorage();
    }
}

function removeAdviceFromFavourite(e) {
    //console.log('remove');
    //console.log(e.target.parentNode);
    const adviceToRemove = e.target.parentNode;
    let indexToRemove;

    favouriteAdvices.forEach((item, index) =>{
        if(adviceToRemove.dataset.id == item.id){
            indexToRemove = index;
        }
    });

    favouriteAdvices.splice(indexToRemove, 1);
    updateLocalStorage();
}

// Using API

function getAdvice() {
    const url = 'https://api.adviceslip.com/advice';
    fetch(url)
        .then(response =>{ 
            if(response.ok)
                return response.json();
            else
                throw new Error('Cannot download random advice')
        })
        .then((data) => {
            const newAdvice = new Advice(data.slip.advice, data.slip.id);
            renderDrawnAdvice(newAdvice, result);
        })
        .catch( error => {
            console.log(error);
            alert(error);
        })

}

// Local Storage
function updateLocalStorage() {
    if(typeof localStorage !== 'undefined') {
        localStorage.removeItem('user\'s advices');
        localStorage.setItem('user\'s advices', JSON.stringify(favouriteAdvices));
    }
}

function loadAdvicesFromLocalStorage(){
    if(typeof localStorage !== "undefined" && localStorage.getItem('user\'s advices') != 'undefined') {
        favouriteAdvices = JSON.parse(localStorage.getItem('user\'s advices'));
    }
}

loadAdvicesFromLocalStorage();
//console.log(favouriteAdvices);

drawAdviceBtn.addEventListener('click', getAdvice);
showFavouritesBtn.addEventListener('click', renderFavouriteAdvices);
