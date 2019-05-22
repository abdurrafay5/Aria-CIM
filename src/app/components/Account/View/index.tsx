import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Service } from "app/middleware";
import SwipeableViews from 'react-swipeable-views';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Locals from "./locales";
import styles from "./index.scss";

import NewSubscriptionDialog from "./NewSubscriptionDialog";
import AccountDetails from "./AccountDetails";
import BillingPaymentTerms from "./BillingPaymentTerms";
import BasicInformation from "./BasicInformation";
import PaymentMethods from "./PaymentMethods";
import KeyContacts from "./KeyContacts";
import PaymentHistory from "./PaymentHistory";
import InvoiceHistory from "./InvoiceHistory";
import Plans from "./Plans";
import Comments from "./Comments";
import AccountAddresses from "./AccountAddresses";
import DeliveryAddresses from "./DeliveryAddresses";

type IViewProps = RouteComponentProps<{
  id: number;
}>;
import { IViewState } from "./IViewState";

class AccountView extends React.Component<IViewProps, IViewState> {
  private accountNumber: number = this.props.match.params.id;

  constructor(props: IViewProps, context?: any) {
    super(props, context);
    
    this.state = {
      account: null,
      paymentMethods: null,
      loading: true,
      showNewSubscriptionDialog: false,
      currentStep: 0
    };
  }

  render() {
    const { account, paymentMethods } = this.state;

    const heading = account ? (
      <div>
        <Typography variant="display1" className={styles.headingText}>{`${account.first_name} ${account.last_name} : ${account.acct_no}`}</Typography>
        <Typography variant="display2" className={styles.headingSubText}>{Locals.status}: <span style={{color: "green"}}>Active</span></Typography>
      </div>
    ) : "";

    return (
      <div>
        <AppBar position="static" color="default" className={styles.tabs}>
          <Tabs
            value={this.state.currentStep}
            onChange={this._handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={Locals.overviewTab} href="" />
            <Tab label={Locals.subscriptionsTab} href="" />
            <Tab label={Locals.paymentHistoryTab} href="" />
            <Tab label={Locals.commentsTab} href="" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis='x'
          index={this.state.currentStep}
          onChangeIndex={this._handleChangeIndex}
          className={styles.swipeableView}
          marginWidth={20}
        >
          <Grid container spacing={24}>
            <Grid item container spacing={24}>
              <Grid item xs={12} sm={6}>
                {heading}
              </Grid>
              <Grid item xs={12} sm={6} className={styles.accountActions}>
                <Button variant="outlined" color="primary" onClick={this._showNewSubscriptionDialog}>
                  {Locals.createSubscriptionButton}
                </Button>
                <Button variant="outlined" color="primary">
                  {Locals.processPaymentButton}
                </Button>
                <Button variant="outlined" color="primary">
                  {Locals.moreButton}
                  <KeyboardArrowDown className={styles.moreIcon} />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9}>
              <BasicInformation accountInfo={account} accountNumber={this.accountNumber} editCallback={this._getAccountInfo} />
              <BillingPaymentTerms accountInfo={account} />
              <PaymentMethods paymentMethods={paymentMethods} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <AccountDetails accountInfo={account} />
              <KeyContacts accountInfo={account} paymentMethods={paymentMethods} />
            </Grid>
          </Grid>
          <div>
            <Plans accountNumber={this.accountNumber} />
          </div>
          <div className={styles.paymentHistory}>
            {
              account && (
                <InvoiceHistory accountInfo={account} accountNumber={this.accountNumber} />
              )
            }
            <PaymentHistory accountNumber={this.accountNumber} />
          </div>
          <div className={styles.accountDetail}>
            <AccountAddresses accountInfo={account} paymentMethods={paymentMethods} accountNumber={this.accountNumber} />
            <DeliveryAddresses accountNumber={this.accountNumber} />
            <Comments accountNumber={this.accountNumber} />
          </div>
        </SwipeableViews>
        {
          this.state.showNewSubscriptionDialog && (
            <NewSubscriptionDialog closeDialog={this._closeNewSubscriptionDialog} />
          )
        }
      </div>
    );
  }

  public componentDidMount () {
    this._getAccountInfo();
    this._getAccountPaymentInfo();
  }

  private _getAccountPaymentInfo = () => {
    return new Promise((resolve, reject) => {
      if (this.accountNumber) {
        Service.GetAccountPaymentMethods(this.accountNumber).then(paymentMethods => {
          this.setState({
            paymentMethods: paymentMethods ? paymentMethods : []
          });
          resolve();
        });
      }
    });
  }

  private _getAccountInfo = () => {
    return new Promise((resolve, reject) => {
      if (this.accountNumber) {
        Service.GetAccount(this.accountNumber).then(account => {
          this.setState({
            account
          });
          resolve();
        });
      }
    });
  }

  private _handleChange = (event, currentStep) => {
    this.setState({ currentStep });
  };

  private _handleChangeIndex = index => {
    this.setState({ currentStep: index });
  };

  private _showNewSubscriptionDialog = () => {
    this.setState({ showNewSubscriptionDialog: true });
  }

  private _closeNewSubscriptionDialog = () => {
    this.setState({ showNewSubscriptionDialog: false });
  }
}

export default withRouter(AccountView);