class Card {
  constructor(
    cardId,
    name,
    description,
    cost,
    effects,
    element = null,
    rarity = 'common',
    hidden = false
  ) {
    this.id = cardId;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.effects = effects; // Array of effects, each with { effect, value, targets }
    this.element = element; // Optional, e.g., 'fire', 'water'
    this.unlocked = false;
    this.hidden = hidden;
    this.inDeck = 0;
    this.rarity = rarity;
  }

  unlockCard() {
    this.unlocked = true;
  }

  useCard(user, target) {
    this.effects.forEach((effect) => {
      let targets = this.determineTargets(effect.targets, target);
      targets.forEach((tgt) => {
        switch (effect.effect) {
          case 'attack':
            this.applyAttack(user, tgt, effect);
            break;
          case 'heal':
            this.applyHeal(user, tgt, effect);
            break;
          case 'buff':
            this.applyBuff(user, effect);
            break;
          case 'debuff':
            this.applyDebuff(tgt, effect);
            break;
          case 'shield':
            this.applyShield(tgt, effect);
            break;
          default:
            console.error('Unknown effect type:', effect.effect);
        }
      });
    });
  }

  determineTargets(targetType, passedTarget) {
    // Logic to determine actual targets based on `targetType`
    switch (targetType) {
      case '1-target':
        return [passedTarget];
      case 'all-targets':
        return this.getAllTargets();
      case 'front-target':
        return [this.getFrontTarget()];
      case 'back-target':
        return [this.getBackTarget()];
      default:
        return [];
    }
  }

  getAllTargets() {
    // Placeholder for logic to return all possible targets
    return [
      /* All targets */
    ];
  }

  getFrontTarget() {
    // Placeholder for logic to return the front target
    return {
      /* Front target */
    };
  }

  getBackTarget() {
    // Placeholder for logic to return the back target
    return {
      /* Back target */
    };
  }

  applyAttack(user, target, effect) {
    let damage = effect.value;
    if (this.element && target.weakness === this.element) {
      damage *= 1.5; // Example element-based bonus
    }
    target.hp -= damage;
  }

  applyHeal(user, target, effect) {
    target.hp += effect.value;
  }

  applyBuff(user, effect) {
    user[effect.stat] += effect.value;
  }

  applyDebuff(target, effect) {
    target[effect.stat] -= effect.value;
  }

  applyShield(target, effect) {
    target.shield += effect.value;
  }
}

export default Card;
