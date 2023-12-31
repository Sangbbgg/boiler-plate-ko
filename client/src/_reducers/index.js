import { combineReducers } from "redux";
import user from './user_reducer';

// GPT-----------------------------------------
// import someReducer from './someReducer';
// import anotherReducer from './anotherReducer';
// --------------------------------------------

const rootReducer = combineReducers({
    // GPT-------------------------------------
    // someState: someReducer,
    // anotherState: anotherReducer
    // ----------------------------------------

    
    user
})
export default rootReducer;