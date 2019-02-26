import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import store from './store';
import { Board, BoardItem, User } from './store/types';
import BoardListComponent from './components/BoardListComponent/BoardListComponent';
import BoardComponent from './components/BoardComponent/BoardComponent';
import AppHeader from './components/AppHeader/AppHeader';
import GoogleLoginComponent from './components/AuthComponent/GoogleLoginComponent';
import { backtendHost } from './constants/constants';

import { getLoggedinUserAction } from './store/actions';

interface AppProps {
}
interface AppState {
  boardList?: BoardItem[],
  currentBoard?: Board,
  authenticatedUser?: User,
  isUserAuthenticated: Boolean,
}

export default class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      isUserAuthenticated: false,
    }
  }

  async componentDidMount() {
    store.subscribe(() => {
      this.setState({ currentBoard: store.getState().currentBoard })
    });

    store.dispatch(getLoggedinUserAction());
    await axios.get(`${backtendHost}/users/api/current_user`, {withCredentials: true})
      .then((res) => {
        if(res.data) { // here is the user data
          this.setState({
            isUserAuthenticated: true,
            authenticatedUser: { 
              userId: res.data.googleId,
              userDisplayName: res.data.userDisplayName,
              userEmail: res.data.userEmail,
              userActive: res.data.userActive,
            }
          });

        }
      });
  }

  render() {
    console.log('00000000--------------', this.state.authenticatedUser);
    return (
      <div>
      <Router>
        <Provider store={store}>
          {this.state.authenticatedUser ? (
            <div>
              <AppHeader authenticatedUser={this.state.authenticatedUser} />
              <Route path="/home" component={BoardListComponent} />
              <Route path="/boards/:boardId" component={BoardComponent} />
            </div>
          ) : (
            <GoogleLoginComponent />
          )
          
          }
          
          
        </Provider>
      </Router>
      </div>
    );
  }
}
