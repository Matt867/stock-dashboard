import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AreaChart from '../../../components/AreaCart';
import Divider from '@mui/material/Divider';



export default function MarketListItem({ name, ticker, values }) {
    const today = values[0]
    const closing = today.Close
    const weeklyDelta = (closing -  values[6].Close) / closing

    const priceFormatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
    const marketCapFormatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', notation: 'compact' })

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={ticker}
                />
                <ListItemText primary={priceFormatter.format(today.Close)} />
                <ListItemText primary={`${weeklyDelta.toFixed(4)}%`} />
                <ListItemText primary={marketCapFormatter.format(closing * today.Volume)} />
                <ListItemText primary={marketCapFormatter.format(today.Volume)} />
                <AreaChart plotData={values} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};