import React, { Component } from 'react';

interface GoogleAuthComponentProps {

}
interface GoogleAuthComponentState {

}
export default class GoogleAuthComponent extends Component<GoogleAuthComponentProps, GoogleAuthComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <a href="http://localhost:3000/users/auth/google" className="button">
                    <button className="loginBtn loginBtn--google">
                        Login with Google
                    </button>
                </a>
            </div>
        )
    }   
}
