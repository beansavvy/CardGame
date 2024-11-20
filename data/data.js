import Card from '@objects/card'; // Import the Card class

let idCounter = 0;

export const populateDB = () => {
  const initialGold = 1000;
  const generatedCards = generateCards();

  return {
    gold: initialGold,
    cards: generatedCards,
    enemies: [],
    gear: [],
    talents: [],
    resources: [],
    quests: [],
  };
};

function generateCards() {
  return [
    new Card(
      idCounter++,
      'Firebolt',
      'Deals 12 fire damage to a target.',
      2,
      [
        { effect: 'attack', value: 15, targets: 'enemy', count: 1 },
        {
          effect: 'debuff',
          value: 2,
          type: 'burn',
          targets: 'enemy',
          count: 1,
        },
      ],
      'fire',
      'common'
    ),
    new Card(idCounter++, 'Healing Light', 'Heal yourself for 10.', 1, [
      { effect: 'heal', value: 10, targets: 'self' },
    ]),
    new Card(
      idCounter++,
      'Ice Lance',
      'Deals 8 ice damage to a target and applies 1 stack of chill.',
      2,
      [
        { effect: 'attack', value: 8, targets: 'enemy', count: 1 },
        {
          effect: 'debuff',
          value: 1,
          type: 'chill',
          targets: 'enemy',
          count: 1,
        },
      ],
      'water',
      'common'
    ),
    new Card(
      idCounter++,
      'Strengthen',
      'Apply 1 stack of strength to yourself.',
      1,
      [{ effect: 'buff', value: 1, type: 'strength', targets: 'self' }],
      null,
      'uncommon'
    ),
    new Card(
      idCounter++,
      'Shield Bash',
      'Deals 5 damage and applies a shield of 5 to yourself.',
      2,
      [
        { effect: 'attack', value: 5, targets: 'enemy', count: 1 },
        { effect: 'shield', value: 5, targets: 'self' },
      ],
      null,
      'common'
    ),
    new Card(
      idCounter++,
      'Thunder Strike',
      'Deals 12 lightning damage to all enemies.',
      3,
      [{ effect: 'attack', value: 12, targets: 'enemy', count: 10 }],
      'lightning',
      'rare'
    ),
    new Card(
      idCounter++,
      'Regenerate',
      'Apply 5 stacks of regeneration to yourself for 3 turns.',
      2,
      [{ effect: 'heal', value: 5, targets: 'self', duration: 3 }],
      null,
      'epic'
    ),
    new Card(
      idCounter++,
      'Poison Dart',
      'Deals 3 damage and applies 5 stacks of poison to the target.',
      1,
      [
        { effect: 'attack', value: 3, targets: 'enemy', count: 1 },
        {
          effect: 'debuff',
          value: 5,
          type: 'poison',
          targets: 'enemy',
          count: 1,
        },
      ],
      null,
      'uncommon'
    ),
    new Card(
      idCounter++,
      'Berserk',
      'Gives 1 stack of strength but gives 2 stacks of sundered',
      0,
      [
        { effect: 'buff', value: 1, type: 'strength', targets: 'self' },
        { effect: 'debuff', value: 2, type: 'sunder', targets: 'self' },
      ],
      null,
      'rare'
    ),
    new Card(
      idCounter++,
      'Meteor Shower',
      'Deals 20 fire damage randomly split among all enemies.',
      3,
      [{ effect: 'attack', value: 20, targets: 'enemy', count: 10 }],
      'fire',
      'epic'
    ),
    new Card(
      idCounter++,
      'Divine Shield',
      'Applies a shield of 15 to all allies.',
      3,
      [{ effect: 'shield', value: 15, targets: 'friendly', count: 10 }],
      'holy',
      'rare'
    ),
    new Card(
      idCounter++,
      'Vampiric Touch',
      'Deals 10 damage to a target and heals you for the same amount.',
      2,
      [
        { effect: 'attack', value: 10, targets: 'enemy', count: 1 },
        { effect: 'heal', value: 10, targets: 'self' },
      ],
      'dark',
      'rare'
    ),
    new Card(
      idCounter++,
      'Arcane Blast',
      'Deals 8 arcane damage to a target. Ignores shields.',
      2,
      [
        {
          effect: 'attack',
          value: 8,
          targets: 'enemy',
          count: 1,
          special: 'def-ignore',
        },
      ],
      'arcane',
      'uncommon'
    ),
    new Card(
      idCounter++,
      'Earthquake',
      'Deals 10 damage to all enemies and applies 5 stacks of sundered.',
      3,
      [
        { effect: 'attack', value: 10, targets: 'enemy', count: 10 },
        {
          effect: 'debuff',
          value: 5,
          type: 'sunder',
          targets: 'enemy',
          count: 10,
        },
      ],
      'earth',
      'epic'
    ),
    new Card(
      idCounter++,
      'Mana Drain',
      'Deals 1 damage and restores your energy equal to the damage dealt.',
      0,
      [
        { effect: 'attack', value: 1, targets: 'enemy', count: 1 },
        { effect: 'energy', value: 1, targets: 'self' },
      ],
      null,
      'common'
    ),
    new Card(
      idCounter++,
      'Blizzard',
      'Deals 8 ice damage to all enemies and applies 3 stacks of chilled.',
      3,
      [
        { effect: 'attack', value: 8, targets: 'enemy', count: 10 },
        {
          effect: 'debuff',
          value: 3,
          type: 'chill',
          targets: 'enemy',
          count: 10,
        },
      ],
      'water',
      'epic'
    ),
    new Card(idCounter++, 'Holy Light', 'Heals all allies by 10 HP.', 3, [
      { effect: 'heal', value: 10, targets: 'friendly', count: 10 },
      'holy',
      'rare',
    ]),
    new Card(
      idCounter++,
      'Enrage',
      'Grants 2 stacks of strength but you lose 5 HP.',
      0,
      [
        { effect: 'buff', value: 15, type: 'strength', targets: 'self' },
        { effect: 'attack', value: 5, targets: 'self' },
      ],
      null,
      'rare'
    ),
    new Card(
      idCounter++,
      'Lightning Chain',
      'Deals 5 lightning damage to a target and jumps to 2 more targets, dealing reduced damage.',
      2,
      [
        { effect: 'attack', value: 5, targets: 'enemy', count: 1 },
        { effect: 'attack', value: 3, targets: 'additional-target' },
        { effect: 'attack', value: 2, targets: 'additional-target' },
      ],
      'lightning',
      'uncommon'
    ),
  ];
}
