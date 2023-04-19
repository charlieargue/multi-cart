import { Box, chakra, Divider, Flex, Link, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { Hero, LandingLayout } from '@multi-cart/react-shared-components';
import React from 'react';
import { FcOk, FcFlowChart, FcSportsMode, FcPositiveDynamic, FcCollaboration, FcEnteringHeavenAlive, FcMindMap, FcVip, FcWorkflow } from 'react-icons/fc';
import { FiExternalLink as ExternalLink } from 'react-icons/fi';
import { GoMarkGithub as GithubIcon } from 'react-icons/go';
import GridBlurredBackdrop from './_testimonials';

interface FeatureProps {
    title: string
    children: React.ReactElement
    icon: React.ReactElement
}

const Feature = (props: FeatureProps) => {
    const { title, children, icon } = props
    return (
        <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
            <Box fontSize="6xl">{icon}</Box>
            <Stack spacing="1">
                <Text fontWeight="extrabold" fontSize="lg">
                    {title}
                </Text>
                <Box color={mode('gray.600', 'gray.400')}>{children}</Box>
            </Stack>
        </Stack>
    )
}


// Demo App built with React • Next.js • Nx • Chakra-UI • Storybook • urql • codegen • type-graphql • and more!
export const LandingContainer = () => {
    return (<LandingLayout>
        <Hero
            title="Fancy Shopping Cart"
            subtitle={<p>This is a fake app built for demo purposes with <chakra.strong color="pink.500">React</chakra.strong>, GraphQL, Terraform, AppSync, and other tech.
                <Link color={'pink.700'} href="https://github.com/charlieargue/multi-cart" isExternal ml="2"><GithubIcon style={{ display: "inline", marginRight: "4px" }} />Code available on GitHub <ExternalLink style={{ display: "inline" }} /></Link>
            </p>}
            image="charlie-deets-SjaXRukdaEM-unsplash-OPTIMIZED.jpg"
            ctaText="Register your account now"
            ctaLink="/register"
        />

        <Box minW="60vw" pt="82px" ><Divider /></Box>

        {/* Features */}
        <Box as="section" py="24">


            <Flex
                textAlign={'center'}
                justifyContent={'center'}
                direction={'column'}
                width={'full'}
                mt={-9}
                mb={12}>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                    <chakra.h3
                        fontWeight={'bold'}
                        fontSize={25}
                        color={'pink.400'}>
                        Technical Details
                </chakra.h3>
                </Box>
            </Flex>


            <Box mr="auto" px={{ base: '6', md: '8' }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX="10" spacingY="14">
                    <Feature title="Production-Ready" icon={<FcVip />}>
                        <p>
                            Multiple environments, secure secrets management, automated <chakra.strong color="pink.500">testing pyramid</chakra.strong> within CICD, performance optimized, and more!
                        </p>
                    </Feature>
                    <Feature title="Team-Ready" icon={<FcCollaboration />}>
                        <p>
                            Effective GIT branching and deployment strategies, actions for creating and merging PRs after tests pass, re-usable <chakra.strong color="pink.500">nx mono-repo</chakra.strong> libraries for easier collaboration, automatic preview branches, etc.
                        </p>
                    </Feature>
                    <Feature title="FE/BE Automation" icon={<FcWorkflow />}>
                        <p>
                            CICD workflows on each feature branch commit, utilizing <chakra.strong color="pink.500">Vercel, Terraform Cloud, and GitHub Actions</chakra.strong> with tests running in parallel.
                        </p>
                    </Feature>
                    <Feature title="Serverless (IAC)" icon={<FcMindMap />}>
                        <p>
                            Terraform and AppSync power the back-end, including remote execution, state, and workpaces via <chakra.strong color="pink.500">Terraform Cloud</chakra.strong>.
                        </p>
                    </Feature>
                    <Feature title="Cloud Native" icon={<FcEnteringHeavenAlive />}>
                        <p>
                            Utilizing Amazon's "cloud native" tech (VTL AppSync resolvers) as much as possible for performance-at-scale and <chakra.strong color="pink.500">no cold starts</chakra.strong>!
                        </p>
                    </Feature>
                    <Feature title="Scalable" icon={<FcPositiveDynamic />}>
                        <p>
                            Built with highly-scalable tech, including Amazon's DynamoDB and Cognito (<chakra.strong color="pink.500">capable of handling millions of users</chakra.strong>) on the back-end, as well as the Vercel Edge Network for the front.
                        </p>
                    </Feature>
                    <Feature title="Performant" icon={<FcSportsMode />}>
                        <p>
                        The FE is built with <chakra.strong color="pink.500">urql</chakra.strong>, a blazing-fast GraphQL client, and opts-in to  Graphcache normalized caching for added power! Lighthouse scores are in the upper-90s for Performance and Best Practices!
                        </p>
                    </Feature>
                    <Feature title="Robust Testing Pyramid" icon={<FcFlowChart />}>
                        <p>
                        Tests of various granularity (UI/integration, service, &amp; unit tests), running <chakra.strong color="pink.500">in-parallel across multiple machines </chakra.strong> (via GitHub Actions), using Jest, Storybook, and Cypress &mdash; with testing times reduced to a couple minutes!
                        </p>
                    </Feature>
                    <Feature title="UI Best Practices" icon={<FcOk />}>
                        <p>
                        Component-based development, custom design system based on <chakra.strong color="pink.500">Chakra-ui</chakra.strong>, a re-usable shared-components library, and stand-alone Storybooks with Cypress tests. Dark mode included as well!
                        </p>
                    </Feature>
                </SimpleGrid>
            </Box>
        </Box>

        <Divider />

        {/* TESTIMONIALS */}
        <GridBlurredBackdrop />

    </LandingLayout>);
}