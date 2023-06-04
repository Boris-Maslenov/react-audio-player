import './audioPlayer.scss';

import React from 'react';
import {useEffect, useState, useRef} from 'react';

const url = 'https://c5.radioboss.fm:18084/stream';
// const url = 'https://d.lalal.ai/media/split/ebf6a7a0-2d14-4761-a898-3fc2100fd6a8/bcd093a8-7cf1-4178-a7b1-9a9d00a5625e/no_vocals';
//const url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3';

const getTime = (time) => {
    const hourse = time/60/60
    const minutes =  time/60
    const tHours = Math.floor(hourse%60);
    const tMinutes = Math.floor(minutes%60);
    const tSecond = Math.floor(time%60)
    //${tHours < 10 ? `0${tHours}` :  tHours} : 
    return `${tMinutes < 10 ? `0${tMinutes}` :  tMinutes} : ${tSecond < 10 ? `0${tSecond}` :  tSecond}`;
}

export const AudioPlayer = () => {

    const [loadStatus, setLoadStatus] = useState(''); // loading, loaded, error
    const [playStatus, setPlayStatus] = useState(); // playing, pause
    const [currentTime, setCurrentTime] = useState(0);

    const audioElement = useRef(new Audio(url));

    const audioHandler = (audio) => {
        audio.onloadstart = (e) => {
            console.dir('loadstart');
            setLoadStatus('loading');
        }
        audio.oncanplaythrough = (e) => {
            console.dir('canplaythrough');
            setLoadStatus('loaded');
        }
        audio.onplaying = (e) => {
            setLoadStatus('loaded');
            setPlayStatus('playing');
            console.log('onplaying', audioElement.current.currentTime);
        }
        audio.onpause = (e) => {
            setPlayStatus('pause');
            console.log('pause', audioElement.current.currentTime);
        }
        audio.onerror = (e) => {
            setLoadStatus('error');
            console.dir('error');
        }
        audio.ontimeupdate = (e) => {
            setCurrentTime(Math.round(audio.currentTime))
        }
    }

    useEffect(() => {
        audioHandler(audioElement.current);
    }, []);

 
    return (
        <div className="audio-player-wrap">              
            <div className="back-button">Back</div>
            <div className="audio-player app-player__body">
            {
                loadStatus === 'loading' && 
                <div className="audio-player__loading loading-animation">
                    <span className="loading-animation__flash"></span>
                </div>
            }
                <div className="audio-player__controls">
                    <div className="audio-player__buttons">
                        {
                           audioElement.current.paused ?
                           <button disabled={loadStatus !== 'loaded'} onClick={() => audioElement.current.play()} className="audio-player__button audio-player__play"></button> :
                           <button onClick={() => audioElement.current.pause()}  className="audio-player__button audio-player__pause"></button> 
                        } 
                    </div>
                    <div className="audio-player__progress">
                        proggress
                    </div>
                    <div className="audio-player__bottom">
                        <div className="audio-player__time">{getTime(currentTime)}</div>
                        <div className="audio-player__volume">volume</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


