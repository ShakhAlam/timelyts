import { alpha, Avatar, Box, Button, Card, CardActions, CardHeader, colors, Grid, styled, TextField, useMediaQuery } from "@mui/material";
import { bottom } from "@popperjs/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { Link } from 'react-router-dom';



import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

import RestartAltIcon from '@mui/icons-material/RestartAlt';


import React, { useState } from "react";
import EventLocationAutoComplete from "./EventLocationAutoComplete";
import { AnyAaaaRecord } from "dns";


const BoxStyled = styled(Box)(({ theme }) => (
    {
        opacity: '0.95',
        color: 'white',
        padding: 0,
        borderTopColor: 'green',
        borderTop: 4,
        borderRadius: '2%', //theme.shape.borderRadius,
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

    }));


const defaultValues = {
    name: "",


};

const CardStyled = styled(Card)(
    ({ theme }) => ({
        padding: '0px',
        opacity: '0.95',
        actions: {
            display: "block",
            justifyContent: "center"
          }
    }
    )
);

const GridStyled = styled(Grid)(
    ({ theme }) => ({
        padding: '10px',
        opacity: '0.95'
    }
    )
)


interface INewSessionTypeCardProps {
    type: string | undefined
}


const NewSessionTypeCard: React.FC<INewSessionTypeCardProps> = (props) => {

    const [formValues, setFormValues] = useState(defaultValues)

    const iconsMap : Map<string|undefined,JSX.Element> = new Map(
                                                [
                                                    ['one-on-one', <PersonIcon/>],
                                                    ['group', <GroupsIcon/> ],
                                                    ['collective', <GroupWorkIcon />],
                                                    ['round-robin', <RestartAltIcon />],
                                                    
                                                ]);

    const mdScreen = useMediaQuery('(min-width:600px)');

   

    const title = props.type
    const description = 'Add New Session Type:'

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const routeTo = "/publish/edit/1";

    return (

        <BoxStyled>
            <CardStyled>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: colors.blue[400] }} aria-label="recipe">
                            {iconsMap.get(props.type)}
                        </Avatar>
                    }
                    // action={
                    //     <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                    //         component={Link} to={routeTo}
                    //         sx={{ borderRadius: '20px', width: '100%' }}>
                    //         Create
                    //     </Button>
                    // }
                    title={mdScreen ? description : ''}
                    subheader={mdScreen ? props.type: ''}


                />
                <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
                    <GridStyled item xs={11} sm={11} md={8} >


                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                            placeholder="Enter Session Type Name"
                        />
                    </GridStyled>
                    <GridStyled item xs={11} sm={11} md={8}>

                    

                        <EventLocationAutoComplete label="Location" />
                    </GridStyled>

                    <GridStyled item xs={11} sm={11} md={8}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Description/Instruction"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            sx={{ width: 400 }}
                            // InputLabelProps={{ shrink: true }} 
                            placeholder="Add description here"
                        />

                    </GridStyled>

                    <GridStyled item xs={11} sm={11} md={8}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Event Direct Link"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />

                    </GridStyled>
                    <GridStyled item xs={11} sm={11} md={8}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Event  Color"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />

                    </GridStyled>

                    {/* <GridStyled item xs={11} sm={11} md={8}>

                        <Button
                            id="name-input"
                            name="name"
                            label="Event  Color"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />

                    </GridStyled> */}

                </Grid>
                <CardActions sx={{justifyContent:"center"}}>
                    <Button size="small">Cancel</Button>
                    
                    <Button  component={Link} to={routeTo} variant="contained" size="small">Next</Button>

                </CardActions>
            </CardStyled>
            
        </BoxStyled>

    );
}

export default NewSessionTypeCard;
