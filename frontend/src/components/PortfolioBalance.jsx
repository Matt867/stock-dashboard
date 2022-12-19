import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container, flexbox } from '@mui/system';

export default function PortFolioBalance ({value}) {

    return(
        <>
            <Box style={{ backgroundColor:"#6e87ba", paddingTop: '50px', paddingBottom: '50px', paddingLeft: '30px' }} sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                    <Typography variant="h4" component="div" color={'white'}>
                        Balance 
                    </Typography>
                    <Typography sx={{fontWeight: 'bold'}} variant="h2" component="div" color={'white'}>
                        ${value.toLocaleString(undefined, {maximumFractionDigits:2})}
                    </Typography>
            </Box>
        </>
    )
}