import './form.scss';
import React from 'react';
import {useState, useContext} from 'react';
import { PlayerContext } from '../../context/player/playerContext';

export const Form = () => {
    const {setUrl, toAudioplayer, addHistory, history} = useContext(PlayerContext);
    const [link, setLink] = useState('');
    const [displayWrong, setDisplayWrong] = useState(false);
    const urlCheck = (url) => {
        const regExp = /^(http|https):\/\/.{5,}/g;
        const match = regExp.test(url.trim());
        setDisplayWrong(!match);
        if(match){
            setUrl(url);
            addToHistory(url); // Optional
            toAudioplayer();
        } 
    }

    const addToHistory = (url) => {
        if(!history.includes(url)){
            addHistory(url); 
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        urlCheck(link);
    }
    const handleInput = (e) => {
       setLink(e.target.value);
       if(displayWrong){
            setDisplayWrong(false);
       }
    }
    return (
        <div className="start-form">                      
        <div className="start-form__action-text">Insert the link</div>
            <form onSubmit={handleSubmit} action='' className="get-audio">
                <div className="get-audio__inner">                             
                        <label className="input-wrap">
                        {
                            displayWrong &&
                                <span className="get-audio__wrong-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 8V12" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="12" cy="16" r="0.5" fill="black" stroke="#C6A827"/>
                                    </svg>
                                </span> 
                        }   
                            <input value={link} onChange={handleInput} className={displayWrong ? 'get-audio__input  get-audio__input_wrong' : 'get-audio__input'} name="url-input" type="text" placeholder="https://" required />
                        </label>
                    <button className="get-audio__submit" type="submit"></button>
                </div>  
                { displayWrong &&
                  <span className="get-audio__message">Error message here</span>   
                }                                          
            </form>
        </div>
    )
}