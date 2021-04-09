import React from 'react';
import { LandingLayout, Hero } from '@multi-cart/react-shared-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LandingContainerProps {

}

export const LandingContainer = () => {
    return (<LandingLayout>
        <Hero
            title="Fancy Shopping Cart"
            subtitle="Demo App built with React • Next.js • Nx • Chakra-UI • Storybook • urql • codegen • type-graphql • and more!"
            image="https://source.unsplash.com/collection/2451930/800x600"
            ctaText="Register your account now"
            ctaLink="/register"
        />
    </LandingLayout>);
}