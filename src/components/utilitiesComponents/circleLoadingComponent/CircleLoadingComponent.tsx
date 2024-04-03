import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const CircleLoadingComponent = () => {
    const circularProgressStyle = {
        color: '#1ED760'
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress
                thickness={3}
                sx={circularProgressStyle} />
        </Box>
    );
}

export default CircleLoadingComponent