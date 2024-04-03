import style from "./CardSelectSongComponent.module.css";
import TrackListedComponent from "../tracksListedComponent/TracksListedComponent";
import SearchTracksComponent from "../searchTracksComponent/SearchTracksComponent";
import LinearTimerComponent from "../linearTimerComponent/LinearTimerComponent";
import useGame from "../../hooks/useGame";

const CardSelectSongComponent = () => {

  const { configurationGame: { isTrackAlreadyGuessed } } = useGame();

  return (
    <div className={style.cardSelectionContainer}>
      <div className={style.centerContainer}>
        <div>
          <SearchTracksComponent />
        </div>

        <div className={style.recentlyPlayedContainer}>
          <TrackListedComponent />
        </div>
      </div>

      {!isTrackAlreadyGuessed &&
        <div className={style.linearTimerContainer}>
          <LinearTimerComponent />
        </div>
      }

    </div>
  )
}

export default CardSelectSongComponent