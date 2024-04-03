import { useContext } from 'react'
import { GameContext } from '../context/gameContext/GameContext'

const useGame = () => useContext(GameContext);
export default useGame