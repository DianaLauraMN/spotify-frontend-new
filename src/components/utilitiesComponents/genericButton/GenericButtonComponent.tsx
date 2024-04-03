import { FC, useEffect } from "react";
import style from "./GenericButtonComponent.module.css";
import { useState } from "react";

interface IButton {
    text: string;
    onClick(): any;
    isSelected: boolean
}

const GenericButtonComponent: FC<IButton> = ({ text, onClick, isSelected }) => {
    const [selected, setSelected] = useState<true | false>(false);

    useEffect(() => {
        setSelected(isSelected);
    }, [isSelected]);

    const handleButtonClick = () => {
        onClick();
        setSelected(!selected);
    };

    return (
        <div className={style.btnConfigs}>
            <button onClick={handleButtonClick} className={selected ? style.btnSelected : style.btnNotSelected}>
                {text}
            </button>
        </div>
    )
}

export default GenericButtonComponent