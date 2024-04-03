import style from "./LevelsComponent.module.css";
import { useState } from 'react'
import useGame from "../../hooks/useGame";
import GenericButtonComponent from "../utilitiesComponents/genericButton/GenericButtonComponent";
import { Levels } from "../../api/enums/Levels";

interface levelsComponentProps {
    title: string;
}

const LevelsComponent: React.FC<levelsComponentProps> = ({ title }) => {
    const { handleOnChangeLevel } = useGame();
    const [levelSelected, setLevelSelected] = useState<Levels>();

    const handleOnClick = (level: Levels) => {
        handleOnChangeLevel(level);
        setLevelSelected(level);
    }

    return (
        <div className={style.levelContainer}>
            <div className={style.centerContainer}>
                <div className={style.labelContainer_title}>
                    <h3>{title}</h3>
                </div>
                <div className={style.btnsContainer}>
                    <div>
                        <GenericButtonComponent text="Easy" onClick={() => handleOnClick(Levels.EASY)} isSelected={levelSelected === Levels.EASY} />
                    </div>
                    <div>
                        <GenericButtonComponent text="Normal" onClick={() => handleOnClick(Levels.NORMAL)} isSelected={levelSelected === Levels.NORMAL} />
                    </div>
                    <div>
                        <GenericButtonComponent text="Hard" onClick={() => handleOnClick(Levels.HARD)} isSelected={levelSelected === Levels.HARD} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelsComponent;
