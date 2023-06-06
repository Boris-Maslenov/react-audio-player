export const playerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_URL':
            return { ...state, url: action.payload };
        case 'ADD_HISTORY':
            return { ...state, history: [...state.history, action.payload] };
        case 'TO_FORM':
            return { ...state, screen: 'form' };
        case 'TO_AUDIOPLAYER':
            return { ...state, screen: 'player' };
        default:
            return state;
    }
};
