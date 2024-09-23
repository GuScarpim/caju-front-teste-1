import { createElement, Fragment } from 'react';

export interface ICombineContexts {
  children: React.ReactNode;
}

/**
 * Combines multiples React contexts components into a single higher-order component.
 *
 * @param contexts - An array of React context components to be combined.
 * @returns A React component that provides all the given contexts to its children.
 */
export const combineContexts = (...contexts: any[]) => {
  return contexts.reduce(
    (AccumulatedContexts, CurrentContext) => {
      return (props: ICombineContexts) => {
        return createElement(
          AccumulatedContexts,
          null,
          createElement(CurrentContext, null, props.children)
        );
      };
    },
    (props: ICombineContexts) =>
      createElement(Fragment, null, props.children)
  );
};
