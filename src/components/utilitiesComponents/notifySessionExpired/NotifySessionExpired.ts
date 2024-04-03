import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => toast('Session expired. Please log in again', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    style: {
        background: "#1ED760",
        color: '#181818',
        fontFamily: 'Figtree',
        fontWeight: 'bold'
    }
});
