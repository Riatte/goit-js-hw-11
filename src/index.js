import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');


inputCountry.addEventListener('input', debounce(foundCountry, DEBOUNCE_DELAY) );


/////////////////////
function foundCountry(evt) {
    evt.preventDefault();

    const inputValue = evt.target.value.trim();
    clearInput();
    if (!inputValue) { 
        return;
    };

    fetchCountries(inputValue)
        .then((countries) => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (countries.length >= 2 &&countries.length < 10) {
                showCountries(countries);  
            }
            else if (countries.length === 1) {
                showOneCountry(countries);
            }
        })
        .catch(error => { 
            Notiflix.Notify.failure("Oops, there is no country with that name")
        })
};
///////////////////////////////////////////

function showCountries(names) { 
    const markup = names
        .map((name) => {
            return `<li class="country-li"><img src='${name.flags.svg}' alt='flag of ${name.name.official}' width = '30' >${name.name.official}</li>`;
        })
        .join("");
    listCountry.innerHTML = markup;
};


function showOneCountry(names) { 
    const markup = names
        .map((name) => {
            return `<h2 class="country-titel"><img src='${name.flags.svg}' alt='flag of ${name.name.official}' width = '70' height= '50'> 
            ${name.name.official}</h2> 
            <p><b>Capital: </b>${name.capital}</p> 
            <p><b>Population: </b>${name.population}</p> 
            <p><b>Languages: </b>${Object.values(name.languages)}</p> 
            `
        })
        .join("");
    infoCountry.innerHTML = markup;
};

function clearInput(){
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
};