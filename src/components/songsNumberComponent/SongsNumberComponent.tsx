import useGame from "../../hooks/useGame";
import style from "./SongsNumberComponent.module.css";

interface searchGenreComponentProps {
    title: string;
}

const SongsNumberComponent: React.FC<searchGenreComponentProps> = ({ title }) => {
    const { handleOnChangeHowManySongs } = useGame();

    const handleInputOnChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        handleOnChangeHowManySongs(value ? parseInt(value) : 10);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const isBackspaceOrDelete = event.key === 'Backspace' || event.key === 'Delete';
        const isDigit = /[0-9]/.test(event.key);
      
        if (!isDigit && !isBackspaceOrDelete) {
          event.preventDefault();
        }
      };

    return (
        <div className={style.songsNumberContainer}>
            <div className={style.centerContainer}>
                <div className={style.labelContainer}>
                    <h3>{title}</h3>
                </div>
                <div className={style.inputContainer}>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="10"
                        onChange={handleInputOnChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default SongsNumberComponent;