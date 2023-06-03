// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Divider, Button, TextField, Box } from '@mui/material';

// const ShoppingList = () => {
//   const [items, setItems] = useState([
//     { name: 'Apples', checked: false },
//     { name: 'Bananas', checked: true },
//     { name: 'Oranges', checked: false },
//   ]);

//   const [editIndex, setEditIndex] = useState(-1);
//   const [editValue, setEditValue] = useState('');

//   const handleToggle = (index) => {
//     setItems((prevItems) => {
//       const updatedItems = [...prevItems];
//       updatedItems[index].checked = !updatedItems[index].checked;
//       return updatedItems;
//     });
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditValue(items[index].name);
//   };

//   const handleSaveEdit = (index) => {
//     setItems((prevItems) => {
//       const updatedItems = [...prevItems];
//       updatedItems[index].name = editValue;
//       return updatedItems;
//     });
//     setEditIndex(-1);
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(-1);
//   };

//   return (
//     <Box sx={{ border: '1px solid black', p: 2 }}>
//       <List>
//         {items.map((item, index) => (
//           <React.Fragment key={index}>
//             {index === editIndex ? (
//               <ListItem>
//                 <TextField
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                 />
//                 <Button onClick={() => handleSaveEdit(index)}>Save</Button>
//                 <Button onClick={handleCancelEdit}>Cancel</Button>
//               </ListItem>
//             ) : (
//               <ListItem dense button onClick={() => handleToggle(index)}>
//                 <ListItemIcon>
//                   <Checkbox edge="start" checked={item.checked} tabIndex={-1} disableRipple />
//                 </ListItemIcon>
//                 <ListItemText primary={item.name} />
//                 <Button onClick={() => handleEdit(index)}>Edit</Button>
//               </ListItem>
//             )}
//             <Divider />
//           </React.Fragment>
//         ))}
//       </List>
//       <Button variant="outlined">OK</Button>
//       <Button variant="outlined" onClick={() => setEditIndex(0)}>Edit</Button>
//     </Box>
//   );
// };

// export default ShoppingList;
import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './shoppingList.css';
import { BsCartCheck } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BiCartAdd } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineAddTask } from 'react-icons/md';
import axios from 'axios';
import { Alert } from '@mui/material';
import { getList, updateList } from './Utils/Rest';

const defaultTheme = createTheme();

const ShoppingList = () => {

  const [modeList, setModeList] = useState("static");
  const itemToAdd = useRef('')
  const [currentIndexToAdd, setCurrentIndexToAdd] = useState();
  const [items, setItems] = useState({
    saleId: '', products: [
      { name: 'Apples', checked: false },
      { name: 'Bananas', checked: true },
      { name: 'Oranges', checked: false },
    ]
  });

  // useEffect(async () => {
  //   const res = await getList(localStorage.user?.id)
  //   if (res?.status === 200) {
  //     setItems(res?.data)
  //   }
  // }, [])

  const handleAddProductToList = (index) => {
    let helpArr = items
    helpArr.splice(index + 1, 0, { name: itemToAdd.current.value, checked: true })
    setCurrentIndexToAdd(-1)
    setItems(helpArr);
  };

  const handleRemoveProduct = (index) => {
    let helpArr = items.filter(x => x.name !== items[index].name)
    setItems(helpArr)
  };

  const handleSaveUpdatedList = async () => {
    const res = await updateList(localStorage.getItem?.user?.id, items)
    if (res?.status === 200) {
      console.log("success");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <h2>Welcome {localStorage.user?.name}! <br />
          Suggested shopping List for you</h2>
        {modeList === "edit" && <Alert severity="info" style={{ marginBottom: '15px' }}>Note! Order in a shopping list helps to shop faster.</Alert>}
        <div className='list-of-products'>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem className={`${modeList === 'edit' ? 'item-of-list' : 'item-of-list-edit'}`} >
                  {modeList === "static" && <div> <BsCartCheck className='shoppint-cart-icon' /></div>}
                  <div>{item.name}</div>
                  {modeList === "edit" &&
                    <div className='icons-div'>
                      <div className='add-icon' onClick={() => setCurrentIndexToAdd(index)}><BiCartAdd /></div>
                      <div className='delete-icon' onClick={() => handleRemoveProduct(index)}><RiDeleteBin2Line /></div>
                    </div>}

                </ListItem>
                {currentIndexToAdd === index && modeList === "edit" && <div className='div-add-pro'> <input ref={itemToAdd} className='input-add' /> <MdOutlineAddTask onClick={() => handleAddProductToList(index)} className='add-current-icon' /></div>}
              </React.Fragment>
            ))}
          </List>

          {modeList === "static" && <button className='btn-edit-shopping-list' onClick={() => setModeList("edit")}><FaEdit /> <br />Edit Shopping List</button>}

          {modeList === "edit" &&
            <div className='btns-edit'>
              <button className='btn-save-shopping-list' onClick={() => handleSaveUpdatedList()}><FaEdit /> Save</button>
              <button className='btn-cencel' onClick={() => setModeList("static")}><FaEdit />Cencel</button>
            </div>}
        </div>
      </Container>
    </ThemeProvider >
  );
};

export default ShoppingList;

