import React from 'react';
import Sort from './Sort';

export default {
  component: Sort,
  title: 'Sort',
};

export const withSortByCreatedAt = () => {

  const carts = [
    { id: 2, name: "2nd", createdAt: "2021-04-23T23:27:51.943Z" },
    { id: 3, name: "3rd", createdAt: "2021-05-23T23:27:51.943Z" },
    { id: 1, name: "1st", createdAt: "2021-03-23T23:27:51.943Z" },
    { id: 4, name: "4th", createdAt: "2021-06-23T23:27:51.943Z" },
  ];

  const TestItem: React.FC<{ id: number, name: string, createdAt: string, c: any }> = ({ id, name, createdAt, c }) => {
    return <div>
        {name} # {id} - {createdAt}
    </div>;
  }

  return <Sort by="createdAt" childType="c" >
    {carts.map((c) => !c ? null : (
      <TestItem
        key={c.id}
        c={c}
        id={c.id}
        name={c.name}
        createdAt={c.createdAt} />
    ))}
  </Sort>;
};


