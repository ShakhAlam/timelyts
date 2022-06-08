//import { ExpandMore } from "@mui/icons-material";
import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, colors, IconButton, IconButtonProps, styled, SvgIconTypeMap, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { OverridableComponent } from "@mui/material/OverridableComponent";

import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';



const CardStyled = styled(Card)(
    ({ theme }) => ({
        padding: '8px',
        opacity: '0.8',
        borderRadius: '0%',
        border: '0px',
        boxShadow: 'none'
    }
    )
);


interface IEventTypeCreateCardProps {
    title: String,
    description: String,
    type: String,
    icon: ReactElement<any, any>, //OverridableComponent<SvgIconTypeMap<{}, "svg">>
};

const EventTypeCreateCard: React.FC<IEventTypeCreateCardProps> = ({ title, type, description, icon }) => {


    const mdScreen = useMediaQuery('(min-width:600px)');

    const routeTo = "create/" + type

    return (



        <CardStyled>

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: colors.blue[400] }} aria-label="recipe">
                        {icon}
                    </Avatar>
                }
                action={
                    <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                    component={Link} to={routeTo}
                        sx={{ borderRadius: '20px', width: '100%' }}>
                        Create
                    </Button>
                }
                title={mdScreen ? title : ''}
                subheader={mdScreen ? description : ''}


            />
            {
                !mdScreen &&

                <CardContent>

                    <Typography paragraph>
                        <Typography sx={{ fontSize: '14px', fontWeight : 'bold'}}>
                            {title}
                        </Typography>

                        <Typography sx={{ fontSize: '12px' }}>
                            {description}
                        </Typography>


                    </Typography>
                </CardContent>


            }

        </CardStyled>




    )
};


export default EventTypeCreateCard;