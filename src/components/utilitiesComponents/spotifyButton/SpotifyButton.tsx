import usePlay from "../../../hooks/usePlay";
import style from "./SpotifyButton.module.css";
interface SpotifyButtonProps {
    title: string,
    type: 'login' | 'game' | 'gameOver' | 'reestart',
    onClick?: any,
}

const SpotifyButton: React.FC<SpotifyButtonProps> = ({ title, onClick }) => {
    const { playState: { isGameOver, failed } } = usePlay();

    return (
        <div className={style.btnContainer}>
            <button className={isGameOver && failed.length === 0 ? style.btnWinner : style.btnSpotify} onClick={onClick}>
                {title}
            </button>
        </div>

    );
}



export default SpotifyButton;