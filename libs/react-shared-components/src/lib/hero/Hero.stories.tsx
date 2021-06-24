import { text } from '@storybook/addon-knobs';
import React from 'react';
import Hero, { HeroProps } from './Hero';

export default {
  component: Hero,
  title: 'Hero',
};

export const primary = () => {
  const props: HeroProps = {
    title: text("title", "Fancy Shopping Cart"),
    subtitle: text("subtitle", "Demo App built with React • Next.js • Nx • Chakra-UI • Storybook • urql • codegen • type-graphql • and more!"),
    image: text("image", "https://source.unsplash.com/collection/2451930/800x600"),
    ctaText: text("ctaText", "Register your account now"),
    ctaLink: text("ctaLink", "/register"),

  };
  return <Hero
    title={props.title}
    subtitle={props.subtitle}
    image={props.image}
    ctaText={props.ctaText}
    ctaLink={props.ctaLink}
  />;
};
