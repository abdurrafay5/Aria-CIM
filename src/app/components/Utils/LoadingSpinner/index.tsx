import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './index.scss';

export default class LoadingSpinner extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.spinner}>
        <CircularProgress size={50} />
      </div>
    );
  }
}