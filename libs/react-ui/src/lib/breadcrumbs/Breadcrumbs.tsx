import React from 'react';
import { Breadcrumb, Badge } from 'react-bootstrap';
import NextLink from 'next/link';
import { HouseFill } from 'react-bootstrap-icons';
// import './Breadcrumbs.module.scss';

/* eslint-disable-next-line */
export interface BreadcrumbLink {
  isActive: boolean;
  label: string;
  id?: number;
}

export interface BreadcrumbsProps {
  links: BreadcrumbLink[]
}

// -------------------
export function Breadcrumbs<BreadcrumbsProps>({ links = [] }) {
  return (
    <Breadcrumb className="mb-5">
      <Breadcrumb.Item className="align-content"><NextLink href="/">
        <HouseFill color="gray" className="mb-1" data-test-id="icon-home" />
      </NextLink></Breadcrumb.Item>
      {links?.map((link) => !link ? null : (
        <Breadcrumb.Item key={link.id || link.label} active={link.isActive}>{link.label}
          {link.id && (
            <Badge pill variant="secondary" className="ml-2 align-text-bottom">#{link.id}</Badge>
          )}
        </Breadcrumb.Item>
      ))
      }
    </Breadcrumb>
  );
}

export default Breadcrumbs;
