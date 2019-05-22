import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddComment from '@material-ui/icons/AddComment';
import Table from 'app/components/Utils/Table';
import { Service } from "app/middleware";
import Locales from "./locales";
import styles from "./index.scss";

type ICommentsRouteProps = RouteComponentProps<{}>;
interface ICommentsProps extends ICommentsRouteProps {
  accountNumber: number;
}
import { ICommentsState } from "./ICommentsState";

class Comments extends React.Component<ICommentsProps, ICommentsState> {
  constructor(props: ICommentsProps, context?: any) {
    super(props, context);
    
    this.state = {
      loading: true,
      comments: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  render() {
    const { comments, rowsPerPage, page, loading } = this.state;

    return (
      <Table
        headerText={Locales.header}
        actionsRender={this._getActions}
        headerRender={this._getTableHeaders}
        tableRows={this._getTableRows}
        items={comments}
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
    this._getComments();
  }

  private _getTableHeaders = () => {
    return (
      <TableRow>
        <TableCell>{Locales.dateEntered}</TableCell>
        <TableCell>{Locales.commentText}</TableCell>
        <TableCell>{Locales.enteredBy}</TableCell>
      </TableRow>
    );
  }

  private _getTableRows = row => {
    return (
      <TableRow hover>
        <TableCell>{row.comment_date_time}</TableCell>
        <TableCell>{row.comment}</TableCell>
        <TableCell>{row.comment_author}</TableCell>
      </TableRow>
    );
  }

  private _getActions = () => {
    return (
      <Button className={styles.commentButton} variant="contained" color="primary">
        <AddComment className={styles.commentIcon} />
        {Locales.addCommentButton}
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

  private _getComments = () => {
    const date: string = this._getTodaysDate();
    Service.GetAccountComments(this.props.accountNumber, "1900-01-01", date).then(comments => {
      this.setState({
        loading: false,
        comments: comments ? comments : []
      });
    });
  }

  private _handleChangePage = (event, page) => {
    this.setState({ page });
  }

  private _handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  private _getTodaysDate () {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

export default withRouter(Comments);