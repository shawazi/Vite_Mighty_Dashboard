export const logIn = (userData) => ({
    type: 'LOG_IN',
    payload: userData, // Pass user data here (e.g., name, pw)
});

export const logOut = () => ({
    type: 'LOG_OUT',
});
