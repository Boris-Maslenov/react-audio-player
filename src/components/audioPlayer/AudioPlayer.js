import './audioPlayer.scss';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import RangeSlider from "react-range-slider-input";



const getTime = (time) => {
    const hourse = time/60/60
    const minutes =  time/60
    const tHours = Math.floor(hourse%60);
    const tMinutes = Math.floor(minutes%60);
    const tSecond = Math.floor(time%60)
    //${tHours < 10 ? `0${tHours}` :  tHours} : 
    return `${tMinutes < 10 ? `0${tMinutes}` :  tMinutes} : ${tSecond < 10 ? `0${tSecond}` :  tSecond}`;
}

export const AudioPlayer = ({url}) => {

    const [loadStatus, setLoadStatus] = useState(''); // loading, loaded, error
    const [playStatus, setPlayStatus] = useState('pause'); // playing, pause
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);

    const audioElement = useRef();

    const volumeChange = (value) => {
        audioElement.current.volume = value / 100;
        setVolume(value);
    }
    const progressChange = (value) => {
        const p = (audioElement.current.duration || 0) * (value / 100);
        if(audioElement.current.duration !== Infinity){
            audioElement.current.currentTime = p;
        }
    }

    const audioHandler = (audio) => {
        audio.onloadstart = () => {
            setLoadStatus('loading');
        }
        audio.oncanplaythrough = (e) => {
            setLoadStatus('loaded');
        }
        audio.onpause = () => {
            setPlayStatus('pause');
        }
        audio.onplaying = () => {
            setPlayStatus('playing');
        }
        audio.onerror = () => {
            setLoadStatus('error');
            console.dir('error');
        }
        audio.ontimeupdate = () => {
            setCurrentTime(Math.floor(audio.currentTime));
            setProgress( (audio.currentTime * 100) / audio.duration ) 
        }
        audio.onended = () => {
            setProgress(0) 
        }
    }

    useEffect(() => {
        audioHandler(audioElement.current);
    }, []);

    // { loadStatus === 'error' ? <p>Ошибка загрузки</p> : void 0}

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
                           playStatus === 'pause' ?
                           <button disabled={loadStatus !== 'loaded'} onClick={() => audioElement.current.play()} className="audio-player__button audio-player__play"></button> :
                           <button onClick={() => audioElement.current.pause()}  className="audio-player__button audio-player__pause"></button> 
                        } 
                    </div>
                    <div className="audio-player__progress">

                        { 
                            <RangeSlider className="range-slider__progress"
                                            min={0} max={100}
                                            thumbsDisabled={[true, false]}
                                            rangeSlideDisabled={true}
                                            onInput={(v) => progressChange(v[1])}
                                            step={0.1}
                                            value={[0, progress]}   
                            />
                        }
                    </div>
                    <div className="audio-player__bottom">
                        <div className="audio-player__time">{getTime(currentTime)}</div>
                        <div className="audio-player__volume">
                        { 
                            <RangeSlider className="range-slider__volume"
                                            min={0} max={100}
                                            thumbsDisabled={[true, false]}
                                            rangeSlideDisabled={true}
                                            onInput={(v) => volumeChange(v[1])}
                                            value={[0, volume]}   
                            />
                        }
                        </div>
                    </div>
                </div>
                <audio ref={audioElement} src={url} playsInline />
            </div>
        </div>
    )
}


