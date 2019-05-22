import * as React from 'react';

import Header from "../../components/AppWrapper/Header";
import { LeftNav } from "../../components/AppWrapper/LeftNav";

import styles from "./index.scss";

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div>
        <LeftNav />
        <main className={styles.body}>
          <Header />
          <div className={styles.content}>
            {
              this.props.children
            }
          </div>
        </main>
      </div>
    );
  }
}
