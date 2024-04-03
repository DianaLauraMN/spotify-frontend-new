import { useContext } from 'react';
import { GTSContext } from '../context/gtsContext/GTSContext';

const useGTS = () => useContext(GTSContext);
export default useGTS;