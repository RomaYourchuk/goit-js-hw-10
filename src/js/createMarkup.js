export function createMarkupCountryList(countriesEl) {
    return countriesEl
      .map(({ name, flags }) => {
        return `
        <li>
          <img class="country-img" src="${flags.svg}" alt="Flag of ${name.official}">
          <span>${name.official}</span>
        </li>
        `;
      })
      .join('');
}
  
export function createMarkupCountryEl({ name, capital, population, flags, languages }) {
    return `
        <p>
          <img class="country-img" src="${flags.svg}" alt="Flag of ${name.official}">
          <span class="country-name">${name.official}</span>
        </p>
        <p>
          <span class="country-label">Capital: </span>
          ${capital}
        </p>
        <p>
          <span class="country-label">Population: </span>
          ${population}
        </p>
        <p>
          <span class="country-label">Languages: </span>
          ${Object.values(languages).join(', ')}
        </p>
        `;
}