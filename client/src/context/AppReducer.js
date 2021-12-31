// Reducer is how we specify how the applications state changes in response to 
// certain actions to our Store/Context

const AppReducer = (state, action) => {
    // action is prop that contains type and payload
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload // since starts off empty, payload is data from response
            }
        case "DELETE_TRANSACTION":
            // must create a new state to return
            return {
                ...state,
                transactions: state.transactions.filter(transaction => 
                    transaction._id !== action.payload)
                    //filter out anything with this id
            }
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default AppReducer;