const initialState = {
    isLoggedIn: false,
    userData: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload, // Store user data here (e.g., name, profile picture)
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                userData: null,
            };
        default:
            return state;
    }
};

export default userReducer;