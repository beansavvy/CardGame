'use client';

import React, { useState, useRef } from 'react';
import { useGameContext } from '@context/GameContext'; // Adjust the import path accordingly

const StartMenu = () => {
  const [isTestMode, setIsTestMode] = useState(true);
  const { setNewGameState, db } = useGameContext();

  // console.log('TESTING DB', db);

  const handleBypass = () => {
    setNewGameState('Town');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* <h1 className="text-4xl font-bold mb-4">Welcome to the RPG</h1> */}
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setNewGameState('Town')}
          // className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play Game
        </button>
        {isTestMode ? (
          <button
            onClick={handleBypass}
            // className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Bypass steps
          </button>
        ) : (
          <button
            onClick={() => console.log('Load existing character')}
            // className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Load existing character
          </button>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="testModeToggle" className="mr-2">
          Test Mode:
        </label>
        <input
          id="testModeToggle"
          type="checkbox"
          checked={isTestMode}
          onChange={() => setIsTestMode(!isTestMode)}
        />
      </div>
    </div>
  );
};

export default StartMenu;
