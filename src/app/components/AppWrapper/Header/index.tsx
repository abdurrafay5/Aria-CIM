import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
import Notifications from '@material-ui/icons/Notifications';
// import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import auth from "../../../utils/auth";
import Locales from "./locales";
import styles from './index.scss';

type IHeaderProps = RouteComponentProps<{}>;

class Header extends React.Component<IHeaderProps, {
  open: boolean;
}> {
  private _anchorEl: any = null;

  constructor(props) {
    super(props);
    
    this.state = {
      open: false
    };
  }

  render() {
    // const login: string = `${Locales.client}: ${auth.getUserInfo()}`;

    return (
      <AppBar
        position="static"
        className={styles.appBar}
      >
        <Toolbar>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Typography variant="title" color="inherit" noWrap>
                {Locales.accounts}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={styles.actions}>
              <Button
                className={styles.loginInfo}
                buttonRef={node => {
                  this._anchorEl = node;
                }}
                // aria-owns={this.state.open ? 'menu-list-grow' : ""}
                aria-haspopup="true"
                variant="contained"
                onClick={this._userLogout}
              >
                <Typography variant="body1" color="inherit" noWrap>{Locales.logout}</Typography>
              </Button>
              {/* <Popper open={this.state.open} anchorEl={this._anchorEl} transition disablePortal style={{ zIndex: 1 }}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper >
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList style={{ width: 160 }}>
                          <MenuItem onClick={this._userLogout}>{Locales.logout}</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper> */}
              <IconButton className={styles.notificationButton}>
                <Badge badgeContent={4} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleClose = event => {
    if (this._anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  }

  private _userLogout = () => {
    auth.clearUserInfo();
    auth.clearToken();
    this.props.history.push('/login');
  }
}

export default withRouter(Header);