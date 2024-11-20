import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useGameContext } from '@context/GameContext';
import '@styles/mapStyles.css';

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[]; // IDs of connected nodes
  type: String;
}

const GameMap = () => {
  const { map, setNewMap, currNode, updateCurrNode, setNewGameState } =
    useGameContext(); // Get the map from the GameContext
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectableNodes, setSelectableNodes] = useState<number[]>([]);
  const [staticLines, setStaticLines] = useState<JSX.Element[]>([]); // State to store static lines

  const calcHeight = Math.max(...nodes.map((node) => node.y)) + 50; // Calculate max height

  useEffect(() => {
    if (map) {
      setNodes(map); // Set the map nodes from the context
      generateStaticLines(map); // Generate the static lines when the map is set
    }
  }, [map]);

  useEffect(() => {
    if (currNode) {
      setSelectableNodes(currNode.connections);
    } else {
      setSelectableNodes([0, 1, 2, 3, 4]);
    }
  }, [currNode, map]);

  const generateCurvedPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Add randomness to the control points for the curve
    const controlPointOffsetX = (Math.random() - 0.5) * 20;
    const controlPointOffsetY = (Math.random() - 0.5) * 20;

    const controlPointX = midX + controlPointOffsetX;
    const controlPointY = midY + controlPointOffsetY;

    return `M ${x1},${y1} Q ${controlPointX},${controlPointY} ${x2},${y2}`;
  };

  const generateStaticLines = (mapNodes: Node[]) => {
    const lines = mapNodes.flatMap((node) =>
      node.connections.map((targetId) => {
        const targetNode = mapNodes.find((n) => n.id === targetId);
        if (!targetNode) return null;

        const pathData = generateCurvedPath(
          node.x,
          node.y,
          targetNode.x,
          targetNode.y
        );

        return (
          <path
            key={`${node.id}-${targetId}`}
            d={pathData}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      })
    );
    setStaticLines(lines.filter(Boolean) as JSX.Element[]);
  };

  const handleCircleClick = (node: Node) => {
    // Handle what happens when a circle is clicked
    console.log(`Node ${node.id} clicked`);
    updateCurrNode(node);
    setNewGameState('Combat');
    // You can perform any other action here, like updating the game state
  };

  return (
    <svg width="100%" height={`${calcHeight}`} style={{ overflow: 'visible' }}>
      {/* Render static lines */}
      {staticLines}

      {/* Render circles and buttons that update every reload */}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="15"
            fill="blue"
            onClick={
              selectableNodes.indexOf(node.id) !== -1
                ? () => handleCircleClick(node)
                : undefined
            }
            className={selectableNodes.indexOf(node.id) !== -1 ? 'pulsing' : ''} // Add pulsing class conditionally
            style={{
              cursor:
                selectableNodes.indexOf(node.id) !== -1 ? 'pointer' : 'default',
            }}
          />
          <text
            x={node.x}
            y={node.y}
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            dy=".3em"
            onClick={
              selectableNodes.indexOf(node.id) !== -1
                ? () => handleCircleClick(node)
                : undefined
            }
            style={{
              cursor:
                selectableNodes.indexOf(node.id) !== -1 ? 'pointer' : 'default',
            }}
          >
            {node.id + ' - ' + node.type}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default GameMap;
