import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { createMarkupCountryEl, createMarkupCountryList } from './js/createMarkup'

const DEBOUNCE_DELAY = 300;

const refs = {
  countryInput: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function resetMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function onSearch(event) {
  const nameCountry = event.target.value.trim();

  if (nameCountry === '') {
    resetMarkup();
    return;
  }

  fetchCountries(nameCountry).then(chooseMarkup).catch(showError);
}

function chooseMarkup(countriesEl) {
  resetMarkup();  
  if (countriesEl.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countriesEl.length > 1 && countriesEl.length <= 10) {
    refs.countryList.innerHTML = createMarkupCountryList(countriesEl);
  }

  if (countriesEl.length === 1) {
    refs.countryInfo.innerHTML = createMarkupCountryEl(countriesEl[0]);
  }
}

function showError() {
  resetMarkup();
  Notify.failure('Oops, there is no country with that name');
}

