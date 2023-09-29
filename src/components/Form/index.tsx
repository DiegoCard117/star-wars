import './index.scss';
import filter from '../../assets/img/filter.svg';
import arrow from '../../assets/img/arrow.svg';
import fetchStarWars from '../../services/api';
import { useState } from 'react';
import PlanetDetails from '../PlanetDetails';
import SearchButton from '../Button';

type Status = 'Buscando...' | 'search';

type FormProps = {
  setMarsImageVisible: (isVisible: boolean) => void;
};

const planetOptions = [
  'Tatooine',
  'Naboo',
  'Kamino',
  'Hoth',
  'Endor',
  'Dagobah',
  'Coruscant',
  'Bespin',
  'Alderaan',
  'Yavin IV',
];

const populationOptions = [
  'Unknown',
  '1.000',
  '7.200',
  '200.000',
  '6.000.000',
  '30.000.000',
  '1.000.000.000',
  '2.000.000.000',
  '4.500.000.000',
  '1.000.000.000.000',
];

export default function Form({ setMarsImageVisible }: FormProps) {

  const [planetName, setPlanetName] = useState('');
  const [searchedPlanetId, setSearchedPlanetId] = useState(null);
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState<Status>('search');
  const [formVisible, setFormVisible] = useState(true);

  async function handleSearch(e: { preventDefault: () => void; }) {
    setStatus('Buscando...');
    e.preventDefault();

    const response = await fetchStarWars();
    const foundPlanet = response.find((planet: { name: string; }) => planet.name.toLowerCase() === planetName.toLowerCase());

    setSearched(true);

    if (foundPlanet) {
      setSearchedPlanetId(foundPlanet);
    } else {
      setSearchedPlanetId(null);
    }

    setFormVisible(false);
    setMarsImageVisible(false);
    setStatus('search');
  }

  return (
    <>
      {formVisible && (
        <form className='box-bottom'>
          <p className='text'>Discover all the information about Planets of the Star Wars Saga</p>
          <input
            type="text"
            name="searchBar"
            className='searchBar'
            placeholder='Enter the name in the planet'
            value={planetName}
            onChange={(e) => setPlanetName(e.target.value)}
          />
          <SearchButton onClick={handleSearch} status={status} />
          <div className='filterContainer'>
            <div className='boxTopFilter'>
              <img src={filter} alt="" />
              <p>Filter:</p>
            </div>

            <div className='selects'>
              <select
                value={planetName}
                onChange={(e) => setPlanetName(e.target.value)}
                name='planetName'>
                <option value=''>Escolha um</option>
                {planetOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="planetName">
                <img src={arrow} alt="" />
                Name</label>
            </div>

            <div className='selects'>
              <select
                value={planetName}
                onChange={(e) => setPlanetName(e.target.value)}
                name='PopulationPlanet'>
                {populationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="PopulationPlanet">
                <img src={arrow} alt="" />
                Population
              </label>
            </div>
            
          </div>
        </form>
      )}
      {searched && searchedPlanetId === null && (
        <p className='alert'>No planet found with the specified name.</p>
      )}
      {searchedPlanetId !== null && (
        <PlanetDetails planet={searchedPlanetId} />
      )}
    </>
  );
}