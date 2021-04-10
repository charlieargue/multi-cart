import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack } from '@chakra-ui/react';
import { TextMuted } from '@multi-cart/react-ui';
import NextLink from 'next/link';
import React from 'react';
import { CgChevronRight as ChevronRightIcon } from 'react-icons/cg';
import { } from 'react-icons/fa';
import { BiHomeSmile as HomeIcon } from 'react-icons/bi';
import './Breadcrumbs.module.scss';

/* eslint-disable-next-line */
export interface BreadcrumbLink {
  isActive: boolean;
  label: string;
  href: string;
  as: string;
  id?: number;
}

export interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

// -------------------
export function Breadcrumbs<BreadcrumbsProps>({ links = [] }) {
  return (
    <Breadcrumb
      fontWeight="medium"
      mb={10}
      spacing="8px"
      separator={<ChevronRightIcon style={{ "marginTop": "7px" }} size={14} color="gray.400" />}>

      {/* Home */}
      <BreadcrumbItem>
        <NextLink href="/dashboard">
          <BreadcrumbLink href="/dashboard"><TextMuted>Home</TextMuted></BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>

      {/* Links */}
      {links?.map((link) => !link ? null : (
        <BreadcrumbItem key={link.id || link.label} isCurrentPage={link.isActive}>
          <NextLink
            href={link.href}
            as={link.as}
          >
            <BreadcrumbLink href="link.href">
              <TextMuted>
                {link.label}
                {link.id && (
                  <Badge colorScheme="teal" ml={2}>#{link.id}</Badge>
                )}
              </TextMuted>
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
