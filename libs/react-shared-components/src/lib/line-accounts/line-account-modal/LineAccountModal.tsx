// import './LineAccountModal.module.scss';
import { getRemainingAmount, toFriendlyCurrency } from '@multi-cart/util';
import { Account, CartLine, useAccountsQuery, useAddCartLineAccountMutation } from '@multi-cart/react-data-access';
import { ModalComponent, ModalComponentProps } from '@multi-cart/react-ui';
import React from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { WalletFill } from 'react-bootstrap-icons';
import clsx from 'clsx';

/* eslint-disable-next-line */
export type LineAccountModalProps = {
  line: CartLine
} & ModalComponentProps;

// -------------------
// thx: https://react-bootstrap.github.io/components/modal/
// thx: https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg
export function LineAccountModal({ onHide, line, show }: LineAccountModalProps) {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  // ------------------
  React.useEffect(() => {
    const results = data?.accounts.filter(account =>
      account.accountNumber.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [data?.accounts, searchTerm]);


  // ------------------
  const handleSelect = async (a: Account) => {
    const remainingAmount = getRemainingAmount(line); // NOTE: since line is updated super-fast, it already has the NEW CLA in there,  somehow??
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      amount: remainingAmount,
    });
    // TODO:  cache will auto-refresh so behind modal will already show newest CLA
    onHide();
  };

  // ------------------
  const isAlreadySelected = (accountNumber: string): boolean => {
    return line.cartLineAccounts ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber).length !== 0 : false;
  }

  // ------------------
  return (
    <ModalComponent onHide={onHide} show={show} dialogClassName="modal-scroll-y">
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
            <Form.Control
              type="text"
              placeholder="Search by account number or name"
              value={searchTerm}
              onChange={handleChange} />
          </Form.Group>
        </Form>

        {/* RESULTS TABLE */}
        {
          !searchResults && fetching ? (<div>loading...</div>) : (
            <Table striped hover responsive size="sm" className="mt-2">
              <thead>
                <tr className="text-muted">
                  <th>Account #</th>
                  <th>Name</th>
                  <th>Amount Remaining</th>
                </tr>
              </thead>
              <tbody>
                {searchResults?.map((a, idx) => !a ? null : (
                  // [ngClass]="{'bg-yellow opacity-60': }">  
                  <tr
                    key={a.accountNumber}
                    className={clsx("cursor-hand", isAlreadySelected(a.accountNumber) ? "bg-warning text-muted" : null)}
                    onClick={() => isAlreadySelected(a.accountNumber) ? null : handleSelect(a as Account)}>
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
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </ModalComponent>
  );
}

export default LineAccountModal;
