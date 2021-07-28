import { Box, chakra, Divider, Flex, Link, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { Hero, LandingLayout } from '@multi-cart/react-shared-components';
import React from 'react';
import { FcCollaboration, FcEnteringHeavenAlive, FcMindMap, FcPrivacy, FcTimeline, FcVip, FcWorkflow } from 'react-icons/fc';
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


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LandingContainerProps {

}

// Demo App built with React • Next.js • Nx • Chakra-UI • Storybook • urql • codegen • type-graphql • and more!
export const LandingContainer = () => {
    return (<LandingLayout>
        <Hero
            title="Fancy Shopping Cart"
            subtitle={<p>This is a fake app built for demo purposes with React, GraphQL, Terraform, AppSync, and other tech.
                <Link color={'pink.700'} href="https://github.com/charlieargue/multi-cart" isExternal ml="2"><GithubIcon style={{ display: "inline", marginRight: "4px" }} />Code available on GitHub <ExternalLink style={{ display: "inline" }} /></Link>
            </p>}
            image="https://source.unsplash.com/collection/2451930/800x600"
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
                            Robust GIT branching and deployment strategy, actions for creating and merging PRs after tests pass, re-usable <chakra.strong color="pink.500">nx</chakra.strong> libraries for easier collaboration, etc.
                        </p>
                    </Feature>
                    <Feature title="FE/BE Automation" icon={<FcWorkflow />}>
                        <p>
                            CICD workflows on each feature branch commit, utilizing <chakra.strong color="pink.500">Vercel, Terraform Cloud, and GitHub Actions</chakra.strong>.
                        </p>
                    </Feature>
                    <Feature title="Infrastructure-as-Code (IAC)" icon={<FcMindMap />}>
                        <p>
                            Terraform and AppSync power the back-end, including remote execution, state, and workpaces via <chakra.strong color="pink.500">Terraform Cloud</chakra.strong>.
                        </p>
                    </Feature>
                    <Feature title="Cloud Native" icon={<FcEnteringHeavenAlive />}>
                        <p>
                            Utilizing Amazon's "cloud native" tech (VTL AppSync resolvers) as much as possible for performance-at-scale and <chakra.strong color="pink.500">no cold starts</chakra.strong>!
                        </p>
                    </Feature>


                    {/*  */}
                    <Feature title="Service Tests run Parallel Now" icon={<FcPrivacy />}>
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                        sea takimata sanctus.
                        </Feature>
                    <Feature title="Testing Pyramid in CICD" icon={<FcTimeline />}>
                        Built a full testing pyramid executing in CICD environments, triggering github actions from Terraform (needs to be from Vercel), still not 100% but good enough.
                        </Feature>
                </SimpleGrid>
            </Box>
        </Box>

        <Divider />

        {/* TESTIMONIALS */}
        <GridBlurredBackdrop />

    </LandingLayout>);
}