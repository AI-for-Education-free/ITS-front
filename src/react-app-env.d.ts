/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "react-i18next";
declare module 'codemirror/lib/codemirror.js';
declare module 'codemirror/mode/clike/clike.js';
declare module 'codemirror/addon/hint/show-hint';
declare module 'codemirror/addon/hint/anyword-hint.js';
declare module 'codemirror/addon/selection/active-line';
declare module 'codemirror/addon/fold/foldcode.js';
declare module 'codemirror/addon/fold/brace-fold.js';
declare module 'codemirror/addon/fold/foldgutter.js';
declare module 'codemirror/addon/fold/comment-fold.js';
declare module 'codemirror/addon/edit/closebrackets';