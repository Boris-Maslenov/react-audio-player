import React from 'react';
import {useEffect, useState} from 'react';

import { Form } from '../form';
import { AudioPlayer } from '../audioPlayer/';

export const Player = () => {
    const SCREEN_MAP = {
        'form' : <Form />,
        'player': <AudioPlayer />,
    }
    const [screen, setScreen] = useState('player');
    const content = SCREEN_MAP[screen];
    return(
        <div className="app-player">
            {content}       
        </div>
    ) 
}