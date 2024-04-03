import iconLogo from '../../img/icon-logo.svg';
import iconSpotify from '../../img/icon-logo-spotify.svg';
import style from "./LogosNamesComponent.module.css"
const LogosNamesComponent = () => {
    return (
        <>
            <div className={style.logoContainerGTS}>
                <img src={iconLogo} alt="logo" id='logoGTS' />
                <h1>Guess The Song</h1>
            </div>
            <div className={style.logoContainerSPF}>
                <img src={iconSpotify} alt="logo" id='logoSPF' />
                <h2>For Spotify</h2>
            </div>
        </>
    )
}

export default LogosNamesComponent