import { useContext } from "react";
import { PlayContext } from "../context/playContext/PlayContext";

const usePlay = () => useContext(PlayContext);
export default usePlay;