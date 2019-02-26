import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from '../../store/types';
import { backtendHost } from '../../constants/constants';

interface AppHeaderProps {
  authenticatedUser: User
}
interface AppHeaderState {

}

export default class AppHeader extends React.PureComponent<AppHeaderProps, AppHeaderState> {
  constructor(props: AppHeaderProps) {
    super(props);
  }

  render() {
    return (
      <div className='app-header'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className='app-header__title'>
           <a href="/home" className='app-header__title--link'>Process Management</a> 
          </Typography>
          <Typography variant="h6" color="inherit" className='app-header__title'>
            {this.props.authenticatedUser.userDisplayName}
          </Typography>
          <Typography variant="h6" color="inherit" className='app-header__title'>
            <a href={`${backtendHost}/users/api/logout`} className='app-header__title--link'>Logout</a> 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}
