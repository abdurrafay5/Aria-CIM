import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PaperContainer from "app/components/Utils/PaperContainer";
import Locales from "./locales";

import { IAccountDetailsProps } from "./IAccountDetailsProps";

export default class AccountDetails extends React.Component<IAccountDetailsProps> {

  render() {
    const loaded = this.props.accountInfo !== null;
    return (
      <PaperContainer heading={Locales.heading} loaded={loaded} onEdit={this._onEdit}>
        {
          loaded && (
            this._renderAccountDetails()
          )
        }
      </PaperContainer>
    );
  }

  private _renderAccountDetails = () => {
    const accountInfo = this.props.accountInfo;
    const masterPlanInfo = this._getMasterPlanInfo(accountInfo);
    const currency = accountInfo.acct_currency.toUpperCase();

    return (
      <div>
        <Typography variant="body1">{Locales.accountBalance}:</Typography>
        <Typography variant="body2" gutterBottom>{accountInfo.acct_balance} {currency}</Typography>
        <Typography variant="body1">{Locales.renewalDate}:</Typography>
        <Typography variant="body2" gutterBottom>{masterPlanInfo.renewalDate}</Typography>
        <Typography variant="body1">{Locales.monthlyRecurringRevenue}:</Typography>
        <Typography variant="body2" gutterBottom>150 {currency}</Typography>
        <Typography variant="body1">{Locales.lastInvoiced}:</Typography>
        <Typography variant="body2">{masterPlanInfo.lastInvoiced}</Typography>
      </div>
    );
  }

  private _getMasterPlanInfo = (accountInfo) => {
    const info = {
      renewalDate: "",
      lastInvoiced: ""
    };
    if (accountInfo.master_plans_info.length > 0) {
      const masterPlan = accountInfo.master_plans_info[0];
      info.renewalDate = masterPlan.next_bill_date;
      info.lastInvoiced = masterPlan.last_bill_thru_date;
    }
    return info;
  }

  private _onEdit = () => {
    console.log("Edit");
  }
}