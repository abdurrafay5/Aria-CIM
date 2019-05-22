import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddLocation from '@material-ui/icons/AddLocation';
import Table from 'app/components/Utils/Table';
import { Service } from "app/middleware";
import Locales from "./locales";
import styles from "./index.scss";

type IDeliveryAddressesRouteProps = RouteComponentProps<{}>;
interface IDeliveryAddressesProps extends IDeliveryAddressesRouteProps {
  accountNumber: number;
}
import { IAddressesState } from "./IAddressesState";

class DeliveryAddresses extends React.Component<IDeliveryAddressesProps, IAddressesState> {
  constructor(props: IDeliveryAddressesProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      addresses: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  render() {
    const { addresses, rowsPerPage, page, loading } = this.state;

    return (
      <Table
        headerText={Locales.header}
        actionsRender={this._getActions}
        headerRender={this._getTableHeaders}
        tableRows={this._getTableRows}
        items={addresses}
        rowsPerPage={rowsPerPage}
        page={page}
        loading={loading}
        onSearchBoxExecute={this._onSearchBoxExecute}
        onChangePage={this._handleChangePage}
        onChangeRowsPerPage={this._handleChangeRowsPerPage}
      />
    );
  }

  public componentDidMount () {
    this._getDeliveryAddresses();
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.address.line1}</TableCell>
        <TableCell>{Locales.address.line2}</TableCell>
        <TableCell>{Locales.address.city}</TableCell>
        <TableCell>{Locales.address.postalCode}</TableCell>
        <TableCell>{Locales.address.countryCode}</TableCell>
        <TableCell>{Locales.fromDate}</TableCell>
        <TableCell>{Locales.toDate}</TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    const deliveryToDate: string = row.schedule.distDateTo === "0001-01-01" ? "-" : row.schedule.distDateTo;
    return (
      <TableRow hover>
        <TableCell>{row.address.distAddrLine1}</TableCell>
        <TableCell>{row.address.distAddrLine2}</TableCell>
        <TableCell>{row.address.distAddrCity}</TableCell>
        <TableCell>{row.address.distAddrPostalCode}</TableCell>
        <TableCell>{row.address.distAddrCountryCode}</TableCell>
        <TableCell>{row.schedule.distDateFrom}</TableCell>
        <TableCell>{deliveryToDate}</TableCell>
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

  private _getDeliveryAddresses = () => {
    Service.GetAllMasterPlans(this.props.accountNumber).then(plans => {
      Service.GetFullDeliveryAddressInformation(this.props.accountNumber, plans.acct_plans_m, [
        {
          "titleCode": "GPO"
        }
      ]).then(items => {
        this.setState({
          loading: false,
          addresses: items ? items : []
        });
      });
    });
  }

  private _handleChangePage = (event, page) => {
    this.setState({ page });
  }

  private _handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }
}

export default withRouter(DeliveryAddresses);