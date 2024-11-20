import React, { useState } from 'react';
import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';
import CardGallery from '@pages/cardGallery';

const Town = () => {
  const {
    gameState,
    setNewGameState,
    setNewTownLocation,
    townLocation,
    setNewMap,
  } = useGameContext();

  const [realLoc, setRealLoc] = useState('');

  const locations = [
    {
      name: 'Blacksmith',
      description:
        'Forge powerful items to gain unique buffs for your adventures.',
      action: () => handleEnterTownLocation('blacksmith'),
      style: { top: '40%', left: '85%', transform: 'translate(-50%, -50%)' }, // Positioning example
    },
    {
      name: 'Alchemist’s Lab',
      description:
        'Brew potions that can heal, buff, or protect you in battle.',
      action: () => handleEnterTownLocation('alchemist'),
      style: { top: '25%', left: '20%', transform: 'translate(-50%, -50%)' }, // Positioning example
    },
    {
      name: "Adventurer's Guild",
      description: 'Accept quests and gain rewards.',
      action: () => handleEnterTownLocation('guild'),
      style: { top: '80%', left: '60%', transform: 'translate(-50%, -50%)' }, // Positioning example
    },
    {
      name: 'Trainer’s Dojo',
      description:
        'Train to gain new traits and improve your character’s abilities.',
      action: () => handleEnterTownLocation('trainer'),
      style: { top: '15%', left: '70%', transform: 'translate(-50%, -50%)' }, // Positioning example
    },
    {
      name: 'Marketplace',
      description: 'Trade with merchants for rare items and resources.',
      action: () => handleEnterTownLocation('marketplace'),
      style: { top: '60%', left: '15%', transform: 'translate(-50%, -50%)' }, // Positioning example
    },
    {
      name: 'Portal',
      description:
        'A mysterious portal that marks the beginning of your adventure.',
      action: () => setNewTownLocation('portal'),
      style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, // Centered
    },
  ];

  const handleEnterTownLocation = (location: string) => {
    if (townLocation != location) {
      setNewTownLocation(location);
      return;
    }
    setNewTownLocation('');
  };

  if (townLocation === 'portal') {
    setNewMap(0);
    setNewGameState('NewRunMenu');
  }

  if (townLocation == 'card-gallery') {
  }

  return (
    <div className="town-container">
      <div className="menu-top-bar">
        <button
          className="menu-top-bar-btn"
          onClick={() => handleEnterTownLocation('card-gallery')}
        >
          Cards
        </button>
      </div>
      {townLocation === 'card-gallery' ? (
        <>
          <CardGallery />
        </>
      ) : (
        <div className="town-locations-container">
          {locations.map((location, index) => (
            <div
              className={`town-btn-wrapper town-btn-wrapper-${location.name
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
              style={{ ...location.style, position: 'absolute' }}
            >
              <button className="town-btn" onClick={location.action}>
                {location.name}
              </button>
            </div>
          ))}
        </div>
      )}
      <span
        style={{
          borderTop: 1 + 'px solid black',
          fontWeight: 'bold',
          fontSize: 20 + 'px',
          width: 100 + '%',
          display: 'block',
          textAlign: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        {townLocation != ''
          ? townLocation
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : 'Town'}
      </span>
    </div>
  );
};

export default Town;
