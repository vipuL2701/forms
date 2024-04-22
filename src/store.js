// store.js
import { createStore, combineReducers } from 'redux';
import submittedUsersReducer from './reducers/submittedUsersReducer';

const rootReducer = combineReducers({
  submittedUsers: submittedUsersReducer,
  // Add more reducers if needed
});

const store = createStore(rootReducer);

export default store;
