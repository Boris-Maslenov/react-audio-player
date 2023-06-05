import './audioPlayer.scss';
import React from 'react';
import {useEffect, useState, useRef, useContext} from 'react';
import RangeSlider from "react-range-slider-input";
import { Error } from '../error';
import { PlayerContext } from '../../context/player/playerContext';
import { getTime } from '../../services/getTime.service';

export const AudioPlayer = () => {
    const {url, toForm} = useContext(PlayerContext);
    const [loadStatus, setLoadStatus] = useState(''); 
    const [playStatus, setPlayStatus] = useState('pause');
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const audioElement = useRef();
    useEffect(() => {
        audioHandler(audioElement.current);
    }, []);
    const volumeChange = (value) => {
        value > 100 ? value = 100 : value < 0 ? value = 0 : void 0;
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
        }
        audio.ontimeupdate = () => {
            setCurrentTime(Math.floor(audio.currentTime));
            setProgress( (audio.currentTime * 100) / audio.duration ) 
        }
        audio.onended = () => {
            setProgress(0) 
        }
    }
const onKeyDownHandle = (e) => {
    const key = e.code;
    switch(key){
        case "KeyP" : 
            playStatus === 'pause' ? 
            audioElement.current.play() : 
            audioElement.current.pause();
        break;
        case "Comma" : 
             volumeChange(volume - 5);
        break;
        case "Period" : 
             volumeChange(volume + 5);
        break;
        default: return;
    }
}
// { loadStatus === 'error' ? <p>Ошибка загрузки</p> : void 0}
    return (
        <div className="audio-player-wrap" tabIndex="1" onKeyDown={onKeyDownHandle}>              
            <div onClick={toForm} className="back-button">Back</div>
            <div className="audio-player app-player__body" >
           
            {
                loadStatus === 'loading' && 
                <div className="audio-player__loading loading-animation">
                    <span className="loading-animation__flash"></span>
                </div>
            }
            {
                loadStatus === 'error' ? <Error message="Ошибка загрузки media" /> :
                <div className="audio-player__controls">
                <div className="audio-player__buttons">
                    { playStatus === 'pause' ?
                       <button disabled={loadStatus !== 'loaded'} onClick={() => audioElement.current.play()}
                                 className="audio-player__button audio-player__play"></button> :
                       <button onClick={() => audioElement.current.pause()}
                                className="audio-player__button audio-player__pause"></button> 
                    } 
                </div>
                <div className="audio-player__progress">
                    {   <RangeSlider className="range-slider__progress"
                                        min={0} max={100}
                                        thumbsDisabled={[true, false]}
                                        rangeSlideDisabled={true}
                                        onInput={([,v]) => progressChange(v)}
                                        step={1}
                                        value={[0, progress]} />
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
                                        onInput={([,v]) => volumeChange(v)}
                                        value={[0, volume]}   
                        />
                    }
                    </div>
                </div>
            </div>
            }

                <audio ref={audioElement} src={url} playsInline autoPlay  />
            </div>
        </div>
    )
}


