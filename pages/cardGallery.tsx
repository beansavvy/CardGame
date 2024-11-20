import { useGameContext } from '@context/GameContext';
import Card from '@objects/card';
import CardComponent from '@components/card';

const CardGallery = () => {
  const { db } = useGameContext();

  return (
    <div className="card-gallery-container">
      <table className="card-gallery-table">
        {db.cards.map((card, index) => {
          if (index % 3 === 0) {
            return (
              <tr key={`row-${index}`}>
                <td key={index}>
                  <div style={{ padding: '10px' }}>
                    <CardComponent card={card} />
                  </div>
                </td>
                {index + 1 < db.cards.length && db.cards[index + 1] && (
                  <td key={index + 1}>
                    <div style={{ padding: '10px' }}>
                      <CardComponent card={db.cards[index + 1]} />
                    </div>
                  </td>
                )}
                {index + 2 < db.cards.length && db.cards[index + 2] && (
                  <td key={index + 2}>
                    <div style={{ padding: '10px' }}>
                      <CardComponent card={db.cards[index + 2]} />
                    </div>
                  </td>
                )}
              </tr>
            );
          }
          return null;
        })}
      </table>
    </div>
  );
};

export default CardGallery;
