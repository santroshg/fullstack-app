import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Route, Switch } from 'react-router';
import Button from '@material-ui/core/Button';
import {styles} from './AppHeaderStyle';
import GoogleAuthComponent from '../AuthComponent/GoogleAuthComponent';
import { User } from '../../store/types';

interface AppHeaderProps {
  authenticatedUser: User
}
interface AppHeaderState {

}

export default class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
  constructor(props: AppHeaderProps) {
    super(props);
    this.state = {
    }
    console.log('authenticatedUser', this.props.authenticatedUser);
  }
  render() {
    return (
      <div className='app-header'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className='app-header__title'>
            Process Management
          </Typography>
          <GoogleAuthComponent authenticatedUser={this.props.authenticatedUser} />
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}
