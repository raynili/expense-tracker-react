import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    // calculate the total balance
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const sign = total < 0? '-':'';
    return (
        <>
            <h4>Your Balance</h4>
            <h1>{ sign }${ Math.abs(total) }</h1>
        </>
    )
    // anytime we update the transactions, the total amount will automatically render because it's being passed down
}
