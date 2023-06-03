import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Alert } from '@mui/material';
import './NewList.css';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { TbChecklist } from 'react-icons/tb';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { newList } from './Utils/Rest';

const CreateShoppingList = () => {
  const [items, setItems] = useState([]);
  const [itemToAdd, setItemToAdd] = useState('');
  const [alertValidate, setAlertValidate] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleAddItem = async () => {
    if (itemToAdd !== '') {
      setItems([...items, itemToAdd])
    }
    const res = await newList(localStorage.getItem?.user?.id, items, new Date())
    if (res.status === 200) {
      setOpenModal(true)
    }
  };

  const saveAndAdd = () => {
    if (itemToAdd !== '') {
      setItems([...items, itemToAdd])
      setItemToAdd('');
    }
    else {
      setAlertValidate(true)
      setTimeout(() => {
        setAlertValidate(false)
      }, 3000);
    }
  }

  const handleRemoveProduct = (index) => {
    let helpArr = items.filter(x => x.name !== items[index].name)
    setItems(helpArr)
  };

  return (
    <div style={{ width: '65%', margin: 'auto' }}>
      <h2 >Let's start creating a new shopping list...</h2>
      <List>
        {items.map((item, index) => (

          <ListItem key={index}>
            <div> <BsCartCheck className='shoppint-cart-icon' /></div>
            <ListItemText primary={item} />
            <div className='delete-icon' onClick={() => handleRemoveProduct(index)}><RiDeleteBin2Line /></div>

          </ListItem>
        ))}
      </List>
      <div className='add-item-div'>

        <div className='input-list'>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={itemToAdd}
            onChange={(e) => setItemToAdd(e.target.value)}
          />
        </div>

        <div className='add-button-div'>
          <MdOutlineAddCircleOutline className='icon-add' onClick={() => saveAndAdd()} />
        </div>

      </div>
      {alertValidate && <Alert style={{ marginBottom: '10px' }} severity="error">A product must be filled before saving</Alert>}

      <Button className='btn-save-list' onClick={handleAddItem} variant="contained" color="primary">
        Save List
      </Button>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TbChecklist className='icon-saved' />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The list has been successfully saved!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateShoppingList;
