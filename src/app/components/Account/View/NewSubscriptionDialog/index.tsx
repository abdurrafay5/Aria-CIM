import * as React from 'react';

import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Close from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';

import { INewSubscriptionDialogProps } from "./INewSubscriptionDialogProps";
import { INewSubscriptionDialogState } from "./INewSubscriptionDialogState";
import styles from './index.scss';

export default class NewSubscriptionDialog extends React.Component<INewSubscriptionDialogProps, INewSubscriptionDialogState> {
  constructor(props: INewSubscriptionDialogProps, context?: any) {
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
        <DialogTitle className={styles.dialogHeading} id="form-dialog-title">Create New Subscription
          <IconButton className={styles.closeButton} aria-label="Close dialog" onClick={this.props.closeDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SwipeableViews
            axis={'x'}
            index={this.state.activeStep}
            onChangeIndex={this._handleStepChange}
          >
          <div></div>
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
                  Add Account
                </Button>
              ) : (
                <Button size="small" onClick={this._handleNext}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button size="small" onClick={this._handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
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
}
