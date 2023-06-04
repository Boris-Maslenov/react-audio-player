import './form.scss';
import React from 'react';
import {useEffect, useState} from 'react';

export const Form = () => {
    return (
        <div className="start-form">                      
        <div className="start-form__action-text">Insert the link</div>
            <form action="" className="get-audio get-audio_message">
                <div className="get-audio__inner">                             
                        <label className="input-wrap">
                            <span className="get-audio__wrong-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8V12" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="16" r="0.5" fill="black" stroke="#C6A827"/>
                                </svg>
                            </span>
                            <input className="get-audio__input" name="url-input" type="text" placeholder="https://" required />
                        </label>
                    <button className="get-audio__submit" type="submit"></button>
                </div>  
                <span className="get-audio__message">Error message here</span>                              
            </form>
        </div>
    )
}