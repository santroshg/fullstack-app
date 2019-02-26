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
                    <div className="badge">
                        <h1 className="foldingChar">
                            <span className="char1">P</span>
                            <span className="char2">r</span>
                            <span className="char3">o</span>
                            <span className="char4">c</span>
                            <span className="char5">e</span>
                            <span className="char6">s</span>
                            <span className="char7">s</span>
                            <span className="char8">&nbsp;</span>
                            <span className="char9">M</span>
                            <span className="char10">a</span>
                            <span className="char11">n</span>
                            <span className="char12">a</span>
                            <span className="char13">g</span>
                            <span className="char14">e</span>
                            <span className="char15">m</span>
                            <span className="char16">e</span>
                            <span className="char17">n</span>
                            <span className="char18">t</span>
                            <span className="char19">&nbsp;</span>
                            <span className="char20">-</span>
                            <span className="char21">&nbsp;</span>
                            <span className="char22">S</span>
                            <span className="char23">a</span>
                            <span className="char24">p</span>
                            <span className="char25">i</span>
                            <span className="char26">e</span>
                            <span className="char27">n</span>
                            <span className="char28">t</span>
                            <span className="char29">/</span>
                            <span className="char30">S</span>
                            <span className="char31">t</span>
                            <span className="char32">a</span>
                            <span className="char33">c</span>
                            <span className="char34">k</span>
                            <span className="char35">r</span>
                            <span className="char36">o</span>
                            <span className="char37">u</span>
                            <span className="char38">t</span>
                            <span className="char39">e</span>
                            {/* Process Management - Sapient/Stackroute */}
                        </h1>
                    </div>
                </div>

                <a href={`${backtendHost}/users/auth/google`} className="button">
                    <button className="loginBtn loginBtn--google">
                        Login with Google
                    </button>
                </a>
            </div>
        )
    }
}
