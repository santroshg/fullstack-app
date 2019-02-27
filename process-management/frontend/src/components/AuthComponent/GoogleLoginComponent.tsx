import React, { Component } from 'react';
import { backtendHost } from '../../constants/constants';

interface GoogleLoginComponentProps {}

export default class GoogleLoginComponent extends Component<GoogleLoginComponentProps> {
    constructor(props: GoogleLoginComponentProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="login-page">
                <div id="page-wrap">
                    <div className="google-login-button">
                        <a href={`${backtendHost}/users/auth/google`} className="button">
                            <button className="loginBtn loginBtn--google">
                                Login with Google
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
