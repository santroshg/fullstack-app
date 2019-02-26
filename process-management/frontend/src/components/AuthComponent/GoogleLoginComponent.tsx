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
            <div>
                <a href={`${backtendHost}/users/auth/google`} className="button">
                    <button className="loginBtn loginBtn--google">
                        Login with Google
                    </button>
                </a>
            </div>
        )
    }
}
