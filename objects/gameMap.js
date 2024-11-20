import next from 'next';

class Node {
  constructor(id, x, y, type, instanceContainer = null) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.connections = []; // IDs of connected nodes
    this.type = type;
    this.instanceContainer = null;
  }

  connectTo(node) {
    this.connections.push(node.id);
  }
}

const totalNodes = 9;
const totalHeight = totalNodes * 100 + 50;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomOffsetY = () => getRandomInt(-10, 10); // Slight variance in node positions
const getRandomOffsetX = () => getRandomInt(-60, 60);

// Function to generate starter nodes
function generateStarterNodes() {
  const starterNodes = [];
  const numberOfStarters = Math.floor(Math.random() * 2) + 3; // Randomly choose between 3 and 4 starter nodes

  const spacing = 800 / numberOfStarters;

  for (let i = 0; i < numberOfStarters; i++) {
    const x = spacing / 2 + i * spacing + getRandomOffsetX(); // Space the nodes horizontally
    const y = totalHeight + getRandomOffsetY(); // Place all nodes at the same y-level
    const node = new Node(i, x, y, 'combat');
    starterNodes.push(node);
  }

  return starterNodes;
}

// Function to generate the next set of nodes
function generateNextNodes(currentNodes, nextRowIndex) {
  const nextNodes = [];
  let nodeType = [];
  let numberOfNextNodes = 2;
  if (nextRowIndex != 0 && nextRowIndex % 4 == 0) {
    numberOfNextNodes = Math.floor(Math.random() * 2) + 2;
    nodeType = getNodeTypeArr(numberOfNextNodes, 'rest');
  } else {
    numberOfNextNodes = Math.floor(Math.random() * 2) + 3; // Randomly choose between 3 and 4 nodes
    nodeType = getNodeTypeArr(numberOfNextNodes);
  }

  const spacing = (totalNodes * 100) / numberOfNextNodes;

  for (let i = 0; i < numberOfNextNodes; i++) {
    const x = spacing / 2 + i * spacing + getRandomOffsetX(); // Space the nodes horizontally
    const y = totalHeight - nextRowIndex * 100 + getRandomOffsetY(); // Position the nodes vertically based on the row index
    const node = new Node(nextRowIndex * 10 + i, x, y, nodeType[i]);
    nextNodes.push(node);
  }

  connectNodes(currentNodes, nextNodes);
  return nextNodes;
}

function generateBossNode(currentNodes, nextRowIndex) {
  const bossNode = [
    new Node(
      nextRowIndex * 10,
      400,
      totalHeight - nextRowIndex * 100 + getRandomOffsetY(),
      'combat-boss'
    ),
  ];

  for (let i = 0; i < currentNodes.length; i++) {
    currentNodes[i].connectTo(bossNode[0]);
  }
  return bossNode;
}

function connectChance(currentNodeConnections, nextRowLen) {
  // Base chance of connecting
  let baseChance = 0.8;

  // Calculate the reduced chance based on the number of connections
  for (let i = 0; i < currentNodeConnections; i++) {
    baseChance *= 0.75; // Reduce chance by 50% for each connection
  }

  // If the number of connections reaches the length of next row - 1, set chance to 0
  if (currentNodeConnections >= nextRowLen - 1) {
    baseChance = 0.0;
  }

  // Return the final chance as a decimal between 0 and 1
  return baseChance;
}

// Function to handle the connection logic
function connectNodes(currentNodes, nextNodes) {
  let lastConnectedNodeIndex = 0;
  for (let i = 0; i < currentNodes.length; i++) {
    const currentNode = currentNodes[i];
    if (lastConnectedNodeIndex == nextNodes.length - 1) {
      currentNode.connectTo(nextNodes[lastConnectedNodeIndex]);
      continue;
    }

    // console.log('LENGTH OF NEXT NODES ' + nextNodes.length);

    for (let j = lastConnectedNodeIndex; j < nextNodes.length; j++) {
      if (i == 0 && j == 0) {
        currentNode.connectTo(nextNodes[j]);
        continue;
      }
      if (i == 0 && j >= nextNodes.length - 1) {
        break;
      }
      if (i == currentNodes.length - 1) {
        currentNode.connectTo(nextNodes[j]);
        continue;
      }

      let connValue = Math.random();
      let connChance = connectChance(
        currentNode.connections.length,
        nextNodes.length
      );

      if (connChance >= connValue) {
        currentNode.connectTo(nextNodes[j]);
        lastConnectedNodeIndex = j;
      } else {
        if (currentNode.connections.length == 0 && j > lastConnectedNodeIndex) {
          currentNode.connectTo(nextNodes[lastConnectedNodeIndex]);
        } else if (j == lastConnectedNodeIndex) {
          continue;
        }
        break;
      }
    }
  }
}

// Updated function to generate the entire map structure
export function generateMap() {
  const allNodes = [];
  const starterNodes = generateStarterNodes();
  allNodes.push(...starterNodes);

  let currentNodes = starterNodes;

  // Generate additional rows of nodes and connect them
  let i = 1;
  for (i; i < totalNodes; i++) {
    // Example with 4 additional rows
    const nextNodes = generateNextNodes(currentNodes, i);
    allNodes.push(...nextNodes);
    currentNodes = nextNodes; // Move to the next set of nodes
  }

  // console.log('CURRENT NODES', currentNodes);

  const bossNode = generateBossNode(currentNodes, i);

  allNodes.push(...bossNode);

  return allNodes; // Return all nodes in the map
}

function getNodeTypeArr(numberOfNodes, type = null) {
  const nodeTypes = [];

  const weightedTypes = [
    { type: 'combat', weight: 0.7 },
    { type: 'event', weight: 0.2 },
    { type: 'treasure', weight: 0.1 },
  ];

  const getRandomType = () => {
    const randomValue = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < weightedTypes.length; i++) {
      cumulativeWeight += weightedTypes[i].weight;
      if (randomValue <= cumulativeWeight) {
        return weightedTypes[i].type;
      }
    }
  };

  for (let i = 0; i < numberOfNodes; i++) {
    if (type) {
      nodeTypes.push(type);
    } else {
      const randomType = getRandomType();
      nodeTypes.push(randomType);
    }
  }

  return nodeTypes;
}
