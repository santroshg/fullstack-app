import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { User } from '../../store/types';

interface GoogleAuthComponentProps {
    authenticatedUser: User
}
interface GoogleAuthComponentState {
    isAuthenticated: boolean,
    authenticatedUser: object
}
export default class GoogleAuthComponent extends Component<GoogleAuthComponentProps, GoogleAuthComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAuthenticated: false,
            authenticatedUser: null
        }
        console.log('authenticatedUser', this.props.authenticatedUser);
    }
    componentDidMount() {
        if (this.props.authenticatedUser.userId !== '') {
            this.setState({ isAuthenticated: true });
        }
    }
    render() {
        return (
            <div>
                {!this.state.isAuthenticated ? (
                    <a href="http://localhost:3000/users/auth/google" className="button">
                        <button className="loginBtn loginBtn--google">
                            Login with Google
                                </button>
                    </a>
                ) : (
                        <div>
                            <IconButton color="inherit">
                                <AccountCircle />
                                {this.props.authenticatedUser ? (<span> Hello, {this.props.authenticatedUser.userDisplayName} </span>) : (null)}
                                <a href="http://localhost:3000/users/auth/google" className="button">
                                    <button className="loginBtn">
                                        Logout
                                </button>
                                </a>
                            </IconButton>
                        </div>
                    )}

            </div>
        )
    }
}
