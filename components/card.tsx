import React from 'react';
import '@styles/card.css'; // Import the CSS file

const CardComponent = ({ card, compact, onClick, transform = null }) => {
  function getRarityColor(rarity) {
    switch (rarity) {
      case 'common':
        return '#E0E0E0'; // White
      case 'uncommon':
        return '#00FF00'; // Green
      case 'rare':
        return '#0000FF'; // Blue
      case 'epic':
        return '#800080'; // Purple
      case 'legendary':
        return '#FFD700'; // Yellow (Gold)
      default:
        return '#CCCCCC'; // Fallback color
    }
  }

  const cardStyle = {
    transform: transform || 'none',
    transformOrigin: 'top left',
  };

  if (compact) {
    return (
      <div className="compact-card-container" onClick={onClick} style={cardStyle}>
        <div
          className="compact-card-rarity"
          style={{ backgroundColor: getRarityColor(card.rarity) }}
        ></div>
        <div className="compact-card-name">{card.name}</div>
        <div className="compact-card-cost">{card.cost}</div>
      </div>
    );
  }

  return (
    <div className="card-container" onClick={onClick} style={cardStyle}>
      {/* Card Rarity */}
      <div
        className="card-rarity"
        style={{ backgroundColor: getRarityColor(card.rarity) }}
      ></div>

      {/* Card Cost */}
      <div className="card-cost">{card.cost}</div>

      {/* Image Placeholder */}
      <div className="card-image-placeholder">Image</div>

      {/* Card Name */}
      <div className="card-name">{card.name}</div>

      {/* Card Description */}
      <div className="card-description">{card.description}</div>

      {card.element && (
        <img
          className="card-element-icon"
          src={`/images/element-${card.element}.png`}
          alt={`${card.element} element`}
        />
      )}
    </div>
  );
};

export default CardComponent;
