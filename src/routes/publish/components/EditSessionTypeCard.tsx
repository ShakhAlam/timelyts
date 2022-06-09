import { alpha, Avatar, Box, Button, Card, CardActions, CardHeader, colors, Grid, IconButton, styled, TextField, useMediaQuery } from "@mui/material";
import { bottom } from "@popperjs/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { Link } from 'react-router-dom';



import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState } from "react";
import EventLocationAutoComplete from "./EventLocationAutoComplete";
import { AnyAaaaRecord } from "dns";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



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


interface IEditSessionTypeCardProps {
    id: string | undefined
}


const EditSessionTypeCard: React.FC<IEditSessionTypeCardProps> = (props) => {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const [formValues, setFormValues] = useState(defaultValues)

    const iconsMap: Map<string | undefined, JSX.Element> = new Map(
        [
            ['one-on-one', <PersonIcon />],
            ['group', <GroupsIcon />],
            ['collective', <GroupWorkIcon />],
            ['round-robin', <RestartAltIcon />],

        ]);

    const mdScreen = useMediaQuery('(min-width:600px)');


    const title = '' //props.type
    const description = 'Edit Session Type:'

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSave = (e: any) => {
        setExpanded(false)
    }
    const handleCancel = (e: any) => {
        setExpanded(false)
    }

    const routeTo = "create/" + props.id;

    return (

        <BoxStyled>
            <CardStyled>
                <CardActions sx={{ justifyContent: "left" }}>
                    <IconButton  onClick={()=>{ window.history.back(); } } size="small"><ArrowBackIcon />Back</IconButton>

                    {/* <Button variant="contained" size="small">Next</Button> */}

                </CardActions>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: colors.blue[400] }} aria-label="recipe">
                            {/*iconsMap.get(props.type) */}
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
                    subheader={mdScreen ? '' : ''}


                />
                <div>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Session Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                        label="Session Direct Link"
                                        type="string"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />

                                </GridStyled>
                                <GridStyled item xs={11} sm={11} md={8}>

                                    <TextField
                                        id="name-input"
                                        name="name"
                                        label="Session Color"
                                        type="string"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />

                                </GridStyled>

                                <GridStyled item xs={11} sm={11} md={8}>

                                    <Button onClick={handleCancel} size="small">Cancel</Button>

                                    <Button onClick={handleSave} variant="contained" size="small">Save</Button>


                                </GridStyled>
                            </Grid>
                        </AccordionDetails>

                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Available Times</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                </div><div>
                    <div>
                        <Typography sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
                            Additional Options
                        </Typography>
                    </div>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Questions for Invitees</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography>Workflows</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>


                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                            <Typography>Notifications and Cancellation Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>


                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                            <Typography>Confirmation Page</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                            <Typography>Collect Payments</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>


                </div>


            </CardStyled>

        </BoxStyled>

    );
}

export default EditSessionTypeCard;
