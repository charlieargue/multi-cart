import React from 'react';

import styles from './react-ui.module.scss';

/* eslint-disable-next-line */
export interface ReactUiProps { }

export function ReactUi(props: ReactUiProps) {
  return (
    <div>
      <h1 className={styles['react-ui__cool']}>Welcome to react-ui!💎 </h1>
    </div>
  );
}

export default ReactUi;
