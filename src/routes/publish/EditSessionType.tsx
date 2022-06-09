import { Box } from '@mui/material';
import { useParams} from 'react-router-dom';
import EditSessionTypeCard from './components/EditSessionTypeCard';

const EditSessionType : React.FC = () => {
    const { id } = useParams()
   
    return (
        <Box sx={{ justifyContent: 'center', flexGrow: 1, paddingTop: 12, width: '100%' }} >
            <EditSessionTypeCard 
                id={id} /> 
        </Box>

    );
}

export default EditSessionType;