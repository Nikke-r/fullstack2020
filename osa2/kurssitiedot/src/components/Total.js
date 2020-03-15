import React from 'react';

const Total = ({ parts }) => {
    const total = parts.reduce((x, y) => ({exercises: x.exercises + y.exercises}));
    
    return (
        <p style={{fontWeight: 'bold'}}>total of {total.exercises} exercises </p>
    );
};

export default Total;
