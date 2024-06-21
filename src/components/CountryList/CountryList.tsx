import {Country} from '../../types';
import React from 'react';

interface Props {
  countries: Country[];
  onSelectedCountry: (code: string) => void;
}

const CountryList: React.FC<Props> = ({countries, onSelectedCountry}) => {
  return (
    <ul className="list-group overflow-y-scroll" style={{height: '950px'}}>
      {countries.map((country) => (
        <li
          key={country.alpha3Code}
          className="list-group-item list-group-item-action"
          onClick={() => onSelectedCountry(country.alpha3Code)}>
          {country.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;