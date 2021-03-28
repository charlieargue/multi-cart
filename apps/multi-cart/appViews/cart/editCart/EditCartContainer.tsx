import React from 'react';
import { EditCart } from './EditCart';


export const EditCartContainer: React.FC<{ id: number }> = ({ id }) => {

  return <EditCart id={id} />;
};
