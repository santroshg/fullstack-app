import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Route, Switch } from 'react-router';
import {styles} from './AppHeaderStyle';

export default class AppHeader extends Component {
  render() {
    return (
      
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" color="inherit" noWrap>
            <a href="/home" style={styles.headerMenu}>Process Management</a>
            </Typography>
            <div className="grow" />
          </Toolbar>
        </AppBar>
        {/* <Switch>
          <Route path="/" exact render={() => <h1>Welcome to Stackroute learning...</h1>} />
          <Route path="/trello" render={() => <h1>Trello</h1>} />
          <Route path="/slack" render={() => <h1>Slack</h1>} />
          <Route path="/trello" component={Trello} />
          <Route path="/slack" component={Slack} />
          
        </Switch> */}
      </div>
    );
  }
}
