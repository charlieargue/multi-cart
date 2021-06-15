/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './Sort.module.scss';

/* eslint-disable-next-line */
export interface SortProps {
  children?: React.ReactNode;
  keyToSortBy?: string;
  by?: any;
}

// thx: https://stackoverflow.com/a/55996695/6200791
// thx: https://frontarm.com/james-k-nelson/passing-data-props-children/
// -------------------
export const Sort: React.FC<SortProps> = ({ children, by, keyToSortBy = "id" }) => {

  const compare = (a, b): any => {
    // Compare function needed by the Sort component
    // you can access the relevant property like this a.props[by]
    // depending whether you are sorting by tilte or year, you can write a compare function here, 
    switch (by) {
      case "createdAt":
        return b.props[by] > a.props[by] ? 1 : -1;
        break;
    }
  }

  if (!children) {
    return (<></>);
  }

  if (!by) {
    // If no 'sort by property' provided, return original list
    // ✅ WORKS! 
    return (<>{children}</>);
  } else {

    // trying to workaround error: Each child in a list should have a unique "key" prop.
    const elements: any[] = React.Children.toArray(children);
    const keyed: any[] = elements.map((child) => {
      // React.cloneElement(elements[0], { className: 'top bottom' })
      return React.cloneElement(child, { key: (child as any).id });
    });
    return (<>{keyed}</>);

  }
}

export default Sort;
