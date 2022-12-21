import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container, flexbox } from '@mui/system';

export default function PortFolioBalance ({value}) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return(
        <>
            <Box style={{ backgroundColor:"black", paddingTop: '50px', paddingBottom: '70px', paddingLeft: '120px', display: 'flex'}}>
                    <Container>
                        <Typography variant="h4" component="div" color={'white'}>
                            Portfolio Value 
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}} variant="h2" component="div" color={'white'}>
                            {formatter.format(value)}
                        </Typography>

                    </Container>
            </Box>
        </>
    )
}