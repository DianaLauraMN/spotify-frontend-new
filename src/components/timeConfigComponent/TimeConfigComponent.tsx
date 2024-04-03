import useGame from "../../hooks/useGame";
import style from "./TimeConfigComponent.module.css";

interface searchGenreComponentProps {
    title: string;
}
const TimeConfigComponent: React.FC<searchGenreComponentProps> = ({ title }) => {
    const { handleOnChangeHowManySec ,activeListenTimer} = useGame();
    return (
        <div className={style.timeConfigContainer}>
            <div className={style.centerContainer}>
                <div>
                    <h3>{title}</h3>
                </div>
                <div className={style.slidecontainer}>
                    <input type="range" min="1" max="5" className={style.drag__bar} id="myRange" onChange={() => {
                        const input = document.getElementById('myRange');
                        if (input) {
                            const value = (input as HTMLInputElement).value;
                            const paragraph = document.querySelector('p');
                            if (paragraph) { paragraph.textContent = value; }
                            handleOnChangeHowManySec(parseInt(value));
                            activeListenTimer(parseInt(value));
                        }
                    }} />
                    <p>5</p>
                    <h3>Secs</h3>
                </div>
            </div>
        </div>
    )
}
export default TimeConfigComponent;