// import './LineAccountModal.module.scss';
import { ModalComponent, ModalComponentProps } from '@multi-cart/react-ui';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { WalletFill } from 'react-bootstrap-icons';
import { useAccountsQuery } from '@multi-cart/react-data-access';

/* eslint-disable-next-line */
export type LineAccountModalProps = {

} & ModalComponentProps;

// -------------------
// thx: https://react-bootstrap.github.io/components/modal/
export function LineAccountModal(props: LineAccountModalProps) {
  const [{ data, fetching }] = useAccountsQuery();

  return (
    <ModalComponent onHide={props.onHide} show={props.show} >
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
            <table className="table table-striped table-responsive-sm table-sm mt-2">
              <thead>
                <tr className="text-muted">
                  <th>Account #</th>
                  <th>Name</th>
                  <th>Amount Remaining</th>
                </tr>
              </thead>
              <tbody>
                {data?.accounts?.map((a, idx) => !a ? null : (
                  <tr key={a.accountNumber}>
                    <td>{a.accountNumber}</td>
                    <td>{a.accountName}</td>
                    <td>{a.amountRemaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </ModalComponent>
  );
}

export default LineAccountModal;
