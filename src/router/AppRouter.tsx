import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage/LoginPage';
import GamePage from '../pages/gamePage/GamePage';
import ConfigGamePage from '../pages/configGamePage/ConfigGamePage';
import { ToastContainer } from 'react-toastify';

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/game' element={<GamePage />} />
                <Route path='/configGame' element={<ConfigGamePage />} />
            </Routes>
            <ToastContainer />
        </Router>
    )
}

export default AppRouter;
