import React from 'react';
import { useReducer } from 'react';

import { PlayerContext } from '../../context/player/playerContext';
import { playerReducer } from '../../context/player/playerReducer';
import { Form } from '../form';
import { AudioPlayer } from '../audioPlayer/';

const SCREEN_MAP = {
    form: <Form />,
    player: <AudioPlayer />,
};

const initialState = { screen: 'form', url: '', history: [] };

export const Player = () => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const screen = SCREEN_MAP[state.screen];
    const setUrl = (url) => dispatch({ type: 'SET_URL', payload: url });
    const toAudioplayer = () => dispatch({ type: 'TO_AUDIOPLAYER' });
    const addHistory = (url) => dispatch({ type: 'ADD_HISTORY', payload: url });
    const toForm = () => dispatch({ type: 'TO_FORM' });

    return (
        <div className="app-player">
            <PlayerContext.Provider
                value={{ url: state.url, setUrl, toAudioplayer, toForm, addHistory, history: state.history }}
            >
                {screen}
            </PlayerContext.Provider>
        </div>
    );
};
