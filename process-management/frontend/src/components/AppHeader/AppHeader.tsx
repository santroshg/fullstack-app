import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { GoogleUser } from '../../store/types';
import { backtendHost } from '../../constants/constants';

interface AppHeaderProps {
  authenticatedUser: GoogleUser,
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
        <Toolbar className="app-header__element">
        <div className="app-header-text"> 
          <Typography variant="h6" color="inherit" className='app-header__title'>
           <a href="/home" className='app-header__title--link'>Process Management</a> 
          </Typography>
        </div>
        <div className="app-header-user">
          <Avatar alt="Avatar Img" 
            src={this.props.authenticatedUser.profileImgUrl as string}
            className="app-header-user__avatar" />
          <Typography variant="h6" color="inherit" className='app-header-user__title'>
            {this.props.authenticatedUser.userDisplayName}
          </Typography>
        </div>
        <div  className="app-header-logout">
          <Typography variant="h6" color="inherit" className='app-header__title'>
            <a href={`${backtendHost}/users/api/logout`} className='app-header__title--link'>Logout</a> 
          </Typography>
        </div>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}
