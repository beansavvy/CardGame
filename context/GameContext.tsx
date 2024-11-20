import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { generateMap } from '@objects/gameMap'; // Import the generateMap function
import Card from '@objects/card';
import { populateDB } from '@data/data';

interface GameContextType {
  db: any;
  enemy: any;
  gameState: any;
  townLocation: any;
  map: any;
  loading: boolean;
  currNode: any | null;
  currDeck: Card[];
  addCardToDeck: (cardId: number) => void;
  removeCardFromDeck: (cardId: number) => void;
  updateCurrNode: (newNode: any) => void;
  setNewGameState: (newState: string) => void;
  setNewTownLocation: (newLocation: string) => void;
  setNewMap: (mapId: number) => void;
  createTestDeck: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // const [state, dispatch] = useReducer(gameReducer, initialState); // Initialize state and dispatch using useReducer
  const [db, setDb] = useState({}); // Initialize db using useState
  const [enemy, setEnemy] = useState();
  const [gameState, setGameState] = useState('GameMap');
  const [currNode, setCurrNode] = useState<any | null>(null);
  const [currDeck, setCurrDeck] = useState<Card[]>([]);
  const [townLocation, setTownLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<any | null>(null); // Initialize map to null

  useEffect(() => {
    const initializeGame = async () => {
      const initializedDb = await populateDB();
      setDb(initializedDb);

      setLoading(false);
    };

    initializeGame();
  }, []);

  const addCardToDeck = (cardId: number) => {
    if (!db.cards) {
      return;
    }

    const selectedCard = db.cards.find((card: Card) => card.id === cardId);

    if (!selectedCard) {
      return;
    }

    const tempCard = db.cards.find((card: Card) => card.id === cardId);
    if (tempCard.inDeck >= 2) {
      return;
    }

    // Add the selected card to the current deck
    setCurrDeck((prevDeck) => [...prevDeck, selectedCard]);

    tempCard.inDeck += 1;
    // console.log(currDeck, db.cards);
  };

  const removeCardFromDeck = (cardId: number) => {
    if (!currDeck) {
      return;
    }

    // Find the index of the card in the current deck
    const cardIndex = currDeck.findIndex((card) => card.id === cardId);

    if (cardIndex === -1) {
      return; // Card not found in the deck
    }
    const tempCard = db.cards.find((card: Card) => card.id === cardId);
    if (tempCard.inDeck == 0) {
      return;
    }

    // Remove the selected card from the current deck
    setCurrDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.splice(cardIndex, 1);
      return newDeck;
    });

    // Update the db to reduce the counter of the 'inDeck' flag by 1, down to 0
    tempCard.inDeck -= 1;
  };

  const updateCurrNode = (newNode: any) => {
    setCurrNode(newNode);
  };

  const setNewGameState = (newState: string) => {
    setGameState(newState);
  };

  const setNewTownLocation = (newLocation: string) => {
    setTownLocation(newLocation);
  };

  const setNewMap = (mapId: number) => {
    setMap(generateMap()); // Generate and set a new map
  };

  const createTestDeck = () => {
    setCurrDeck([db.cards[0], db.cards[0], db.cards[1], db.cards[1], db.cards[2], db.cards[2], db.cards[3], db.cards[3], db.cards[4], db.cards[4], db.cards[5], db.cards[5]]);
  }

  // Provide state, dispatch, and db in the context value
  return (
    <GameContext.Provider
      value={{
        db,
        enemy,
        gameState,
        map,
        loading,
        currNode,
        currDeck,
        townLocation,
        addCardToDeck,
        removeCardFromDeck,
        updateCurrNode,
        setNewGameState,
        setNewTownLocation,
        setNewMap,
        createTestDeck,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext); // Access the context
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider'); // Throw error if context is not found
  }
  return context; // Return the context
};

function logCustomMethods(obj: any) {
  if (!obj) {
    console.log('Object is null or undefined');
    return;
  }

  // Log the type of the object
  console.log(
    'Object Type:',
    obj.constructor ? obj.constructor.name : typeof obj
  );

  let properties = new Set();
  let currentObj = obj;

  // Traverse the prototype chain
  while (currentObj) {
    Object.getOwnPropertyNames(currentObj).forEach((item) =>
      properties.add(item)
    );
    currentObj = Object.getPrototypeOf(currentObj);
  }

  // Filter properties to get only methods
  const methods = Array.from(properties).filter((property) => {
    return (
      typeof obj[property] === 'function' &&
      !Object.prototype.hasOwnProperty.call(Object.prototype, property) &&
      !Object.prototype.hasOwnProperty.call(Array.prototype, property)
    );
  });

  console.log('Custom Methods:', methods);
}

// function populateDB() {}
