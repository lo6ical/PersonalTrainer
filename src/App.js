import './App.css';
import React, { useState, useEffect } from 'react';
import Traininglist from './components/Traininglist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customerlist from './components/Customerlist';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import PortraitIcon from '@material-ui/icons/Portrait';
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import BarChartIcon from '@material-ui/icons/BarChart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import bodybuilder4 from './img/bodybuilder4.png';
import HomeIcon from '@material-ui/icons/Home';





function App() {

  const toggleDrawer = (open) => (event) => {
    setState(open)
  }

  const [state, setState] = React.useState(false)

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();



  const list = () => (
    <div>
      <Link className="text-link" to="/customers">
        <Button
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<PortraitIcon />}
        > Customers
    </Button>
      </Link>{' '}
      <br />
      <Link className="text-link" to="/trainings">
        <Button
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<SportsKabaddiIcon />}
        > Trainings
    </Button>
      </Link>{' '}
      <br />
      <Link className="text-link" to="/">
        <Button
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<HomeIcon />}
        > Home
    </Button>
      </Link>{' '}
      <br />
    </div>
  )

  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <FormatListBulletedIcon />
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
            <Typography variant="h6">
              PersonalTrainer
          </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" render={() => 
            <div>
            <h2>Personal Trainer app</h2>
            <img src={bodybuilder4}/>
            </div>
            } />
          <Route path="/customers" component={Customerlist} />
          <Route path="/trainings" component={Traininglist} />
          <Route path="*" render={() => <h2>Error! Page not  found!</h2>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;