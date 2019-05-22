import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Table from 'app/components/Utils/Table';
import { Service } from "app/middleware";
import { CreateAccountDialog } from "../Account/Create";
import Locales from "./locales";
import styles from "./index.scss";

type IAccountSearchProps = RouteComponentProps<{}>;
import { IAccountSearchState } from "./IAccountSearchState";

class AccountSearch extends React.Component<IAccountSearchProps, IAccountSearchState> {
  constructor(props: IAccountSearchProps, context?: any) {
    super(props, context);
    
    this.state = {
      accounts: [],
      loading: true,
      showAddAccountDialog: false,
      page: 0,
      rowsPerPage: 10
    };
  }

  // invoices

  // payments

  render() {
    const { accounts, rowsPerPage, page, loading } = this.state;
    const selectionValues = [
      { name: Locales.accountNumber, value: "acct_no" },
      { name: Locales.userID, value: "user_id" },
      { name: Locales.statusCode, value: "status_cd" },
      { name: Locales.planNumber, value: "plan_no" },
      { name: Locales.firstName, value: "first_name" },
      { name: Locales.lastName, value: "last_name" },
      { name: Locales.city, value: "city" },
      { name: Locales.postalCode, value: "postal_code" },
      { name: Locales.country, value: "country" },
      { name: Locales.alternateEmailAddress, value: "alt_email" },
      { name: Locales.clientID, value: "client_acct_id" },
      { name: Locales.payMethod, value: "pay_method" },
      { name: Locales.created, value: "created" },
      { name: Locales.lastUpdated, value: "last_updated" },
      { name: Locales.companyName, value: "company_name" }
    ];

    return (
      <div>
        <Table
          actionsRender={this._getActions}
          headerRender={this._getTableHeaders}
          tableRows={this._getTableRows}
          items={accounts}
          rowsPerPage={rowsPerPage}
          page={page}
          loading={loading}
          searchBoxSelectionValues={selectionValues}
          onSearchBoxExecute={this._onSearchBoxExecute}
          onChangePage={this._handleChangePage}
          onChangeRowsPerPage={this._handleChangeRowsPerPage}
        />
        {
          this.state.showAddAccountDialog && (
            <CreateAccountDialog closeDialog={this._closeCreateAccountDialog} />
          )
        }
      </div>
    );
  }

  public componentDidMount () {
    this.getAccounts();
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.accountNumber}</TableCell>
        <TableCell>{Locales.accountOwner}</TableCell>
        <TableCell>{Locales.accountEmail}</TableCell>
        <TableCell>{Locales.accountStatus}</TableCell>
        <TableCell>{Locales.masterPlan}</TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    const accountOwner = row.first_name ? `${row.first_name} ${row.last_name}` : "";
    return (
      <TableRow className={styles.accountRow} data-id={row.acct_no} key={row.user_id} hover onClick={this._accountClicked}>
        <TableCell>{row.acct_no}</TableCell>
        <TableCell>{accountOwner}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{Service.GetAccountStatusFromCode(row.status_cd)}</TableCell>
        <TableCell>{this.getMasterPlansText(row.master_plan_instances)}</TableCell>
      </TableRow>
    );
  }

  private _getActions = () => {
    return (
      <Button className={styles.addAccountButton} onClick={this._openCreateAccountDialog} variant="contained" color="primary">
        <PersonAdd className={styles.addAccountIcon} />
        {Locales.addAccount}
      </Button>
    );
  }

  private getMasterPlansText = (plans: any[]): string => {
    let masterPlans: string = "";
    const masterPlanLength = plans.length;
    if (masterPlanLength > 0) {
      for (let i = 0; i < masterPlanLength; i++) {
        if (i !== 0) {
          masterPlans += "; ";
        }
        masterPlans += plans[i].client_master_plan_id;
      }
    }
    return masterPlans;
  }

  private _openCreateAccountDialog = (): void => {
    this.setState({
      showAddAccountDialog: true
    });
  }

  private _closeCreateAccountDialog = (): void => {
    this.setState({
      showAddAccountDialog: false
    });
  }

  private _accountClicked = (element: any): void => {
    const customerId: number = element.currentTarget.dataset.id;
    this.props.history.push(`/Accounts/${customerId}`);
  }

  /**
   * Callback for when they user types a value into the search box and executes the search.
   * Will use the search box filter to refine down the accounts shown in the table.
   *
   * @param {string} SearchBoxValue
   */
  private _onSearchBoxExecute = (SearchBoxValue: string, property: string) => {
    this.setState({
      loading: true,
      accounts: []
    });
    this.getAccounts(`${property} = ${SearchBoxValue}`);
  }

  private getAccounts = (search?: string) => {
    Service.GetAccounts(search).then(accounts => {
      this.setState({
        loading: false,
        accounts: accounts
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

export default withRouter(AccountSearch);