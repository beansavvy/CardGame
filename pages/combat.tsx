import { useGameContext } from '@context/GameContext';
import React from 'react';
import '@styles/combatStyles.css';
import '@components/card';
import CombatDeck from '@subpages/combatDeck';
import '@subpages/combatCharacters';
import '@subpages/combatMenu';
// import '@styles/card.css';

const CombatPage = () => {
  const { db } = useGameContext();

  return (
    <div className="combat-page">
      {/* Menu Section */}
      <div className="menu-section">
        <h1>Menu</h1>
        {/* Add menu items here */}
      </div>

      {/* Characters Section */}
      <div className="characters-section">
        <h2>Characters</h2>
        {/* Display player and enemy characters here */}
      </div>

      {/* Player's Cards Section */}
      <div className="cards-section">
        <CombatDeck />
        {}
      </div>
    </div>
  );
};

export default CombatPage;
