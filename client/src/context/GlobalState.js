// In larger application, can split up into multiple states
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
    transactions: [
        //   { id: 1, text: 'Flower', amount: -20 },
        //   { id: 2, text: 'Salary', amount: 300 },
        //   { id: 3, text: 'Book', amount: -10 },
        //   { id: 4, text: 'Camera', amount: 150 }
        // clear default state and use empty list
        ],
    error: null,
    loading: true // to be used with a spinner to indicating loading request, set to false when make request
};

// Create context
// need to export it to bring to other files to use
// create a Context object out of initialState
export const GlobalContext = createContext(initialState);

// Create provider
// For other components to have access to our global state,
// need to create a provider
// wrap components in provider component
export const GlobalProvider = ({ children }) => { // destructure the children elements of the dom
    // access state values and use the reducer inside the provider
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    // create an action that makes calls to our reducer

    // 11. Deal with all of our requests through Actions here
    async function getTransactions() { // async since we're using axios which returns a Promise
        try {
            const response = await axios.get('/api/v1/transactions'); // no https://localhost:5000 needed because of proxy in package.json

            // transactions array / initial state is empty so...
            // dispatch to our reducer to change the state
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: response.data.data // transactions from backend
            });

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error // transactions from backend
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            // delete from server first
            await axios.delete(`/api/v1/transactions/${id}`); // don't need to save, just need to make a call
            
            dispatch({ // this dispatches an action with a type and a payload
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error // transactions from backend
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions/', transaction, config);

            dispatch({ // this dispatches an action with a type and a payload
                type: 'ADD_TRANSACTION',
                payload: res.data.data // same as writing transaction
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error // transactions from backend
            });
        }
    }

    // 12. ONCE COMPLETED ALL, DEPLOY INTO PROD
    // Run in terminal 'npm run build'
    // creates build folder with static assets that you deploy, contains index.html etc
    // When deploys to one domain on port 80

    // after wards, run 'npm start' and server will start, when go to localhost:5000 should still work

    // then can deploy with 'node server'


    return (<GlobalContext.Provider value={{
        // pass current state of transactions into the value of our provider
        // access from object by calling state.<what we want>
        transactions: state.transactions,
        // can access transactions from any component that need it,
        // in component code, they can request it using useContext (<- another React hook)
        error: state.error,
        loading: state.loading,
        getTransactions, // not using right now, just passing
        deleteTransaction,
        //PASS IT DOWN the provider so components can pull this function out for use
        addTransaction
    }}>
        { children }
    </GlobalContext.Provider>)
    // Provider provides our state and any actions to the components that its wrapped around
    // Provider has value prop
}
// then bring provider into our App.js file
