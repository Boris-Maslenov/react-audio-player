import './audioPlayer.scss';

import React from 'react';
import {useEffect, useState} from 'react';

export const AudioPlayer = () => {
    return (
        <div class="audio-player-wrap">              
            <div class="back-button">Back</div>
            <div class="audio-player app-player__body">
                <div class="audio-player__loading loading-animation">
                    <span class="loading-animation__flash"></span>
                </div>
                <div class="audio-player__controls">
                    <div class="audio-player__buttons">
                        <button class="audio-player__button audio-player__play"></button>
                        <button class="audio-player__button audio-player__pause"></button>
                    </div>
                    <div class="audio-player__progress">
                        proggress
                    </div>
                    <div class="audio-player__bottom">
                        <div class="audio-player__time">00:00</div>
                        <div class="audio-player__volume">volume</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

 