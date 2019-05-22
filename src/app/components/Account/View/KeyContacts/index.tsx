import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PaperContainer from "app/components/Utils/PaperContainer";
import componentStyles from "./index.scss";
import Locales from "./locales";

import { IKeyContactsProps } from "./IKeyContactsProps";

export default class KeyContacts extends React.Component<IKeyContactsProps> {

  render() {
    const loaded = this.props.accountInfo !== null && this.props.paymentMethods !== null;
    return (
      <PaperContainer heading={Locales.header} loaded={loaded} onEdit={this._onEdit}>
        {
          loaded && (
            this._renderKeyContacts()
          )
        }
      </PaperContainer>
    );
  }

  private _renderKeyContacts = () => {
    const { accountInfo, paymentMethods } = this.props;

    return (
      <div>
        {
          this._getAccountContact(accountInfo)
        }
        {
          this._getBillContact(paymentMethods)
        }
      </div>
    );
  }

  private _getAccountContact = (accountInfo: any) => {
    return (
      <div className={componentStyles.contact}>
        <Typography variant="body1" gutterBottom>
          {Locales.accountContact}
        </Typography>
        <Typography variant="body2">
          {`${accountInfo.first_name} ${accountInfo.last_name}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <a href={`mailto:${accountInfo.email}`}>{accountInfo.email}</a>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span>{accountInfo.address1}</span>
          <span>{accountInfo.address2}</span>
          <span>{accountInfo.address3}</span>
          <span>{accountInfo.postal_cd}</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {
            accountInfo.phone && (
              <span>Tel: {accountInfo.phone}</span>
            )
          }
          {
            accountInfo.fax && (
              <span>Fax: {accountInfo.fax}</span>
            )
          }
        </Typography>
      </div>
    );
  }

  private _getBillContact = (paymentMethods: any) => {
    let markup: any = "";
    if (paymentMethods.length > 0) {
      const contact = paymentMethods[0];
      markup = (
        <div className={componentStyles.contact}>
          <Typography variant="body1" gutterBottom>
            {Locales.billContact}
          </Typography>
          <Typography variant="body2">
            {`${contact.bill_first_name} ${contact.bill_last_name}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <a href={`mailto:${contact.bill_email}`}>{contact.bill_email}</a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span>{contact.bill_address1}</span>
            <span>{contact.bill_address2}</span>
            <span>{contact.bill_address3}</span>
            <span>{contact.bill_postal_cd}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {
              contact.bill_phone && (
                <span>Tel: {contact.bill_phone}</span>
              )
            }
            {
              contact.bill_fax && (
                <span>Fax: {contact.bill_fax}</span>
              )
            }
          </Typography>
        </div>
      );
    }
    return markup;
  }
  
  private _onEdit = () => {
    console.log("Edit");
  }
}