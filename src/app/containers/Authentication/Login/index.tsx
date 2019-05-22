import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter, RouteComponentProps } from 'react-router';

import AuthContainer from "../AuthContainer";

import styles from "./index.scss";
import { Service } from 'app/middleware';
import auth from '../../../utils/auth';

type ILoginProps = RouteComponentProps<{}>;

export class Login extends React.Component<ILoginProps, {
  value: any;
  errors: any;
  showLoginError: boolean;
}> {
  private _userName: any;
  private _password: any;

  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      value: {},
      errors: [],
      showLoginError: false
    };
  }

  render() {
    return (
      <AuthContainer>
        <div className={ styles.login }>
          <TextField
            id="email-input"
            // label="Email address or username"
            label="Client Number"
            margin="normal"
            inputRef={el => this._userName = el}
          />
          {/* <label className="validation-error">Please enter your Spotify username or email address.</label> */}
          <TextField
            id="password-input"
            // label="Password"
            label="Authentication Key"
            type="password"
            autoComplete="current-password"
            margin="normal"
            inputRef={el => this._password = el}
          />
          {
            this.state.showLoginError && (
              <span className={styles.errorText}>Error Authenticating, please ensure you have entered the correct details.</span>
            )
          }
          {/* <label className="validation-error">Please enter your password.</label> */}
          <Button variant="outlined" onClick={this._handleSubmit} className={styles.loginButton}>
            Login
          </Button>
          <div className={ styles.links }>
            <a href="#">Forgot your username or password?</a>
            <span>Don't have an account? <a href="#">Sign Up</a></span>
          </div>
        </div>
      </AuthContainer>
    );
  }

  private _handleSubmit = () => {
    const clientNo = this._userName.value;
    const authKey = this._password.value;

    Service.Authenticate(clientNo, authKey).then(response => {
      if (response.error_code === 0) {
        auth.setUserInfo(clientNo, true);
        auth.setToken(authKey, true);

        this._redirectUser();
      } else {
        this._showErrorMessage();
      }
    });
  }
  
  private _redirectUser = () => {  
    this.props.history.push('/');
  }

  private _showErrorMessage = () => {  
    this.setState({ showLoginError: true });
  }
}

export default withRouter(Login);