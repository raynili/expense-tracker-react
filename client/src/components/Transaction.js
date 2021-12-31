import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({transaction}) => {
    // requires a key but doesn't have to be the decoupled list
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? "-": "+";

    return (
        <li className={transaction.amount < 0 ? 'minus': 'plus'}>
            { transaction.text } <span>{sign}${ numberWithCommas(Math.abs(transaction.amount)) }</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>x</button>
        </li>
    );
};
