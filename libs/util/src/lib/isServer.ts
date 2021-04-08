// if window is undefined, then we're on the next.js SERVER!
export const isServer = () => typeof window === "undefined";