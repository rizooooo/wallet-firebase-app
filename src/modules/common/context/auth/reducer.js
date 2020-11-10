import Types from './types'

const AuthReducer = (state, action) => {
    switch (action.type) {
        case Types.SET_ACTIVE_USER:
            console.log('SET_ACTIVE_USER', action)
            return {
                ...state,
                auth: {
                    ...state.auth,
                    activeUser: action.payload.activeUser,
                },
            };
    };
}

export default AuthReducer;
