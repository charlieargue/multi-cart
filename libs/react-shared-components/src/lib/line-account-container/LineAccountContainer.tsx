import React, { ReactElement } from 'react';
import { CartLine } from '@multi-cart/react-data-access';
import { Col, Container, Row } from 'react-bootstrap';

// import './LineAccountContainer.module.scss';

export interface LineAccountContainerProps {
  line?: CartLine;
  children?: ReactElement;
}

export function LineAccountContainer({ line, children }: LineAccountContainerProps) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>Accounts: </Col>
          <Col>Add Badge:</Col>
          <Col>Copy badge:</Col>
          <Col>Percentages:</Col>
          <Col>Line Total w/ Tax:</Col>
        </Row>
      </Container>
      {children}
    </>
  );
}

export default LineAccountContainer;
