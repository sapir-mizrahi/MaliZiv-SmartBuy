import * as React from 'react';
import './HistoryShopping.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { BiExpand } from 'react-icons/bi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getHistory } from './Utils/Rest';

export default function HistoryShopping() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [history, setHistory] = React.useState(
        [{ date: '01/01/2020', list: ["eee", "ddd", "fff"] },
        { date: '01/01/2020', list: ["eee", "ddd", "fff"] },
        { date: '01/01/2020', list: ["eee", "ddd", "fff"] }]);

    // React.useEffect(async () => {
    //     const res = await getHistory(localStorage.getItem?.user?.id);
    //     if (res?.status === 200) {
    //         setHistory(res?.data)
    //     }
    // }, []);

    return (
        <div className='all-history-lists'>
            {history?.map((itemList, index) =>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                        border: '2px solid gray',
                        borderRadius: '10px',
                        margin: '10px'
                    }}
                    subheader={<li />}
                >
                    <BiExpand onClick={handleOpen} className='icon-expand' />
                    <li key={`section-`}>
                        <ul>
                            <ListSubheader className='list-subheader'>List number {index + 1} <br />{itemList?.date}</ListSubheader>
                            {itemList?.list?.map((item) => (
                                <ListItem key={`item-9`}>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>

                </List>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >
                            <li key={`section-`}>
                                <ul>
                                    <ListSubheader className='list-subheader'>List number 1 <br />01/01/2022</ListSubheader>
                                    {[0, 1, 2, 3, 4, 5, 6, 6].map((item) => (
                                        <ListItem key={`item-9`}>
                                            <ListItemText primary={`Item `} />
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>

                        </List>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}