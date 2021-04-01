import React from 'react';
import { Badge, FormControl, InputGroup } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

// import './LineAccount.module.scss';

/* eslint-disable-next-line */
export interface LineAccountProps { }

// TODO: once figure out cssModules issue, move these styles into scss properly
const stylesGroup = { maxWidth: "400px"};

export function LineAccount(props: LineAccountProps) {
  return (
    <InputGroup className="mb-3 ml-3" style={stylesGroup} size="sm">
      <InputGroup.Prepend>
        <InputGroup.Text>
          <strong>#</strong> 123-345-67
          <Badge style={{backgroundColor: "#ccc"}}  variant="success" className="ml-2 px-2 py-1 fw-light text-reset">$13.99</Badge>
          <X size={18} className="text-danger fw-bold align-text-bottom ml-1 cursor-hand" />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label="Amount (to the nearest dollar)" />
      <InputGroup.Append>
        <InputGroup.Text><strong>%</strong></InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>

  );
}

export default LineAccount;
