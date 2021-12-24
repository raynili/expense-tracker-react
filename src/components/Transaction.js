import React from 'react';

export const Transaction = ({transaction}) => {
    // requires a key but doesn't have to be the decoupled list

    const sign = transaction.amount < 0 ? "-": "+";


    return (
        <li className={transaction.amount < 0 ? 'minus': 'plus'}>
            { transaction.text } <span>{sign}${ Math.abs(transaction.amount) }</span>
            <button className="delete-btn">x</button>
        </li>
    );
};