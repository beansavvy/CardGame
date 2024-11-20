'use client';

import { GameProvider, useGameContext } from '@context/GameContext';
import StartMenu from '@pages/startMenu';
import Town from '@pages/town';
import GameMap from '@pages/gameMap';
import LoadingPage from '@pages/loadingPage';
import Combat from '@pages/combat';
import NewRunMenu from '@pages/newRunMenu';
import '../styles/globalStyles.css';

const App = () => {
  return (
    <GameProvider>
      <Page />
    </GameProvider>
  );
};

const Page = () => {
  const { gameState, setNewMap, map, loading } = useGameContext();

  // console.log(gameState);

  if (loading) {
    return <LoadingPage />;
  }
  if (!map) {
    setNewMap(0);
  }

  return (
    <div className="page-container" id="page-container">
      {gameState === 'StartMenu' ? (
        <StartMenu />
      ) : gameState === 'Town' ? (
        <Town />
      ) : gameState === 'GameMap' ? (
        <GameMap />
      ) : gameState === 'Combat' ? (
        <Combat />
      ) : gameState === 'NewRunMenu' ? (
        <NewRunMenu />
      ) : (
        ''
      )}
      {/* Render other components based on gameState */}
    </div>
  );
};

export default App;
