import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";
import Close from '@material-ui/icons/Close';
import { IBasicInformationDialogProps } from "./IBasicInformationDialogProps";
import { IBasicInformationDialogState } from "./IBasicInformationDialogState";
import { Service } from "app/middleware/Service";
import LoadingSpinner from "app/components/Utils/LoadingSpinner"
import Locales from "./locales";
import styles from './index.scss';

export default class NewSubscriptionDialog extends React.Component<IBasicInformationDialogProps, IBasicInformationDialogState> {

  constructor(props: IBasicInformationDialogProps, context?) {
    super(props, context);
    
    this.state = {
      loading: false,
      valueChanged: false,
      firstName: props.accountInfo.first_name,
      lastName: props.accountInfo.last_name,
      email: props.accountInfo.email
    };
  }

  render() {
    const { loading, firstName, lastName, email } = this.state;
    const { closeDialog } = this.props;

    return (
      <Dialog
        open={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={styles.dialogHeading} id="form-dialog-title">{Locales.heading}
          <IconButton className={styles.closeButton} aria-label="Close dialog" onClick={closeDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {
            loading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <TextField
                  value={firstName}
                  onChange={(event) => this.setState({ valueChanged: true, firstName: event.target.value }) }
                  autoFocus
                  required
                  margin="dense"
                  id="account-firstname"
                  label={Locales.firstName}
                  type="text"
                  fullWidth
                />
                <TextField
                  value={lastName}
                  onChange={(event) => this.setState({ valueChanged: true, lastName: event.target.value }) }
                  required
                  margin="dense"
                  id="account-lastname"
                  label={Locales.lastName}
                  type="text"
                  fullWidth
                />
                <TextField
                  value={email}
                  onChange={(event) => this.setState({ valueChanged: true, email: event.target.value }) }
                  margin="dense"
                  id="account-email"
                  label={Locales.email}
                  type="text"
                  fullWidth
                />
              </div>
            )
          }
        </DialogContent>
        {
          loading === false && (
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                {Locales.cancelButton}
              </Button>
              <Button disabled={!this.state.valueChanged} onClick={this._saveModifications} color="primary">
                {Locales.saveButton}
              </Button>
            </DialogActions>
          )
        }
      </Dialog>
    );
  }

  private _saveModifications = () => {
    this.setState({
      loading: true
    });
    const { firstName, lastName, email } = this.state;
    Service.UpdateAccount(this.props.accountNumber, {
      "first_name": firstName,
      "last_name": lastName,
      "email": email
    }).then(() => {
      this.props.closeDialog(true);
    });
  }
}
