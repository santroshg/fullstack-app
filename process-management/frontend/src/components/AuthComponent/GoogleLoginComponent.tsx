import React, { Component, Fragment } from 'react';
import { backtendHost } from '../../constants/constants';
import { Toolbar, AppBar, Typography } from '@material-ui/core';

interface GoogleLoginComponentProps { }

export default class GoogleLoginComponent extends Component<GoogleLoginComponentProps> {
    constructor(props: GoogleLoginComponentProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Fragment>

                <div className='app-header'>
                    <AppBar position="static">
                        <Toolbar className="app-header__element">
                            <div>
                                <Typography variant="h6" color="inherit" className='app-header__title'>
                                    <a href="/home" className='app-header__title--link'>Process Management</a>
                                </Typography>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="login-component">
                    <div className="login-wrapper">
                        <div className='login-text'><h3>Welcome to Process Management</h3><h4>Please Sign in</h4></div>
                        <div className="google-login-button">
                            <a href={`${backtendHost}/users/auth/google`} className="button">
                                <button className="loginBtn loginBtn--google">
                                    Login with Google
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}
