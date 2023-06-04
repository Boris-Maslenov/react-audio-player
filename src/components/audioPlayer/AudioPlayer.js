import './audioPlayer.scss';

import React from 'react';
import {useEffect, useState} from 'react';

export const AudioPlayer = () => {
    return (
        <div className="audio-player-wrap">              
            <div className="back-button">Back</div>
            <div className="audio-player app-player__body">
                <div className="audio-player__loading loading-animation">
                    <span className="loading-animation__flash"></span>
                </div>
                <div className="audio-player__controls">
                    <div className="audio-player__buttons">
                        <button className="audio-player__button audio-player__play"></button>
                        <button className="audio-player__button audio-player__pause"></button>
                    </div>
                    <div className="audio-player__progress">
                        proggress
                    </div>
                    <div className="audio-player__bottom">
                        <div className="audio-player__time">00:00</div>
                        <div className="audio-player__volume">volume</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

 