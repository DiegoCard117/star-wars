import React from 'react';
import search from '../../assets/img/search.svg';
import './index.scss'

type SearchButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  status: string;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, status }) => {
  return (
    <button onClick={onClick} className='btnSearch'>
      {status === 'search' ? (
        <>
          <img src={search} alt="ícone de procura" />
          Search
        </>
      ) : status}
    </button>
  );
};

export default SearchButton;