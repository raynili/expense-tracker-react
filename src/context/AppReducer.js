// Reducer is how we specify how the applications state changes in response to 
// certain actions to our Store/Context

export default (state, action) => {
    // action is prop that contains type and payload
    switch(action.type) {
        case "DELETE_TRANSACTION":
            // must create a new state to return
            return {
                ...state,
                transactions: state.transactions.filter(transaction => 
                    transaction.id !== action.payload)
                    //filter out anything with this id
            }
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state;
    }
}