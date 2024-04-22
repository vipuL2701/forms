const initialState = {
    users: [], 
  };
  
  const submittedUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_SUBMITTED_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default submittedUsersReducer;
  