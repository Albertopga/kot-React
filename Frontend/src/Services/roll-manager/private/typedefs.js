/**
 * The data of the RollManager, a combination of settings + state
 * @typedef {{ settings: RollManagerSettings, state: RollManagerState }} RollManagerData
 */

/**
 * The settings of the RollManager
 * @typedef {{ numberOfDice: number, numberOfExtraDice: number, diceRollLimit: number }} RollManagerSettings
 */

/**
 * The state of the RollManager
 * @typedef {{ numberOfRolls: number, dice: DieState[] }} RollManagerState
 */

/**
 * @typedef {{ value: number, isSelected: boolean }} DieState
 */
