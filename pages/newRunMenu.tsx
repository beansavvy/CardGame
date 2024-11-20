import { useGameContext } from '@context/GameContext';
import Card from '@objects/card';
import CardComponent from '@components/card';

const NewRunMenu = () => {
  const {
    db,
    currDeck,
    addCardToDeck,
    removeCardFromDeck,
    gameState,
    setNewGameState,
  } = useGameContext();

  const currCards = db.cards.filter((card) => card.inDeck < 2);

  // console.log('GETTING NEW RUN MENU CARDS!!!! ', currCards, currDeck);

  const goBack = () => {
    setNewGameState('town');
    return;
  };

  const goForward = () => {
    console.log(currCards);
  };

  return (
    <div className="new-run-menu-wrapper">
      <div className="new-run-menu-content-wrapper">
        <div className="new-run-menu-card-gallery-container">
          <div className="new-run-menu-card-gallery-header">Known Cards</div>
          <div className="new-run-menu-card-gallery-scrollable">
            <div className="new-run-menu-card-gallery">
              {currCards.map((card) => (
                <div key={card.id} className="new-run-menu-card-gallery-card">
                  <CardComponent
                    card={card}
                    onClick={() => addCardToDeck(card.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="new-run-menu-compact-deck-container">
          <div className="new-run-menu-compact-deck-header">Deck</div>
          <div className="new-run-menu-compact-deck-scrollable">
            <table className="new-run-menu-menu-compact-deck">
              {currDeck != null &&
                currDeck.map((card, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      <td key={index}>
                        <div style={{ padding: '10px' }}>
                          <CardComponent
                            card={card}
                            compact={true}
                            onClick={() => removeCardFromDeck(card.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
      <div className="new-run-menu-bottom-nav">
        <div style={{ textAlign: 'left' }}>
          <button className="nav-bar-btn" onClick={() => goBack()}>
            Back
          </button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            className="nav-bar-btn"
            disabled={currDeck.length < 12}
            title={
              currDeck.length < 12 ? 'Must have 12 cards in your deck' : ''
            }
            style={{
              cursor: currDeck.length < 12 ? 'not-allowed' : 'pointer',
            }}
            onClick={() => goForward()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRunMenu;

{
  /* <table className="new-run-menu-card-gallery-table">
            {currCards.map((card, index) => {
              console.log(currCards);
              if (index % 3 === 0) {
                return (
                  <tr key={`row-${index}`}>
                    <td key={index}>
                      <div style={{ padding: '10px' }}>
                        <CardComponent
                          card={card}
                          onClick={() => addCardToDeck(db.cards[index].id)}
                        />
                      </div>
                    </td>
                    {index + 1 < db.cards.length && db.cards[index + 1] && (
                      <td key={index + 1}>
                        <div style={{ padding: '10px' }}>
                          <CardComponent
                            card={db.cards[index + 1]}
                            onClick={() =>
                              addCardToDeck(db.cards[index + 1].id)
                            }
                          />
                        </div>
                      </td>
                    )}
                    {index + 2 < db.cards.length && db.cards[index + 2] && (
                      <td key={index + 2}>
                        <div style={{ padding: '10px' }}>
                          <CardComponent
                            card={db.cards[index + 2]}
                            onClick={() =>
                              addCardToDeck(db.cards[index + 2].id)
                            }
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              }
            })}
          </table> */
}
