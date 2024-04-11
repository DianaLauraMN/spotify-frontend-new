import style from "./IncludesComponent.module.css";
import useGame from "../../hooks/useGame";

enum CBOX {
    REMIXES = "REMIXES",
    INTROS_OUTROS = "INTROS_OUTROS",
}

interface searchGenreComponentProps {
    title: string;
}
const IncludesComponent: React.FC<searchGenreComponentProps> = ({ title }) => {
    const { handleOnChangeAllowRemixes, handleOnChangeAllowIntrosOutros } = useGame();

    const handleCheckboxChange = (event: { target: { checked: any; id: any }; }) => {
        const isChecked = event.target.checked;
        const checkboxId = event.target.id;

        switch (checkboxId) {
            case CBOX.REMIXES:
                handleOnChangeAllowRemixes(isChecked);
                break;
            case CBOX.INTROS_OUTROS:
                handleOnChangeAllowIntrosOutros(isChecked);
                break;
            default:
                break;
        }

    };
    return (
        <div className={style.IncludesContainer}>
            <div className={style.centerContainer}>
                <h3>{title}</h3>
                <div className={style.formCbxOptions}>
                    <div className={style.option}>
                        <input type="checkbox" id={CBOX.REMIXES} value="first_checkbox" defaultChecked={true} onChange={handleCheckboxChange} />
                        <label htmlFor="beggining">Remix Songs</label>
                    </div>
                    <div className={style.option}>
                        <input type="checkbox" id={CBOX.INTROS_OUTROS} value="second_checkbox" defaultChecked={true} onChange={handleCheckboxChange} />
                        <label htmlFor="randomPart">Intros & Outros</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncludesComponent;