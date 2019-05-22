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
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LoadingSpinner from 'app/components/Utils/LoadingSpinner';
import SearchBox from 'app/components/Utils/SearchBox';
import { Service } from "app/middleware";
import Locales from "./locales";
import styles from "./index.scss";

type IPlansRouteProps = RouteComponentProps<{}>;
interface IPlansProps extends IPlansRouteProps {
  accountNumber: number;
}
import { IPlansState } from "./IPlansState";

class Plans extends React.Component<IPlansProps, IPlansState> {
  constructor(props: IPlansProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      plans: []
    };
  }

  render() {
    return (
      <div>
        <Typography variant="title" className={styles.header} gutterBottom>
          <SearchBox onSearchBoxExecute={this._onSearchBoxExecute} />
          <Button className={styles.addPlanButton} variant="contained" color="primary">
            <LibraryBooks className={styles.addPlanIcon} />
            {Locales.addSubscriptionButton}
          </Button>
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{Locales.instanceID}</TableCell>
                <TableCell>{Locales.name}</TableCell>
                <TableCell>{Locales.clientDefinedIdentifier}</TableCell>
                <TableCell>{Locales.units}</TableCell>
                <TableCell>{Locales.status}</TableCell>
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
    this._getPlans();
  }

  private _getRows = () => {
    return this.state.plans.map(plan => {
      const instanceId: number = plan.client_plan_instance_id;
      return (
        <TableRow hover data-id={instanceId} key={instanceId} onClick={this._getPlanUsage}>
          <TableCell>{instanceId}</TableCell>
          <TableCell>{plan.plan_name}</TableCell>
          <TableCell>{plan.plan_instance_no}</TableCell>
          <TableCell>{plan.plan_units}</TableCell>
          <TableCell>{plan.plan_instance_status_label}</TableCell>
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

  private _getPlans = () => {
    Service.GetAccountPlans(this.props.accountNumber).then(plans => {
      this.setState({
        loading: false,
        plans: plans ? plans : []
      });
    });
  }

  private _getPlanUsage = (element: any): void => {
    const instanceId: number = element.currentTarget.dataset.id;
    Service.GetUsageHistory(this.props.accountNumber, instanceId, "1900-01-01", "2100-01-01").then(usageHistory => {
      console.log(usageHistory);
    });
  }
}

export default withRouter(Plans);