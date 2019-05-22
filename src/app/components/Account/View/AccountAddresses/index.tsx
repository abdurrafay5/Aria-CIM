import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddLocation from '@material-ui/icons/AddLocation';
import Table from 'app/components/Utils/Table';
import Locales from "./locales";
import styles from "./index.scss";

type IAccountAddressesRouteProps = RouteComponentProps<{}>;
interface IAccountAddressesProps extends IAccountAddressesRouteProps {
  accountNumber: number;
  accountInfo: any;
  paymentMethods: any;
}
import { IAddressesState } from "./IAddressesState";

class AccountAddresses extends React.Component<IAccountAddressesProps, IAddressesState> {
  constructor(props: IAccountAddressesProps, context?: any) {
    super(props, context);
    
    this.state = {
      addresses: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  render() {
    const loaded = this.props.accountInfo !== null && this.props.paymentMethods !== null;
    const { addresses, rowsPerPage, page } = this.state;
    let items = addresses;

    if (loaded) {
      const accountInfo = this.props.accountInfo;
      const newAddresses = [
        {
          address1: accountInfo.address1 ? accountInfo.address1 : "",
          address2: accountInfo.address2 ? accountInfo.address2 : "",
          address3: accountInfo.address3 ? accountInfo.address3 : "",
          postal_cd: accountInfo.postal_cd ? accountInfo.postal_cd : ""
        }
      ];

      if (this.props.paymentMethods && this.props.paymentMethods.bill_address1) {
        const payments = this.props.paymentMethods;
        newAddresses.push({
          address1: payments.bill_address1 ? payments.bill_address1 : "",
          address2: payments.bill_address2 ? payments.bill_address2 : "",
          address3: payments.bill_address3 ? payments.bill_address2 : "",
          postal_cd: payments.bill_postal_cd ? payments.bill_postal_cd : ""
        });
      }

      items = newAddresses;
    }

    return (
      <Table
        headerText={Locales.header}
        actionsRender={this._getActions}
        headerRender={this._getTableHeaders}
        tableRows={this._getTableRows}
        items={items}
        rowsPerPage={rowsPerPage}
        page={page}
        loading={!loaded}
        onSearchBoxExecute={this._onSearchBoxExecute}
        onChangePage={this._handleChangePage}
        onChangeRowsPerPage={this._handleChangeRowsPerPage}
      />
    );
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.address.line1}</TableCell>
        <TableCell>{Locales.address.line2}</TableCell>
        <TableCell>{Locales.address.line3}</TableCell>
        <TableCell>{Locales.address.postalCode}</TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    return (
      <TableRow hover>
        <TableCell>{row.address1}</TableCell>
        <TableCell>{row.address2}</TableCell>
        <TableCell>{row.address3}</TableCell>
        <TableCell>{row.postal_cd}</TableCell>
      </TableRow>
    );
  }

  private _getActions = () => {
    return (
      <Button className={styles.addressButton} variant="contained" color="primary">
        <AddLocation className={styles.addressIcon} />
        {Locales.addAddressButton}
      </Button>
    );
  }

  /**
   * Callback for when they user types a value into the search box and executes the search.
   * Will use the search box filter to refine down the accounts shown in the table.
   *
   * @param {string} SearchBoxValue
   */
  private _onSearchBoxExecute = (SearchBoxValue: string, property: string) => {
    // this.GetUsage(`${SearchBoxValue}`);
  }

  private _handleChangePage = (event, page) => {
    this.setState({ page });
  }

  private _handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }
}

export default withRouter(AccountAddresses);