import { Box } from '@mui/material';
import { useParams} from 'react-router-dom';
import NewSessionTypeCard from './components/NewSessionTypeCard';

const NewSessionType : React.FC = () => {
    const { type } = useParams()
   
    return (
        <Box sx={{ justifyContent: 'center', flexGrow: 1, paddingTop: 12, width: '100%' }} >
            <NewSessionTypeCard 
                type={type} /> 
        </Box>

    );
}

export default NewSessionType;