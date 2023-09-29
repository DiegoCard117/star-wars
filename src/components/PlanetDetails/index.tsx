import './index.scss';
import thermo from '../../assets/img/thermo.svg';
import terreno from '../../assets/img/terrain.svg';
import people from '../../assets/img/population.svg';
import resident from '../../assets/img/people.svg';
import film from '../../assets/img/films.svg';

import { useState, useEffect } from 'react';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string[];
  films: string[];
}

interface ResidentDetails {
  name: string;
}

interface FilmDetails {
  title: string;
}

type PlanetImageMapping = {
  [key: string]: string;
};

const PlanetImages: PlanetImageMapping = {
  Tatooine: 'https://cryptospro.com.br/planetas/planeta_0000_tatooine.png',
  Naboo: 'https://cryptospro.com.br/planetas/planeta_0001_naboo.png',
  Mustafar: 'https://cryptospro.com.br/planetas/planeta_0002_mustafar.png',
  Kashyyyk: 'https://cryptospro.com.br/planetas/planeta_0003_kashyyyk.png',
  Hoth: 'https://cryptospro.com.br/planetas/planeta_0004_hoth.png',
  Endor: 'https://cryptospro.com.br/planetas/planeta_0005_endor.png',
  Dagobah: 'https://cryptospro.com.br/planetas/planeta_0006_dagobah.png',
  Coruscant: 'https://cryptospro.com.br/planetas/planeta_0007_coruscant.png',
  Bespin: 'https://cryptospro.com.br/planetas/planeta_0008_bespin.png',
  Alderaan: 'https://cryptospro.com.br/planetas/planeta_0009_alderaan.png',
};

export default function PlanetDetails({ planet }: { planet: Planet; }) {
  const { name, climate, terrain, population, residents, films } = planet;
  const [residentDetails, setResidentDetails] = useState<ResidentDetails[]>([]);
  const [filmDetails, setFilmDetails] = useState<FilmDetails[]>([]);
  const imageUrl = PlanetImages[name] || '';

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResidentDetails() {
      const details = await Promise.all(residents.map(fetchResident));
      setResidentDetails(details);
    }

    async function fetchFilmDetails() {
      const details = await Promise.all(films.map(fetchFilm));
      setFilmDetails(details);
    }

    setIsLoading(true);

    Promise.all([fetchResidentDetails(), fetchFilmDetails()])
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Erro ao buscar detalhes:', error);
        setIsLoading(false);
      });
  }, [residents, films]);

  async function fetchResident(residentUrl: RequestInfo | URL) {
    const response = await fetch(residentUrl);
    const data = await response.json();
    return data;
  }

  async function fetchFilm(filmUrl: RequestInfo | URL) {
    const response = await fetch(filmUrl);
    const data = await response.json();
    return data;
  }

  return (
    <div className='containerDetails'>
      <div className='content'>
        <div className='details'>
          <div className='detailsPlanet'>
            <img
              className='PlanetImg'
              src={imageUrl} alt="" />
          </div>
          <div className='boxCondition'>
            <div className='boxTitle'>
              <p>Planet:</p>
              <h1>{name}</h1>
            </div>
            <div className='ConditionPlanet'>
              <img src={thermo} alt="" />
              <p className='title'>Climate: </p>
              <p>{climate}</p>
            </div>

            <div className='ConditionPlanet'>
              <img src={terreno} alt="" />
              <p className='title'>Terrain:</p>
              <p> {terrain}</p>
            </div>

            <div className='ConditionPlanet'>
              <img src={people} alt="" />
              <p className='title'>Population: </p>
              <p>{population}</p>
            </div>
          </div>
        </div>

        <div className='boxQuantidades'>
          <div className='titleQuantidade'>
            <img src={resident} alt="" />
            <h2>Residents:</h2>
          </div>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {residentDetails.map((resident, index) => (
                <span key={index}>{resident.name}, </span>
              ))}
            </>
          )}
        </div>
        <div className='boxQuantidades'>
          <div className='titleQuantidade'>
            <img src={film} alt="" />
            <h2>Films {`(${filmDetails.length})`}:</h2>
          </div>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {filmDetails.map((films, index) => (
                <span key={index}>{films.title}, </span>
              ))}
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}
