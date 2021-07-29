import {
  Avatar,
  Badge,
  Box,
  chakra,
  Flex,
  LinkBox,
  LinkOverlay,
  SimpleGrid, Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { RiOpenSourceFill } from 'react-icons/ri';

const testimonials = [
  {
    name: 'nx',
    oss: true,
    role: 'mono-repo build framework',
    content:
      'The schematics and code-generation, the one centralized package.json, idempotence and only testing, linting, & building your affected projects, the ability to easily split up my codebase into re-usable libraries used by both the FE & BE, managing all your commands in one place (workspace.json), and so much more!',
    avatar: '/logos/logo-nrwl-nx.png',
    url: 'https://nx.dev/'
  },
  {
    name: 'urql',
    oss: true,
    role: 'small, fast, & versatile GraphQL client',
    content:
      "I enjoy working with urql's smart & normalized Graphcache. urql integrates very well with Next.js as well as GraphQL's Code Generator for auto-generated mutation hooks, type-safety across the entire stack, and comes with great devtools!",
    avatar: '/logos/logo-urql.png',
    url: 'https://formidable.com/open-source/urql/'
  },
  {
    name: 'Terraform',
    oss: true,
    role: 'infrastructure as code',
    content:
      "Together with AppSync and Terraform Cloud, this is a great combination! I use Postman to exercise all my GraphQL endpoints (via Newman in CICD environments), and really enjoyed working with remote state and workspaces.",
    avatar: '/logos/logo-terraform.png',
    url: 'https://www.terraform.io/'
  },
  {
    name: 'Next.js',
    oss: true,
    role: 'Production-grade React apps that scale',
    content:
      "I love React, and I especially love React + Next.js! Hybrid static & server-side rendering, great TypeScript support, smart bundling, route pre-fetching, and superb nx and urql integration!",
    avatar: '/logos/logo-vercel.png',
    url: 'https://nextjs.org/'
  },
];

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
  url: string;
  oss: boolean;
}

function TestmonialCard(props: TestimonialCardProps) {
  const { name, role, content, avatar, index, url, oss = false } = props;
  return (
    <LinkBox cursor="pointer">
      <Flex
        boxShadow={'lg'}
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        rounded={'xl'}
        p={10}
        justifyContent={'space-between'}
        position={'relative'}
        bg={useColorModeValue('white', 'gray.800')}>
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}>
          <chakra.p fontWeight={'bold'} fontSize={14} textDecoration="underline">
            {name}
            <chakra.span
              fontWeight={'medium'}
              color={'gray.500'}>
              {' '}
              - {role} {oss && (<RiOpenSourceFill style={{ display: "inline" }} />)}
            </chakra.span>
          </chakra.p>
          <chakra.p
            fontWeight={'normal'}
            fontSize={'15px'}
            pt={4}>
            {content}
          </chakra.p>
        </Flex>
        <Avatar
          background="gray.100"
          boxShadow="outline"
          src={avatar}
          height={'80px'}
          width={'80px'}
          alignSelf={'left'}
          m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
        />
      </Flex>
      {name === 'Terraform' && (
        <Text fontSize="xl" fontWeight="bold" mt={2}>
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            HashiCorp Certified
          </Badge>
          {' '}Terraform Associate
          {' '}<span role='img' aria-label='emoji'>✓</span>
        </Text>
      )}
      <LinkOverlay href={url} target="_blank"></LinkOverlay>
    </LinkBox>

  );
}

// -------------------
export default function GridBlurredBackdrop() {
  return (
    <Flex
      textAlign={'center'}
      pt={10}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}
      mb={48}>
      <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
        <chakra.h1
          py={5}
          fontSize={48}
          fontWeight={'bold'}
          color={useColorModeValue('gray.700', 'gray.50')}>
          I really <span role='img' aria-label='emoji'>💚</span> these tools!
          </chakra.h1>
        <chakra.h2
          margin={'auto'}
          width={'70%'}
          fontWeight={'medium'}
          color={useColorModeValue('gray.500', 'gray.400')}>
          All of these are {' '}
          <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
            open-source software <RiOpenSourceFill style={{ display: "inline" }} />
          </chakra.strong>!
          </chakra.h2>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={'20'}
        mt={8}
        mx={'auto'}>
        {testimonials.map((cardInfo, index) => (
          <TestmonialCard key={index} {...cardInfo} index={index} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}