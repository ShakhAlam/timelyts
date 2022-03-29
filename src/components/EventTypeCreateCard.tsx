//import { ExpandMore } from "@mui/icons-material";
import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, colors, IconButton, IconButtonProps, styled, SvgIconTypeMap, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { OverridableComponent } from "@mui/material/OverridableComponent";

import { isMobile } from 'react-device-detect';


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
    icon: ReactElement<any, any>, //OverridableComponent<SvgIconTypeMap<{}, "svg">>
};

const EventTypeCreateCard: React.FC<IEventTypeCreateCardProps> = ({ title, description, icon }) => {


    const matches = useMediaQuery('(min-width:600px)');

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
                        sx={{ borderRadius: '20px', width: '100%' }}>
                        Create
                    </Button>
                }
                title={matches ? title : ''}
                subheader={matches ? description : ''}


            />
            {
                !matches &&

                <CardContent>

                    <Typography paragraph>
                        <Typography>
                        {title}
                        </Typography>
                        
                        {description}

                    </Typography>
                </CardContent>


            }

        </CardStyled>




    )
};


export default EventTypeCreateCard;