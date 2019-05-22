import * as React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from "app/components/Utils/LoadingSpinner";
import Locales from "./locales";
import styles from './index.scss';

import { IPaperContainerProps } from "./IPaperContainerProps";
import { IPaperContainerState } from "./IPaperContainerState";

export default class PaperContainer extends React.Component<IPaperContainerProps, IPaperContainerState> {

  render() {
    return (
      <Paper className={styles.paper}>
        <Typography className={styles.header} variant="display2" gutterBottom>
          {this.props.heading}
          {
            this.props.onEdit && (
              <Button className={styles.editButton} variant="outlined" color="primary" onClick={this.props.onEdit}>
                {Locales.editButton}
              </Button>
            )
          }
        </Typography>
        {
          this.props.loaded ? (
            this.props.children
          ) : (
            <LoadingSpinner />
          )
        }
      </Paper>
    );
  }
}