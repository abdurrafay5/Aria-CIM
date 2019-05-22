import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from "./theme";

import { Login } from 'app/containers/Authentication/Login';
import AccountSearchPage from 'app/containers/Accounts/Search';
import AccountViewPage from 'app/containers/Accounts/View';
import ProductCatalog from 'app/containers/ProductCatalog';

import PrivateRoute from './containers/PrivateRoute';

import "./index.scss"

export const App = hot(module)(() => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/" render={ ()=> { return <Redirect to={{ pathname: '/Accounts', state: { from: "/" } }} /> } } exact />
        <PrivateRoute path="/Accounts" component={AccountSearchPage} exact />
        <PrivateRoute path="/Accounts/:id" component={AccountViewPage} exact />
        <PrivateRoute path="/ProductCatalog" component={ProductCatalog} exact />
        {/* <Route path="/Accounts" component={Accounts} /> */}
        {/* <Route path="/" component={Accounts} /> */}
      </Switch>
    </CssBaseline>
  </MuiThemeProvider>
));
