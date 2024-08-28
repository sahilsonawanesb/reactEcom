// importing MUI Component
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className='app-spinner'>
            <CircularProgress size={60}/>
        </div>
      );
}

// exporting Loader
export default Loader;