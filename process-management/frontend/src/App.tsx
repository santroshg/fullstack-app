import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import store from './store';
import { Board, BoardItem, User } from './store/types';
import BoardListComponent from './components/BoardListComponent/BoardListComponent';
import BoardComponent from './components/BoardComponent/BoardComponent';
import AppHeader from './components/AppHeader/AppHeader';
import GoogleAuthComponent from './components/AuthComponent/GoogleAuthComponent';
import queryString from 'query-string';


import { getBoardsListAction, getLoggedinUserAction } from './store/actions';


interface authenticatedUser {
  _id: string,
  userId: string,
  userDisplayName: string,
  userEmail: string,
  userActive: boolean,
}
interface AppProps {

}
interface AppState {
  boardList?: BoardItem[],
  currentBoard?: Board,
  authenticatedUser?: User,
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      //currentBoard: ''
      authenticatedUser: {
        userId: '',
        userDisplayName: '',
        userEmail: '',
        userActive: null,
      }
    }
  }


  componentDidMount() {
    store.subscribe(() => {
      this.setState({ currentBoard: store.getState().currentBoard })
    });

    store.dispatch(getLoggedinUserAction());
    

    // axios.get('http://localhost:3000/users/api/current_user', {withCredentials: true})
    //   .then((res) => {
    //     console.log('res---------------usrt-----', res);
    //   });

    
  }

  render() {
    return (
      <div>
      <Router>
        <Provider store={store}>
          <AppHeader authenticatedUser={this.state.authenticatedUser} />
          <Route path="/home" component={BoardListComponent} />
          <Route path="/boards/:boardId" component={BoardComponent} />
        </Provider>
      </Router>
      </div>
    );
  }
}
