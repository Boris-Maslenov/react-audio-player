import React from 'react';
import {useEffect, useState} from 'react';

import { Form } from '../form';
import { AudioPlayer } from '../audioPlayer/';

//const url = 'https://c5.radioboss.fm:18084/stream';
// const url = 'https://d.lalal.ai/media/split/ebf6a7a0-2d14-4761-a898-3fc2100fd6a8/bcd093a8-7cf1-4178-a7b1-9a9d00a5625e/no_vocals';
//const url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3';

export const Player = () => {
    const SCREEN_MAP = {
        'form' : <Form onPlayer={()=> setScreen('player')} />,
        'player': <AudioPlayer url={url} onBack={()=> setScreen('form')} />,
    }
    const [screen, setScreen] = useState('form');
    const content = SCREEN_MAP[screen];
    return(
        <div className="app-player">
            {content}       
        </div>
    ) 
}