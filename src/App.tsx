import {useEffect, useState} from 'react';
import CountryList from './components/CountryList/CountryList';
import CountryInfo from './components/CountryInfo/CountryInfo';
import {Country} from './types';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=alpha3Code,name');
        const countriesData = await response.json();

        const CountryDetail = countriesData.map((country: Country) =>
          fetch(`https://restcountries.com/v2/alpha/${country.alpha3Code}`)
            .then(response => response.json())
        );

        const countryInfo = await Promise.all(CountryDetail);
        setCountries(countryInfo);
      } catch (err) {
        console.error('Something went wrong', err);
      }
    };
    fetchCountries();
  }, []);


  const loadCountryInfo = async (code: string) => {
    const country = countries.find(country => country.alpha3Code === code);
    setSelectedCountry(country || null);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <CountryList countries={countries} onSelectedCountry={loadCountryInfo}/>
        </div>
        <div className="col-9">
          <CountryInfo country={selectedCountry}/>
        </div>
      </div>
    </div>
  );
};

export default App;
