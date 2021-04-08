import { CartLine } from '@multi-cart/react-data-access';
import React, { ReactElement } from 'react';
import { Badge } from 'react-bootstrap';
import { PlusCircleFill, WalletFill } from 'react-bootstrap-icons';
import { LineAccountModal } from '@multi-cart/react-shared-components';
import { getTotalAmounts, getTotalPercentages } from '@multi-cart/util';
import clsx from 'clsx';
import styles from './LineAccountButtonRow.module.scss';

export interface LineAccountButtonRowProps {
  line?: CartLine;
  children?: ReactElement;
  // TODO: to make this re-usable, want to have prop for Add.onClick() handler?
}

export function LineAccountButtonRow({ line, children }: LineAccountButtonRowProps) {
  const [modalShow, setModalShow] = React.useState(false);

  return (

    <>
      {/* MODAL */}
      <LineAccountModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        line={line}
      />

      {/* BUTTON ROW */}
      <div className="d-flex justify-content-sm-end flex-md-shrink-0" >
        <div className="pr-1"><strong><WalletFill className="mr-1 mt-neg-4" />Line Accounts:</strong> </div>
        <div className="pr-1">
          <Badge onClick={() => setModalShow(true)} pill variant="success" className="px-2 py-1 cursor-hand"><PlusCircleFill className="align-text-bottom mr-1" /> Add</Badge>
        </div>
        <div className="pr-1">
          <Badge
            pill
            variant={getTotalPercentages(line) === 100 ? "light" : "danger"}
            style={getTotalPercentages(line) === 100 ? null : { "backgroundColor": "#F6C0C5" }}
            className={clsx('px-2 py-1 fw-light', getTotalPercentages(line) === 100 ? 'text-reset' : 'text-danger')}>Percentages: <strong>{getTotalPercentages(line)}%</strong></Badge>
        </div>
        <div className="pr-1">
          <Badge
            pill
            variant={getTotalPercentages(line) === 100 ? "light" : "danger"}
            style={getTotalPercentages(line) === 100 ? null : { "backgroundColor": "#F6C0C5" }}
            className={clsx('px-2 py-1 fw-light', getTotalPercentages(line) === 100 ? 'text-reset' : 'text-danger')}>Line Total w/ Tax: <strong>${getTotalAmounts(line.cartLineAccounts)}</strong></Badge>
        </div>
      </div>

      {/* LINE ACCOUNTS themselves */}
      {children}

    </>
  );
}

export default LineAccountButtonRow;
