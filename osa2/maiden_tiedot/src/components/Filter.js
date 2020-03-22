import React from 'react';

const Filter = ({ filter, handleSearch }) => {
    return (
        <div>
            find countries <input value={filter} onChange={handleSearch} />
        </div>
    )
} 

export default Filter;
