import React from 'react';
import {Country} from '../../types';

interface Props {
  country: Country | null;
}

const CountryInfo: React.FC<Props> = ({country}) => {
  return (
    <div className='p-3'>
      {country ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Country Name: {country.name}</h2>
            <img src={country.flag} alt={country.name} className='img-fluid mb-3' style={{width: '30%'}}/>
            <p className="card-text"><strong>Capital: </strong>{country.capital}</p>
            <p className="card-text"><strong>Population: </strong>{country.population}</p>
            <p className="card-text"><strong>Borders: </strong>{country.borders.join(' , ')}</p>
          </div>
        </div>
      ): (
        <p><strong>Select country to see the details one of the country</strong></p>
      )}

    </div>
  );
};

export default CountryInfo;