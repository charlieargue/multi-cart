// import './LineAccountModal.module.scss';
import { getRemainingAmount, toFriendlyCurrency } from '@multi-cart/multi-cart/util';
import { Account, CartLine, useAccountsQuery, useAddCartLineAccountMutation } from '@multi-cart/react-data-access';
import { ModalComponent, ModalComponentProps } from '@multi-cart/react-ui';
import React from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { WalletFill } from 'react-bootstrap-icons';

/* eslint-disable-next-line */
export type LineAccountModalProps = {
  line: CartLine
} & ModalComponentProps;

// -------------------
// thx: https://react-bootstrap.github.io/components/modal/
export function LineAccountModal(props: LineAccountModalProps) {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();

  const handleSelect = async (a: Account) => {
    console.log("LineAccountModal 🚀 ~ props.line (SHOULD BE EMPTY CLAS!)", props.line);
    const remainingAmount = getRemainingAmount(props.line); // NOTE: since props.line is updated super-fast, it already has the NEW CLA in there,  somehow??
    console.log("LineAccountModal 🚀 ~ remainingAmount", remainingAmount);

    await addCartLineAccount({
      cartId: props.line.cartId,
      cartLineId: props.line.id,
      accountNumber: a.accountNumber,
      amount: remainingAmount,
    });
    // TODO:  cache will auto-refresh so behind modal will already show newest CLA
    props.onHide();
  };

  return (
    <ModalComponent onHide={props.onHide} show={props.show} dialogClassName="modal-scroll-y">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <WalletFill className="mr-2" style={{ marginTop: "-3px" }} />Choose a Line Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* SEARCH FORM */}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted ml-1">
              Start typing to <strong>filter line accounts</strong>:
            </Form.Text>
            <Form.Control type="text" placeholder="Search by account number or name" />
          </Form.Group>
        </Form>

        {/* RESULTS TABLE */}
        {
          !data && fetching ? (<div>loading...</div>) : (
            <Table striped hover responsive size="sm" className="mt-2">
              <thead>
                <tr className="text-muted">
                  <th>Account #</th>
                  <th>Name</th>
                  <th>Amount Remaining</th>
                </tr>
              </thead>
              <tbody>
                {data?.accounts?.map((a, idx) => !a ? null : (
                  <tr key={a.accountNumber} className="cursor-hand" onClick={() => handleSelect(a as Account)}>
                    <td>{a.accountNumber}</td>
                    <td>{a.accountName}</td>
                    <td>{toFriendlyCurrency(a.amountRemaining)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </ModalComponent>
  );
}

export default LineAccountModal;
