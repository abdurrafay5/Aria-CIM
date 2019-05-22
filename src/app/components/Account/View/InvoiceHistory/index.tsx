import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from 'app/components/Utils/Table';
import { Service } from "app/middleware";
import Locales from "./locales";

type IInvoiceHistoryRouteProps = RouteComponentProps<{}>;
interface IInvoiceHistoryProps extends IInvoiceHistoryRouteProps {
  accountNumber: number;
  accountInfo: any;
}
import { IInvoiceHistoryState } from "./IInvoiceHistoryState";

class InvoiceHistory extends React.Component<IInvoiceHistoryProps, IInvoiceHistoryState> {
  constructor(props: IInvoiceHistoryProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      invoiceHistory: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  render() {
    const { invoiceHistory, rowsPerPage, page, loading } = this.state;

    return (
      <Table
        headerText={Locales.header}
        headerRender={this._getTableHeaders}
        tableRows={this._getTableRows}
        items={invoiceHistory}
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
    const accountInfo = this.props.accountInfo;
    if (accountInfo && accountInfo.master_plans_info.length > 0) {
      this._getInvoiceHistory(accountInfo.master_plans_info[0].master_plan_instance_no);
    }
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.planName}</TableCell>
        <TableCell>{Locales.invoiceNumber}</TableCell>
        <TableCell>{Locales.amount}</TableCell>
        <TableCell>{Locales.billDate}</TableCell>
        <TableCell>{Locales.paidDate}</TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    return (
      <TableRow hover>
        <TableCell>{row.master_plan_name}</TableCell>
        <TableCell>{row.invoice_no}</TableCell>
        <TableCell>{row.amount}.00 {row.currency_cd.toUpperCase()}</TableCell>
        <TableCell>{row.bill_date}</TableCell>
        <TableCell>{row.paid_date}</TableCell>
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
    // this.GetInvoiceHistory(`${SearchBoxValue}`);
  }

  private _getInvoiceHistory = (masterPlanInstanceId) => {
    Service.GetInvoiceHistory(this.props.accountNumber, masterPlanInstanceId).then(invoiceHistory => {
      this.setState({
        loading: false,
        invoiceHistory: invoiceHistory ? invoiceHistory : []
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

export default withRouter(InvoiceHistory);