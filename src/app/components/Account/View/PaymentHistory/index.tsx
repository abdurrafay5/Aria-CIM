import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoneyOff from '@material-ui/icons/MoneyOff';
import Table from 'app/components/Utils/Table';
import { Service } from "app/middleware";
import Locales from "./locales";
import styles from "./index.scss";

type IPaymentHistoryRouteProps = RouteComponentProps<{}>;
interface IPaymentHistoryProps extends IPaymentHistoryRouteProps {
  accountNumber: number;
}
import { IPaymentHistoryState } from "./IPaymentHistoryState";

class PaymentHistory extends React.Component<IPaymentHistoryProps, IPaymentHistoryState> {
  constructor(props: IPaymentHistoryProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      paymentHistory: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  render() {
    const { paymentHistory, rowsPerPage, page, loading } = this.state;

    return (
      <div>
        <Table
          headerText={Locales.header}
          headerRender={this._getTableHeaders}
          tableRows={this._getTableRows}
          items={paymentHistory}
          rowsPerPage={rowsPerPage}
          page={page}
          loading={loading}
          onSearchBoxExecute={this._onSearchBoxExecute}
          onChangePage={this._handleChangePage}
          onChangeRowsPerPage={this._handleChangeRowsPerPage}
        />
      </div>
    );
  }

  public componentDidMount () {
    this.GetPaymentHistory();
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.transactionID}</TableCell>
        <TableCell>{Locales.date}</TableCell>
        <TableCell>{Locales.source}</TableCell>
        <TableCell>{Locales.status}</TableCell>
        <TableCell>{Locales.amount}</TableCell>
        <TableCell>{Locales.applied}</TableCell>
        <TableCell>{Locales.unapplied}</TableCell>
        <TableCell style={{ width: 58, padding: 2 }}></TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    return (
      <TableRow hover>
        <TableCell>{row.transaction_id}</TableCell>
        <TableCell>{row.payment_date}</TableCell>
        <TableCell></TableCell>
        <TableCell>{row.payment_status}</TableCell>
        <TableCell>{row.payment_amount}</TableCell>
        <TableCell>{row.payment_amount - row.payment_amount_left_to_apply}</TableCell>
        <TableCell>{row.payment_amount_left_to_apply}</TableCell>
        <TableCell style={{ width: 58, padding: 2 }}>
          <Tooltip title={Locales.voidPayment}>
            <IconButton  className={styles.voidPaymentIcon}>
              <MoneyOff />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  }

  /**
   * Callback for when they user types a value into the search box and executes the search.
   * Will use the search box filter to refine down the accounts shown in the table.
   *
   * @param {string} SearchBoxValue
   */
  private _onSearchBoxExecute = (SearchBoxValue: string, property: string) => {
    // this.GetPaymentHistory(`${SearchBoxValue}`);
  }

  private GetPaymentHistory = () => {
    Service.GetPaymentHistory(this.props.accountNumber).then(paymentHistory => {
      this.setState({
        loading: false,
        paymentHistory: paymentHistory ? paymentHistory : []
      });
    });
  }

  private _handleChangePage = (event, page) => {
    this.setState({ page });
  };

  private _handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
}

export default withRouter(PaymentHistory);