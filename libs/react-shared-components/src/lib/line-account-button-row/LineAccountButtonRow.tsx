import { CartLine } from '@multi-cart/react-data-access';
import React, { ReactElement } from 'react';
import { Badge } from 'react-bootstrap';
import { PlusCircleFill, WalletFill } from 'react-bootstrap-icons';
import { LineAccountModal } from '@multi-cart/react-shared-components';

// import './LineAccountButtonRow.module.scss';

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
      />

      {/* BUTTON ROW */}
      <div className="d-flex justify-content-sm-end flex-md-shrink-0" >
        <div className="pr-1"><strong><WalletFill className="mr-1" style={{ marginTop: "-3px" }} />Line Accounts:</strong> </div>
        <div className="pr-1">
          <Badge onClick={() => setModalShow(true)} pill variant="success" className="px-2 py-1 cursor-hand"><PlusCircleFill className="align-text-bottom mr-1" /> Add</Badge>
        </div>
        <div className="pr-1">
          <Badge pill variant="light" className="px-2 py-1 fw-light text-reset">Percentages: <strong>100%</strong></Badge>
        </div>
        <div className="pr-1">
          <Badge pill variant="light" className="px-2 py-1 fw-light text-reset">Line Total w/ Tax: <strong>$10</strong></Badge>
        </div>
      </div>

      {/* LINE ACCOUNTS themselves */}
      {children}

    </>
  );
}

export default LineAccountButtonRow;
