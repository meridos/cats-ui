import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';
import { MainPage } from './pages/main/main';
import { SearchPage } from './pages/search/search';
import style from './App.module.css';

function App() {
  return (
    <div className={style.App}>
      <Router history={history}>
        <Switch>
          <Route path="/test">test</Route>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/search/:query">
            <SearchPage></SearchPage>
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;