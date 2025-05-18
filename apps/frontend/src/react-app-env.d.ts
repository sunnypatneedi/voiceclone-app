/// <reference types="react-scripts" />
/// <reference types="react/next" />
/// <reference types="react-dom/next" />

// Import global type definitions
/// <reference path="./types/global.d.ts" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add any additional global type declarations here
