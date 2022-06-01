
//import { ExpandMore } from "@mui/icons-material";
import { alpha, Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, colors, IconButton, IconButtonProps, styled, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { green, red } from "@mui/material/colors";
import StarIcon from '@mui/icons-material/Star';
import ScheduleWeekView from "./ScheduleWeekView";

const BoxStyled = styled(Box)(({ theme }) => (
    {
        opacity: '0.70',
        color: 'grey',
        padding: 0,
        borderTopColor: 'green',
        borderTop: 4,
        borderRadius: '0%', //theme.shape.borderRadius,
        backgroundColor: alpha(colors.green[100], 0.00),
        // '&:hover': {
        //     backgroundColor: alpha(colors.amber[100], 0.5),
        //     color:  alpha(colors.blue[400], 0.9)
        // },
        //marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',

        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(3),
        //     width: 'auto',
        // }

        maxHeight : 100
    }));

const CardStyled = styled(Card)(
    ({ theme }) => ({
        padding: '0px',
        opacity: '0.99',
        height : '354px' 
    }
    )
);

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface IScheduleCardProps {
    name : String
}

const BookingSessionInfoCard : React.FC<IScheduleCardProps> = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

            <BoxStyled sx={{ borderTop: 4, height:'400px',  maxHeight : '400px' }}>

                <CardStyled>

                    <CardHeader
                       
                        
                        title= 'C Programming 101' 
                        subheader= {props.name}
                    />



                        <CardContent>
                            <Typography>1 Hour</Typography>

                            <Typography>Web conference</Typography>

                        </CardContent>
                  

                </CardStyled>


            </BoxStyled>

    )
}

export default BookingSessionInfoCard;

