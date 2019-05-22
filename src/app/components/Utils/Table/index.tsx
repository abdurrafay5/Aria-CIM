import * as React from 'react';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../LoadingSpinner';
import SearchBox from '../SearchBox';
import styles from "./index.scss";
import Locales from "./locales";

import { ITableProps } from "./ITableProps";

export default class Table extends React.Component<ITableProps> {
  render() {
    const { headerText, items, rowsPerPage, page, headerRender, onSearchBoxExecute, onChangePage, onChangeRowsPerPage, actionsRender, searchBoxSelectionValues } = this.props;
    const itemsLength: number = items.length;
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, itemsLength - page * rowsPerPage);
    emptyRows = itemsLength > rowsPerPage ? emptyRows : 0;

    return (
      <div>
        <Typography variant="title" className={styles.header} gutterBottom>
          {
            headerText && (
              headerText
            )
          }
          <span style={{float: headerText ? "right" : "none"}}>
            <SearchBox onSearchBoxExecute={onSearchBoxExecute} selectionValues={searchBoxSelectionValues} />
          </span>
          {
            actionsRender && (
              actionsRender()
            )
          }
        </Typography>
        <Paper>
          <MaterialTable>
            <TableHead>
              {
                headerRender()
              }
            </TableHead>
            <TableBody>
              {
                this._getRows()
              }
              {
                (this.props.loading === false && emptyRows) > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )
              }
            </TableBody>
          </MaterialTable>
          {
            this.props.loading && (
              <LoadingSpinner />
            )
          }
          <TablePagination
            component="div"
            count={itemsLength}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            labelRowsPerPage={Locales.labelRowsPerPage}
          />
        </Paper>
      </div>
    );
  }

  private _getRows = () => {
    const { items, rowsPerPage, page, tableRows } = this.props;
    return items
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(invoice => {
        return tableRows(invoice);
      }
    )
  }
}