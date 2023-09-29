import './index.scss';
import search from '../../assets/img/search.svg';
import filter from '../../assets/img/filter.svg';
import arrow from '../../assets/img/arrow.svg';
import fetchStarWars from '../../services/api';
import { useState } from 'react';
import PlanetDetails from '../PlanetDetails';

type Status = 'buscando' | 'search';

const statusMessages = {
  buscando: 'Buscando...',
  search: 'Search',
};

type FormProps = {
  setMarsImageVisible: (isVisible: boolean) => void;
};

export default function Form({setMarsImageVisible} : FormProps) {

  const [planetName, setPlanetName] = useState('');
  const [searchedPlanetId, setSearchedPlanetId] = useState(null);
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState<Status>('search');
  const [formVisible, setFormVisible] = useState(true);

  async function handleSearch(e: { preventDefault: () => void; }) {
    setStatus('buscando');
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
          <button
            onClick={handleSearch}
            className='btnSearch'>
            {status === 'search' ? (
              <>
                <img src={search} alt="ícone de procura" />
                Search
              </>
            ) : statusMessages[status]}
          </button>
          <div className='filterContainer'>
            <div className='boxTopFilter'>
              <img src={filter} alt="" />
              <p>Filter:</p>
            </div>

            <div className='selects'>
              <select
                value={planetName}
                onChange={(e) => setPlanetName(e.target.value)}
                name="planetName">
                <option value="">Escolha um</option>
                <option value="Tatooine">Tatooine</option>
                <option value="Naboo">Naboo</option>
                <option value="Kamino">Kamino</option>
                <option value="Hoth">Hoth</option>
                <option value="Endor">Endor</option>
                <option value="Dagobah">Dagobah</option>
                <option value="Coruscant">Coruscant</option>
                <option value="Bespin">Bespin</option>
                <option value="Alderaan">Alderaan</option>
                <option value="Yavin">Yavin IV</option>
              </select>
              <label htmlFor="planetName">
                <img src={arrow} alt="" />
                Name</label>
            </div>

            <div className='selects'>
              <select
                value={planetName}
                onChange={(e) => setPlanetName(e.target.value)}
                name="PopulationPlanet">
                <option value="Dagobah">Unknown</option>
                <option value="Yavin">1.000</option>
                <option value="Hoth">7.200</option>
                <option value="Tatooine">200.000</option>
                <option value="Bespin">6.000.000</option>
                <option value="Endor">30.000.000</option>
                <option value="Kamino">1.000.000.000</option>
                <option value="Alderaan">2.000.000.000</option>
                <option value="Naboo">4.500.000.000</option>
                <option value="Coruscant">1.000.000.000.000</option>
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