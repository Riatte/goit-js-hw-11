const url = 'https://restcountries.com/v3.1/name';

export const fetchCountries = name => {
    return fetch(`
    ${url}/${name}?fields=name,capital,population,flags,languages`
  )
      .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
   
};