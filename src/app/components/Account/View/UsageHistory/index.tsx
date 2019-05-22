import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LoadingSpinner from 'app/components/Utils/LoadingSpinner';
import SearchBox from 'app/components/Utils/SearchBox';
import styles from "./index.scss";

type IUsageHistoryRouteProps = RouteComponentProps<{}>;
interface IUsageHistoryProps extends IUsageHistoryRouteProps {
  accountNumber: number;
}
import { IUsageHistoryState } from "./IUsageHistoryState";

class UsageHistory extends React.Component<IUsageHistoryProps, IUsageHistoryState> {
  constructor(props: IUsageHistoryProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      usageHistory: []
    };
  }

  render() {
    return (
      <div>
        <Typography variant="title" className={styles.header} gutterBottom>
          <SearchBox onSearchBoxExecute={this._onSearchBoxExecute} />
          <Button className={styles.exportButton} variant="contained" color="primary">
            <PersonAdd className={styles.exportIcon} />
            Export to Spreadsheet
          </Button>
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              this._getRows()
            }
            </TableBody>
          </Table>
          {
            this.state.loading && (
              <LoadingSpinner />
            )
          }
        </Paper>
      </div>
    );
  }

  public componentDidMount () {
    this._getUsageHistory();
  }

  private _getRows = () => {
    return this.state.usageHistory.map(transaction => {
      return (
        <TableRow hover>
          <TableCell></TableCell>
        </TableRow>
      );
    })
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

  private _getUsageHistory = () => {
    // Service.GetUsageHistory(this.props.accountNumber).then(usageHistory => {
    //   this.setState({
    //     loading: false,
    //     usageHistory: usageHistory ? usageHistory : []
    //   });
    // });
  }
}

export default withRouter(UsageHistory);