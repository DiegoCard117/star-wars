import imgFooter from '../../assets/img/imgFooter.svg';
import './index.scss';
import arrow from '../../assets/img/arrow.svg';

export default function Footer() {
  return (
    <>
      <button
        onClick={() => window.location.reload()}
        className='btnReturn'>
        <img src={arrow} alt="" />
        Voltar
      </button>
      <footer>
      <p>STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</p>
      <img
        className='StarImage'
      src={imgFooter} alt="" />
    </footer>
    </>
  );
} 