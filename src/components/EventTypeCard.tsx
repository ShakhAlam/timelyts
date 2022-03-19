//import { ExpandMore } from "@mui/icons-material";
import { alpha, Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, colors, IconButton, IconButtonProps, styled, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { green, red } from "@mui/material/colors";

const BoxStyled = styled(Box)(({ theme }) => (
    {
        color: 'white',
        borderTopColor: 'green',
        borderTop: 4,
        borderRadius: '2%', //theme.shape.borderRadius,
        backgroundColor: alpha(colors.green[100], 0.00),
        '&:hover': {
            backgroundColor: alpha(colors.amber[100], 0.5),
            color:  alpha(colors.blue[400], 0.9)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',

        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        }

    }));

const CardStyled = styled(Card)(
    ({ theme }) => ({
        padding: '18px',
        opacity: '0.8'
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

export default function EventTypeCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

            <BoxStyled sx={{ borderTop: 4 }}>

                <CardStyled>

                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: colors.blue[400] }} aria-label="recipe">
                                
                                <Typography sx={{fontSize:25, borderTop:0}}>

                                30
                                </Typography>
                                
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="30 Minute Meeting"
                        subheader="One:One"
                    />



                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
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

                            <Typography paragraph>
                                Settings

                            </Typography>
                        </CardContent>
                    </Collapse>

                </CardStyled>


            </BoxStyled>

    )
}
