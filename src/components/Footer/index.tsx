import imgFooter from '../../assets/img/imgFooter.svg';
import './index.scss';


export default function Footer() {
  return (
    <>
      
      <footer>
        <p>STARWARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</p>
        <img
          className='StarImage'
          src={imgFooter} alt="Logo Star Wars" />
      </footer>
    </>
  );
} 