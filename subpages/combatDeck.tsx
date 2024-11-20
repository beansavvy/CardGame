import React, { useState, useEffect, useRef } from 'react';
import { useGameContext } from '@context/GameContext';
import CardComponent from '@components/card';

const CombatDeck = () => {
  const { currDeck, addCardToDeck, removeCardFromDeck, createTestDeck } = useGameContext();
  const [drawPile, setDrawPile] = useState([...currDeck]);
  const [discardPile, setDiscardPile] = useState([]);
  const [hand, setHand] = useState([]);
  const handRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Shuffle the draw pile at the start of the game
    createTestDeck();
    setDrawPile(shuffleArray([...currDeck]));
  }, [currDeck]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const drawCard = () => {
    if (drawPile.length === 0) {
      // If draw pile is empty, reshuffle discard pile into draw pile
      setDrawPile(shuffleArray([...discardPile]));
      setDiscardPile([]);
    }

    if (drawPile.length > 0) {
      const card = drawPile.pop();
      setHand((prevHand) => [...prevHand, card]);
    }
  };

  const endTurn = () => {
    // Move all cards from hand to discard pile at the end of the turn
    setDiscardPile((prevDiscardPile) => [...prevDiscardPile, ...hand]);
    setHand([]);
  };

  return (
    <div className="combat-deck-container">
      <div className="deck-pile draw-pile">
        <div className="pile-count">{drawPile.length}</div>
        <div className="pile-label">Draw Pile</div>
      </div>

      <div className="hand" ref={handRef} style={{ position: 'relative', height: '300px' }}>
        {hand.map((card, index) => {
          const radius = 300; // Increase the radius to position the arc below the hand
          const startAngle = (75 * Math.PI) / 180; // Convert 75 degrees to radians
          const endAngle = (105 * Math.PI) / 180; // Convert 105 degrees to radians
          const angleStep = (endAngle - startAngle) / (hand.length - 1 || 1);
          const angle = startAngle + angleStep * index; // Calculate angle for each card
          const xOffset = -radius * Math.cos(angle); // Calculate x position
          const yOffset = radius * Math.sin(angle) - 100; // Calculate y position

          const transform = `translate(${xOffset}px, ${yOffset}px) rotate(${angle - Math.PI / 2}rad) scale(0.66)`;

          return (
            <CardComponent
              key={index}
              card={card}
              compact={false}
              onClick={() => {}}
              transform={transform}
            />
          );
        })}
      </div>

      <div className="deck-pile discard-pile">
        <div className="pile-count">{discardPile.length}</div>
        <div className="pile-label">Discard Pile</div>
      </div>

      <button onClick={drawCard}>Draw Card</button>
      <button onClick={endTurn}>End Turn</button>
    </div>
  );
};

export default CombatDeck;
