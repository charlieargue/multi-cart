/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './Sort.module.scss';

/* eslint-disable-next-line */
export interface SortProps {
  children?: React.ReactNode;
  key?: string;
  by?: any;
}

// thx: https://stackoverflow.com/a/55996695/6200791
// -------------------
export const Sort: React.FC<SortProps> = ({ children, by, key = "id" }) => {

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

  // ✅ WORKS! return (<>{ children }</>); but w/ DISABLE LINT!
  // ✅ WORKS! return (<div><strong>Children:</strong>{children}</div>);
  // ❌ DOESN'T WORK :( return ({children});

  if (!by) {
    // If no 'sort by property' provided, return original list
    // ✅ WORKS! 
    return (<>{children}</>);
  } 
  // else {

    // {React.Children.map(children, (child) => (
    //   <div className={styles.childContainer}>{child}</div>
    // ))}

    // // thx: https://frontarm.com/james-k-nelson/passing-data-props-children/
    // let elements: any = React.Children.toArray(children);

    // if (elements.length === 1) {
    //   elements = React.cloneElement(elements[0], null);
    // }
    // else if (elements.length > 0) {
    //   // let lastElement = elements[elements.length - 1];
    //   // elements =
    //   //   [React.cloneElement(elements[0], { className: 'top' })]
    //   //     .concat(elements.slice(1, -1))
    //   //     .concat(React.cloneElement(lastElement, { className: 'bottom' }))
    // }
    
    // return (
    //   <div className="List">
    //     {elements}
    //   </div>
    // )

    // ❌ DOESN'T WORK: every item needs a key ERROR... but look? so then DIV cannot be child of TR error... sigh...
    // return (

      
      // otherwise, sort it, and then return each child for further rendering...
      // <>
      //   {React.Children
      //     .toArray(children)
      //     .sort(compare as any)
      //     .map((child) => (
      //       <>{React.cloneElement(children, { className: "top bottom" })}</>;
      //       // <div key={(child as any).id}>{child}</div>
      //     ))}
      // </>
    // );
  // }
}

export default Sort;
