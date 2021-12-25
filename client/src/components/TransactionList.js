import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState' // pull in global state
import { Transaction } from './Transaction';

export const TransactionList = () => {
    //const context = useContext(GlobalContext); // use the Context that you pulled in with this react hook
    // instead of using context.transactions, use decoupling instead
    const { transactions } = useContext(GlobalContext);

    // const obj1 = {
    //     newKey:"key",
    //     newPass:"pass"
    // };
    // const obj2 = {
    //     ...obj1,
    //     newPass:"newpass"
    // };
    // console.log(obj2);
    // console.log(obj1);

    return (
        <>
            <h3>History</h3>
            {/* transactions is an array thus must loop/map through it */}
            <ul className="list">
                { transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}     
            </ul>
        </>
    )
}
