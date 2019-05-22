import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PaperContainer from "app/components/Utils/PaperContainer";
import Locales from "./locales";
import BasicInformationDialog from "../../Update/BasicInformationDialog"

import { IBasicInformationProps } from "./IBasicInformationProps";
import { IBasicInformationState } from "./IBasicInformationState";

export default class BasicInformation extends React.Component<IBasicInformationProps, IBasicInformationState> {

  constructor(props: IBasicInformationProps, context?) {
    super(props, context);

    this.state = {
      showEditDialog: false
    };
  }

  render() {
    const loaded = this.props.accountInfo !== null;
    return (
      <PaperContainer heading={Locales.heading} loaded={loaded} onEdit={this._onEdit}>
        {
          loaded && (
            this._renderBasicInformation()
          )
        }
        {
          this.state.showEditDialog && (
            <BasicInformationDialog closeDialog={this._onEditClose} accountInfo={this.props.accountInfo} accountNumber={this.props.accountNumber} />
          )
        }
      </PaperContainer>
    );
  }

  private _renderBasicInformation = () => {
    const accountInfo = this.props.accountInfo;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.customerName}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          {
            accountInfo.first_name && (
              <Typography variant="body2">{`${accountInfo.first_name} ${accountInfo.last_name}`}</Typography>
            )
          }
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.accountNumber}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">{accountInfo.acct_no}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.billTo}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2">James Smith</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">{Locales.soldTo}:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          {
            accountInfo.first_name && (
              <Typography variant="body2">{`${accountInfo.first_name} ${accountInfo.last_name}`}</Typography>
            )
          }
        </Grid>
      </Grid>
    );
  }

  private _onEdit = () => {
    this.setState({
      showEditDialog: true
    });
  }

  private _hideDialog = () => {
    this.setState({
      showEditDialog: false
    });
  }

  private _onEditClose = (refreshData?: boolean) => {
    if (refreshData === true) {
      this.props.editCallback().then(() => {
        this._hideDialog();
      });
    } else {
      this._hideDialog();
    }
  }
}