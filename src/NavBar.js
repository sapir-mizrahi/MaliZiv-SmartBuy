import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import './NuvBar.css';
import { FiLogOut } from 'react-icons/fi';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 6000,
  },
  tab: {
    color: "white"
  }
});

export const NavBar = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutUser = () => {
    localStorage.setItem('userName', '')
    navigate('/')
  }
  return (
    <>
      <Paper square className={`nuv-bar-main ${classes.root}`}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
          className="all-tabs"
        >
          <Tab
            label="SHOPPING LIST"
            component={Link}
            to="shoppingList"
            className={classes.tab}
          />
          <Tab
            label="NEW LIST"
            component={Link}
            to="newList"
            className={classes.tab}
          />
          <Tab
            label="SHOPPING HISTORY"
            component={Link}
            to="shoppingHistory"
            className={classes.tab}
          />
        </Tabs>
        {localStorage.userName !== "" && <div onClick={() => logoutUser()} style={{ color: '#038948', cursor: 'pointer', fontWeight: 'bold' }}>Logout <FiLogOut /></div>}

      </Paper>
    </>
  )
}

