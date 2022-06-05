import { Box, Button, FormControlLabel, FormControl, FormGroup, Switch, Typography } from "@mui/material";
import React from "react";

interface IShareLinkCardProps {
    link: String,
    onClose: any
}


const switchLabel = { inputProps: { 'aria-label': 'Let this link expire after the first booking' } };

const ShareLinkCard: React.FC<IShareLinkCardProps> = (props) => {
    const [copyButtonText, setCopyButtonText] = React.useState('Copy Link')
    return (
        <Box sx={{ width: '800px' }}>
            <Typography>
                Copy and paste your scheduling link into a message
            </Typography>

            <br />

            <Typography>
                <a href={props.link.toString()}>{props.link}</a>
            </Typography>


            <br />

            {/* <FormControl component="fieldset">
                <FormGroup aria-label="position" row> */}
                    <FormControlLabel sx={{margin:0, padding:0}}
                        value="start"
                        control={<Switch color="primary" />}
                        label="Let this link expire after the first booking"
                        labelPlacement="start"
                    />
                {/* </FormGroup>
            </FormControl> */}


            <br />
            <a href={props.link.toString()}>Preview Availibility</a>
            <br />
            <br />

            <Button onClick={props.onClose}>Close</Button>
            <Button onClick={() => {
                                    navigator.clipboard.writeText(props.link.toString());
                                    setCopyButtonText('Link Copied! ✓');
                                    setTimeout(()=>{setCopyButtonText('Copy Link')},1500); 
            
                                    }}>{copyButtonText}</Button>
        </Box>

    );
}


export default ShareLinkCard;