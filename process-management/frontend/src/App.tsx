import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { Board, BoardItem, User } from './store/types';
import BoardListComponent from './components/BoardListComponent/BoardListComponent';
import BoardComponent from './components/BoardComponent/BoardComponent';
import AppHeader from './components/AppHeader/AppHeader';
import GoogleAuthComponent from './components/AuthComponent/GoogleAuthComponent';
import queryString from 'query-string';


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
   doSomething(data: string): Promise<any> {
    return JSON.parse(data)
  }


  componentWillMount() {
    console.log(location.search);
    const parsedUser = queryString.parse(location.search);
    console.log('parsedUser=========', typeof(parsedUser));
    console.log('parsedUser.user=========', typeof(parsedUser.user));

  //  let obj: authenticatedUser = JSON.parse(parsedUser.user);

    // console.log('parsedUser.user_ParseJSON=========', JSON.parse(parsedUser.user));
  //  console.log('parsedUser.user.userId', parsedUser.userId);
    // if (parsedUser) {
    // //  // const newUser = Object.assign({}, this.state.authenticatedUser, parsedUser.user);
    //  const newUser = {
    //   userId: parsedUser.user.userId as string,
    //   userDisplayName: parsedUser.user.userDisplayName,
    //   userEmail: parsedUser.user.userEmail,
    //   userActive: parsedUser.user.userActive,
    //  }

    //   this.setState({authenticatedUser: newUser});
      //console.log('newUser', newUser);
    // }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ currentBoard: store.getState().currentBoard })
    });
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <AppHeader authenticatedUser={this.state.authenticatedUser} />
          <Route path="/home" component={BoardListComponent} />
          <Route path="/boards/:boardId" component={BoardComponent} />
        </Provider>
      </Router>
    );
  }
}
