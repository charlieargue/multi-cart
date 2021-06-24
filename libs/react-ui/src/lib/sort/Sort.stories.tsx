import React from 'react';
import Sort from './Sort';

export default {
  component: Sort,
  title: 'Sort',
};
const carts = [
  { id: 2, name: "2nd", createdAt: "2021-04-23T23:27:51.943Z", description: "d" },
  { id: 3, name: "3rd", createdAt: "2021-05-23T23:27:51.943Z", description: "b" },
  { id: 1, name: "1st", createdAt: "2021-03-23T23:27:51.943Z", description: "c" },
  { id: 4, name: "4th", createdAt: "2021-06-23T23:27:51.943Z", description: "a" },
];

const TestItem: React.FC<{ c: any }> = ({ c }) => {
  return <div>
      {c.name} # {c.id} - {c.createdAt} ({c.description})
  </div>;
}

// -------------------
export const withSortByCreatedAt = () => {
  return <Sort by="createdAt" childType="c" >
    {carts.map((c) => !c ? null : (
      <TestItem
        key={c.id}
        c={c}/>
    ))}
  </Sort>;
};


// -------------------
export const withSortByCategory = () => {
  return <Sort by="description" childType="c" >
    {carts.map((c) => !c ? null : (
      <TestItem
        key={c.id}
        c={c}/>
    ))}
  </Sort>;
};


