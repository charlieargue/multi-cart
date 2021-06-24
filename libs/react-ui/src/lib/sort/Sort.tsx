/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './Sort.module.scss';

/* eslint-disable-next-line */
export interface SortProps {
  children: React.ReactNode;
  childType: string;
  by?: any;
  keyWith?: string;
}

// thx: https://stackoverflow.com/a/55996695/6200791
// thx: https://frontarm.com/james-k-nelson/passing-data-props-children/
// -------------------
export const Sort: React.FC<SortProps> = ({ children, childType, by, keyWith = "id" }) => {

  // ##################################################################################
  // # COMPARISON FUNCTION
  // ##################################################################################
  const compare = (aRaw: any, bRaw: any): any => {
    const a = aRaw.props[childType];
    const b = bRaw.props[childType];

    // Compare function needed by the Sort component
    // you can access the relevant property like this a.props[by]
    // depending whether you are sorting by tilte or year, you can write a compare function here, 
    if (!!a && !!b) {
      switch (by) {

        case "createdAt":
          return b[by] > a[by] ? 1 : -1;
          break;

        case "description":
          return a[by].localeCompare(b[by]);
          break;
      }
    }
  }
  // ##################################################################################
  // # /end COMPARISON FN
  // ##################################################################################

  if (!children) {
    return (<></>);
  }

  if (!by) {
    // If no 'sort by property' provided, return original list
    // ✅ WORKS! 
    return (<>{children}</>);
  
  } else {
    // trying to workaround error: Each child in a list should have a unique "key" prop
    const elements: any[] = React.Children.toArray(children);
    const keyed: any[] = elements
      .sort(compare)
      .map((child, newIdx) => {
        return React.cloneElement(child, { key: (child as any)[keyWith], idx: newIdx });
      });
    return (<>{keyed}</>);
  }
}

export default Sort;
