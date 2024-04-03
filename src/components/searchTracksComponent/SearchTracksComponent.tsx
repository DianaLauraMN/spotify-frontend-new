import React, { useState, useEffect } from 'react'
import style from "./SearchTracksComponent.module.css"
import searchIcon from "./../../img/search-icon.svg";
import useGTS from '../../hooks/useGTS';
import usePlay from '../../hooks/usePlay';
import useGame from '../../hooks/useGame';
import useHttpCall from '../../hooks/useHttpCall';

const SearchTracksComponent = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { configurationGame: { isNewTracksSearch }, handleIsNewTracksSearch } = useGame();
    const { loadSearchResultsTracks,handleScrollOnTop } = useGTS();
    const { playState: { isGameOver } } = usePlay();
    const {checkAuthentication} =useHttpCall();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
    }

    const handleOnClickSearch = () => {
        handleScrollOnTop(true);
        checkAuthentication(loadSearchResultsTracks(searchTerm));
        handleIsNewTracksSearch(false);
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleOnClickSearch();
        }
    }

    useEffect(() => {
        if (isNewTracksSearch) { setSearchTerm(''); }
    }, [isNewTracksSearch])

    return (
        <div className={style.searchContainer}>
            <button onClick={handleOnClickSearch}>
                <img src={searchIcon} alt="" />
            </button>
            <input className={style.inputContainer}
                type="text"
                placeholder="Search..."
                value={isGameOver ? '' : searchTerm}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                readOnly={isGameOver}
                disabled={isGameOver}
            />
        </div>


    )
}

export default SearchTracksComponent