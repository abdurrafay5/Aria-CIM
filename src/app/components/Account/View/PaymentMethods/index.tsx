import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PaperContainer from "app/components/Utils/PaperContainer";

import { IPaymentMethodsProps } from "./IPaymentMethodsProps";
import { Service } from 'app/middleware';
import Locales from "./locales";
import styles from "./index.scss";

export default class PaymentMethods extends React.Component<IPaymentMethodsProps> {
  render() {
    const loaded = this.props.paymentMethods !== null;
    return (
      <PaperContainer heading={Locales.header} loaded={loaded} onEdit={this._onEdit}>
        {
          loaded && (
            this._renderPaymentMethods()
          )
        }
      </PaperContainer>
    );
  }

  private _renderPaymentMethods = () => {
    const paymentMethods = this.props.paymentMethods;
    return (
      paymentMethods.map(method => {
        let value: any = "";
        if (method.status === 1) {
          value = (
            <Grid container spacing={8} className={styles.paymentMethod}>
              <Grid item xs={4}>
                <Typography variant="body2">{method.pay_method_name}</Typography>
                <Typography variant="body1">{Service.GetAccountPaymentMethodFromCode(method.pay_method_type)}</Typography>
              </Grid>
              <Grid container xs={8} spacing={8}>
                <Grid item xs={6}>
                  <Typography variant="body1">{Locales.creditCardType}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <img height="22px" src={this._getCardIcon(method.cc_type)} />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{Locales.creditCardNumber}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{method.suffix ? `************${method.suffix}` : ""}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{Locales.expirationDate}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{method.cc_expire_mm ? `${method.cc_expire_mm}/${method.cc_expire_yyyy}` : ""}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{Locales.cardHolderName}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{method.bill_first_name ? `${method.bill_first_name} ${method.bill_last_name}` : ""}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{Locales.status}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{method.status === 1 ? Locales.active : Locales.expired}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        return value;
      })
    );
  }

  private _getCardIcon = type => {
    const icons = {
      "Visa": "/assets/img/cards/visa.svg",
      "MasterCard": "/assets/img/cards/mastercard.png"
    };
    return icons[type] ? icons[type] : "";
  }

  private _onEdit = () => {
    console.log("Edit");
  }
}