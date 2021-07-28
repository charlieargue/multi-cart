import React from 'react';
import { LandingLayout, Hero } from '@multi-cart/react-shared-components';
import { useColorModeValue as mode, Text, Box, SimpleGrid, Stack, Divider, Link } from '@chakra-ui/react';
import { FcPrivacy, FcTimeline, FcDoughnutChart, FcMultipleDevices } from 'react-icons/fc';
import GridBlurredBackdrop from './_testimonials';
import { GoMarkGithub as GithubIcon } from 'react-icons/go';
import { FiExternalLink as ExternalLink } from 'react-icons/fi';

interface FeatureProps {
    title: string
    children: string
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
                <Link href="https://github.com/charlieargue/multi-cart" isExternal ml="2"><GithubIcon style={{ display: "inline", marginRight: "4px" }} />Code available on GitHub <ExternalLink style={{display: "inline"}} /></Link>
            </p>}
            image="https://source.unsplash.com/collection/2451930/800x600"
            ctaText="Register your account now"
            ctaLink="/register"
        />

        <Box minW="60vw" pt="82px" ><Divider /></Box>

        {/* Features */}
        <Box as="section" py="24">
            <Box mr="auto" px={{ base: '6', md: '8' }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX="10" spacingY="14">
                    <Feature title="Secure by default" icon={<FcPrivacy />}>
                        More Lorem ipsum something or another Stet clita kasd gubergren, no
                        sea takimata sanctus.
                        </Feature>
                    <Feature title="Always up to date" icon={<FcTimeline />}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore. no public directory... one more try... fingers crossed
                        </Feature>
                    <Feature title="Incredible statistics" icon={<FcDoughnutChart />}>
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                        sea takimata sanctus.
                        </Feature>
                    <Feature title="Support for multiple devices" icon={<FcMultipleDevices />}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore.
                        </Feature>
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