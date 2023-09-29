import './assets/scss/App.scss';
import title from './assets/img/title.svg';
import mars from './assets/img/imgMars.svg';
import spaceship from './assets/img/spaceship.svg';
import spaceshipBig from './assets/img/spaceshipBig.svg';
import Footer from './components/Footer';
import Form from './components/Form';
import { useEffect, useState } from 'react';


function App() {
  const [marsImageVisible, setMarsImageVisible] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 720);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 720);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='container'>
        <div className='box-top'>
          <span className='subtitle'>Planet search</span>
          <img src={title} alt="Titulo escrito Star Wars" />
        </div>
        <div className='flexBox'>
          <div className='center-box'>
            {marsImageVisible && (
              <img
                className='imgMars'
                src={mars}
                alt="Imagem de fundo de um planeta"
              />
            )}
            <img
              className='spaceship'
              src={isLargeScreen ? spaceshipBig : spaceship}
            />
          </div>
          <Form setMarsImageVisible={setMarsImageVisible} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
