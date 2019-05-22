import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PaperContainer from "app/components/Utils/PaperContainer";
import Locales from "./locales";

import { IBillingPaymentTermsProps } from "./IBillingPaymentTermsProps";

export default class BillingPaymentTerms extends React.Component<IBillingPaymentTermsProps> {

  render() {
    const loaded = this.props.accountInfo !== null;
    return (
      <PaperContainer heading={Locales.heading} loaded={loaded} onEdit={this._onEdit}>
        {
          loaded && (
            this._renderBillingPaymentTerms()
          )
        }
      </PaperContainer>
    );
  }

  private _renderBillingPaymentTerms = () => {
    const accountInfo = this.props.accountInfo;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.paymentTerms}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">Due Upon Receipt</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.paymentMethod}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">Credit Card Visa ************5504</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.currency}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">{accountInfo.acct_currency.toUpperCase()}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.billCycleDay}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">7th of the month</Typography>
        </Grid>
      </Grid>
    );
  }

  private _onEdit = () => {
    console.log("Edit");
  }
}