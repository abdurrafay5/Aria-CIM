import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {
  People,
  // Receipt,
  // Payment,
  // LibraryBooks,
  Search,
  ExpandMore,
  ExpandLess,
  Menu
} from '@material-ui/icons';
import NavLink from "./NavLink";
import Locales from "./locales";

import styles from "./index.scss"

export class LeftNav extends React.Component<{}, {
  customersOpen: boolean;
  productsOpen: boolean;
  billingOpen: boolean;
  paymentsOpen: boolean;
  open: boolean;
}> {

  constructor(props) {
    super(props);
    
    this.state = {
      customersOpen: true,
      productsOpen: false,
      billingOpen: false,
      paymentsOpen: false,
      open: true
    };
  }

  render() {
    const drawer = (
      <div>
        <div className={styles.logo}>
          <img src="https://brainnordic.com/wp-content/uploads/2018/09/stampen-media-2.png" alt="Logo"/>
          <IconButton className={styles.menuButton} onClick={this._handleDrawerToggle}>
            <Menu />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => { this.setState(state => ({ customersOpen: !state.customersOpen })); }}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary={Locales.customers} />
            {this.state.customersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.customersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={props => <NavLink href="/Accounts" text={Locales.search} {...props} />} button>
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
              </ListItem>
              {/* <ListItem component={props => <NavLink href="/Subscriptions" text="Subscriptions" {...props} />} button>
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
              </ListItem>
              <ListItem component={props => <NavLink href="/Amendments" text="Amendments" {...props} />} button>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
              </ListItem> */}
            </List>
          </Collapse>
          {/* <ListItem button onClick={() => { this.setState(state => ({ productsOpen: !state.productsOpen })); }}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText inset primary="Products" />
            {this.state.productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>
          <ListItem button onClick={() => { this.setState(state => ({ billingOpen: !state.billingOpen })); }}>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText inset primary="Billing" />
            {this.state.billingOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.billingOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>
          <ListItem button onClick={() => { this.setState(state => ({ paymentsOpen: !state.paymentsOpen })); }}>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText inset primary="Payments" />
            {this.state.paymentsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.paymentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse> */}
        </List>
      </div>
    );

    return (
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        classes={{
          paper: this.state.open ? styles.drawerPaper : `${styles.drawerPaper} ${styles.drawerPaperClose}`
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer>
    );
  }

  private _handleDrawerToggle = (): void => {
    this.setState({ open: !this.state.open });
  }
}