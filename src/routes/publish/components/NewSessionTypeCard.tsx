import { alpha, Avatar, Box, Button, Card, CardActions, CardHeader, colors, Grid, styled, TextField, useMediaQuery } from "@mui/material";
import { bottom } from "@popperjs/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import PersonIcon from '@mui/icons-material/Person';

import { Link } from 'react-router-dom';




import React, { useState } from "react";


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

interface INewSessionTypeCardProps {
    type: string | undefined
}


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
        padding: '5px',
        opacity: '0.95'
    }
    )
)

const NewSessionTypeCard: React.FC<INewSessionTypeCardProps> = (props) => {

    const [formValues, setFormValues] = useState(defaultValues)


    const mdScreen = useMediaQuery('(min-width:600px)');


    const title = 'One-on-One'
    const description = 'Add New Session Type'

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const routeTo = "create/";

    return (

        <BoxStyled>
            <CardStyled>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: colors.blue[400] }} aria-label="recipe">
                            {<PersonIcon />}
                        </Avatar>
                    }
                    // action={
                    //     <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}
                    //         component={Link} to={routeTo}
                    //         sx={{ borderRadius: '20px', width: '100%' }}>
                    //         Create
                    //     </Button>
                    // }
                    title={mdScreen ? title : ''}
                    subheader={mdScreen ? description : ''}


                />
                <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
                    <GridStyled item xs={11} sm={11} md={8} sx={{ padding: '5px' }}>


                        <TextField
                            id="name-input"
                            name="name"
                            label="Event Name"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </GridStyled>
                    <GridStyled item xs={11} sm={11} md={8}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Location"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />

                    </GridStyled>

                    <GridStyled item xs={11} sm={11} md={8}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Description/Instruction"
                            type="string"
                            value={formValues.name}
                            onChange={handleInputChange}
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
                    
                    <Button variant="contained" size="small">Next</Button>

                </CardActions>
            </CardStyled>
            
        </BoxStyled>

    );
}

export default NewSessionTypeCard;
