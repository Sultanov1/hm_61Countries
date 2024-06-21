import {useEffect, useState} from 'react';
import CountryList from './components/CountryList/CountryList';
import CountryInfo from './components/CountryInfo/CountryInfo';
import {Country} from './types';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=alpha3Code,name');
        const countries = await response.json();

        const CountryDetail = countries.map((country: Country) =>
          fetch(`https://restcountries.com/v2/alpha/${country.alpha3Code}`)
            .then(response => response.json())
        );

        const countryInfo = await Promise.all(CountryDetail);
        setCountries(countryInfo);
      } catch (err) {
        console.log('Something went wrong', err);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <CountryList countries={countries}/>
        </div>
        <div className="col-9">
          <CountryInfo/>
        </div>
      </div>
    </div>
  );
};

export default App;
