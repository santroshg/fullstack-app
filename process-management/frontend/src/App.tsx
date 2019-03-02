import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import store from './store';
import { Board, BoardItem, GoogleUser } from './store/types';
import BoardListComponent from './components/BoardListComponent/BoardListComponent';
import BoardComponent from './components/BoardComponent/BoardComponent';
import AppHeader from './components/AppHeader/AppHeader';
import GoogleLoginComponent from './components/AuthComponent/GoogleLoginComponent';

import { getLoggedinUserAction, setEditBoardAction } from './store/actions';
import { backtendHost } from './constants/constants';

interface AppProps {}

interface AppState {
  boardList?: BoardItem[],
  currentBoard?: Board,
  authenticatedUser: GoogleUser,
  isUserAuthenticated: Boolean,
}

export default class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      isUserAuthenticated: false,
      authenticatedUser: {
        userId: '',
        userDisplayName: '',
        userEmail: '',
        profileImgUrl: ''},
    }
  }

  async componentDidMount() {
    store.subscribe(() => {
      this.setState({ currentBoard: store.getState().currentBoard,
        authenticatedUser: store.getState().loggedinUser });
      if(this.state.authenticatedUser.userId) {
        this.setState({ isUserAuthenticated: true });
      }
    });

    store.dispatch(getLoggedinUserAction());
    const socket = socketIOClient(backtendHost);
        socket.on('updatedSuccess', (data: any) => {
              // Object.defineProperty(data, 'boardId',
              //     Object.getOwnPropertyDescriptor(data, '_id'));
              // delete data['_id'];
            store.dispatch(setEditBoardAction(data));
        });
  }

  render() {
    return (
      <div>
        <Router>
          <Provider store={store}>
            {this.state.isUserAuthenticated ? (
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
