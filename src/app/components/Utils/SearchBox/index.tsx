import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './index.scss';
import { ISearchBoxProps } from "./ISearchBoxProps";
import { ISearchBoxState } from "./ISearchBoxState";
import Locales from "./locales";

export default class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  constructor(props: ISearchBoxProps, context?: any) {
    super(props, context);
    
    this.state = {
      searchBoxValue: "",
      selectedProperty: this.props.selectionValues ? this.props.selectionValues[0].value : ""
    };
  }

  render() {
    return (
      <Paper className={styles.searchBox}>
        {
          this._getSelectionInput()
        }
        <TextField
          id="search-textbox"
          placeholder={Locales.searchText}
          onChange={this._onSearchBoxChange}
          onKeyPress={this._onSearchBoxKeyPress}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className={styles.searchBoxIcon} onClick={this._executeSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    );
  }

  /**
   * Returns the selection input control if required
   *
   * @returns Select input for the property to refine on
   */
  private _getSelectionInput = () => {
    return this.props.selectionValues ? (
      <Select
        className={styles.propertySelect}
        value={this.state.selectedProperty}
        onChange={event => { this.setState({ selectedProperty: event.target.value }); }}
        disableUnderline={true}
        IconComponent={() => ( null )}
        inputProps={{
          name: 'searchproperty'
        }}
      >
        {
          this.props.selectionValues.map(selection => {
            return (
              <MenuItem key={selection.value} value={selection.value}>{selection.name}</MenuItem>
            );
          })
        }
      </Select>
     ) : "";
  }

  /**
   * 
   *
   * @private
   * @memberof SearchBox
   */
  private _onSearchBoxKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this._executeSearch();
      event.preventDefault();
    }
  }
  
  /**
   * Callback for when they user types into the search box.
   * Will use the search box filter to refine down the accounts shown in the table.
   * 
   * @private
   * @memberof SearchBox
   */
  private _onSearchBoxChange = (value: any) => {
    this.setState({
      searchBoxValue: value.target.value
    });
  }

  /**
   *
   *
   * @private
   * @memberof SearchBox
   */
  private _executeSearch = () => {
    const value = this.state.searchBoxValue;
    if (value) {
      this.props.onSearchBoxExecute(value, this.state.selectedProperty);
    }
  }
}