import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import store from './store';
import { Board, BoardItem } from './store/types';
import BoardListComponent from './components/BoardListComponent';
import BoardComponent from './components/BoardComponent';

interface AppProps {}
interface AppState {
  boardList?: BoardItem[],
  currentBoard?: Board,
}

export default class App extends Component<AppState, AppProps> {
  constructor(props: AppState) {
    super(props);
  }

  state = {
    //currentBoard: ''
  }

 componentDidMount() {
   store.subscribe(() => {
     this.setState({currentBoard: store.getState().currentBoard})
   });
 }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <Route path="/boards" component={BoardListComponent} />
          <Route path="/boards/:boardId" component={BoardComponent} />
          <div className="App">
            Welcome....
        
          </div>

        </Provider>
      </Router>
    );
  }
}
