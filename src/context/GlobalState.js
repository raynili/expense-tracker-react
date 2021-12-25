// In larger application, can split up into multiple states
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// Initial state
const initialState = {
    transactions: [
        //   { id: 1, text: 'Flower', amount: -20 },
        //   { id: 2, text: 'Salary', amount: 300 },
        //   { id: 3, text: 'Book', amount: -10 },
        //   { id: 4, text: 'Camera', amount: 150 }
        // clear default state and use empty list
        ]
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
    function deleteTransaction(id) {
        dispatch({ // this dispatches an action with a type and a payload
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({ // this dispatches an action with a type and a payload
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        // pass current state of transactions into the value of our provider
        // access from object by calling state.<what we want>
        transactions: state.transactions,
        // can access transactions from any component that need it,
        // in component code, they can request it using useContext (<- another React hook)
        deleteTransaction,
        //pass it down the provider so components can pull this function out for use
        addTransaction
    }}>
        { children }
    </GlobalContext.Provider>)
    // Provider provides our state and any actions to the components that its wrapped around
    // Provider has value prop
}
// then bring provider into our App.js file
