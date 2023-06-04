import React from 'react';
import {useEffect, useState} from 'react';

import { Form } from '../form';
import { AudioPlayer } from '../audioPlayer/';

export const Player = () => {
    return(
        <div className="app-player">
            <Form />
           <AudioPlayer />          
        </div>
    ) 
}