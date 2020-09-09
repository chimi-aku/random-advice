// BTNs
const drawAdviceBtn = document.querySelector('.draw_advice_btn');
const showFavouritesBtn = document.querySelector('.show_favourites_btn');
const returnBtn = document.querySelector('.return_btn');

//Sections
const mainSection = document.querySelector('.main_section');
const favsSadivesSection = document.querySelector('.favs_adives_section');


// Interface

function swapFavMainSections() {
    mainSection.classList.toggle('active');
    mainSection.classList.toggle('unactive');
    favsSadivesSection.classList.toggle('active');
    favsSadivesSection.classList.toggle('unactive');
}

function renderAdvice() {
    
}

showFavouritesBtn.addEventListener('click', swapFavMainSections);
returnBtn.addEventListener('click', swapFavMainSections);