import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Close from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import Locales from "./locales";

import { ICreateAccountDialogProps } from "./ICreateAccountDialogProps";
import { ICreateAccountDialogState } from "./ICreateAccountDialogState";
import styles from './index.scss';

export class CreateAccountDialog extends React.Component<ICreateAccountDialogProps, ICreateAccountDialogState> {
  constructor(props: ICreateAccountDialogProps, context?: any) {
    super(props, context);

    this.state = {
      activeStep: 0
    };
  }

  render() {
    const { activeStep } = this.state;

    return (
      <Dialog
        open={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={styles.dialogHeading} id="form-dialog-title">{Locales.heading}
          <IconButton className={styles.closeButton} aria-label="Close dialog" onClick={this.props.closeDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.subtext}>
            {Locales.subText}
          </DialogContentText>
          <SwipeableViews
            axis={'x'}
            index={this.state.activeStep}
            onChangeIndex={this._handleStepChange}
          >
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="client-account-id"
              label={Locales.clientAccountID}
              type="text"
              fullWidth
            />
            <TextField
              id="account-status"
              select
              label={Locales.accountStatus}
              margin="dense"
              fullWidth
            >
              <MenuItem key="Active" value="Active">{Locales.accountStatusActive}</MenuItem>
              <MenuItem key="Registered Pending Activation" value="Registered Pending Activation">{Locales.accountStatusRegisteredPendingActivation}</MenuItem>
              <MenuItem key="Permanent" value="Permanent">{Locales.accountStatusPermanent}</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              id="parent-account-number"
              label={Locales.parentAccountNumber}
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              id="user-id"
              label={Locales.userID}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label={Locales.password}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="security-question"
              label={Locales.securityQuestion}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="security-answer"
              label={Locales.securityAnswer}
              type="text"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="currency"
              select
              label={Locales.currency}
              margin="dense"
              fullWidth
            >
              <MenuItem key="GBP" value="GBP">GBP</MenuItem>
              <MenuItem key="DKK" value="DKK">DKK</MenuItem>
              <MenuItem key="EUR" value="EUR">EUR</MenuItem>
              <MenuItem key="NOK" value="NOK">NOK</MenuItem>
              <MenuItem key="SEK" value="SEK">SEK</MenuItem>
              <MenuItem key="USD" value="USD">USD</MenuItem>
            </TextField>
          </div>
          </SwipeableViews>
          <MobileStepper
            className={styles.stepper}
            variant="dots"
            steps={5}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep === 4 ? (
                <Button size="small" variant="contained" color="primary">
                  {Locales.addAccountButton}
                </Button>
              ) : (
                <Button size="small" onClick={this._handleNext}>
                  {Locales.nextButton}
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button size="small" onClick={this._handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                {Locales.backButton}
              </Button>
            }
          />
        </DialogContent>
      </Dialog>
    );
  }

  private _handleNext = (): void => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  private _handleBack = (): void => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  private _handleStepChange = (activeStep: number) => {
    this.setState({ activeStep });
  };

  // private _createAccount = (): void => {
  //   this.props.closeDialog();
  // }
}
