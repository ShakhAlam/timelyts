//import { ExpandMore } from "@mui/icons-material";
import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, colors, Grid, IconButton, IconButtonProps, styled, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { green, red } from "@mui/material/colors";
import StarIcon from '@mui/icons-material/Star';
import ScheduleWeekView from "./ScheduleWeekView";
import EditIcon from '@mui/icons-material/Edit';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const BoxStyled = styled(Box)(({ theme }) => (
    {
        opacity: '0.95',
        color: 'grey',
        padding: 0,
        borderTopColor: 'green',
        borderTop: 0,
        borderRadius: '0%', //theme.shape.borderRadius,
        //backgroundColor: alpha(colors.green[100], 0.00),
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

    }));

const CardStyled = styled(Card)(
    ({ theme }) => ({
        padding: '0px',
        opacity: '0.95'
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

interface IContactCardProps {
    name: String,
    email: String
}

const ContactCard: React.FC<IContactCardProps> = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

        <BoxStyled sx={{ borderTop: 4 }}>

            <CardStyled>

                <CardHeader

                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.name}
                    subheader=''
                />



                <CardActions disableSpacing>
                    <IconButton aria-label="Edit Session Type">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                        <Grid container spacing={1}>

                            <Grid item xs={6} sm={6} md={3}>
                                <Button variant="text" endIcon={<OpenInNewIcon />}>Edit Contact</Button>
                                {/* <Button variant="text" endIcon={<FilterAltIcon />}>Filter</Button>

                                <Button variant="text" endIcon={<ExportIcon />}>Export</Button> */}


                            </Grid>


                            <Grid item xs={6} sm={6} md={6}>



                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>EMail:</Typography>

                                <Typography>{props.email}</Typography>
                                <br />

                                


                            </Grid>

                        </Grid>


                    </CardContent>
                </Collapse>

            </CardStyled>


        </BoxStyled>

    )
}

export default ContactCard;