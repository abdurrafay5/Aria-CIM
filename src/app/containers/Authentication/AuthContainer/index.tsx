import * as React from 'react';

import styles from "./index.scss"

export default class AuthContainer extends React.Component<{}> {
  constructor(props: any, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className={ styles.auth }>
        <div className={ styles.header }>
          <a href="#"></a>
        </div>
        <div className={ styles.body }>
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}
