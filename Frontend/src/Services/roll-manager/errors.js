/**
 * error class that models the RollManager data being invalid
 */
export class InvalidRollManagerDataError extends Error {}

/**
 * error class that models the Roll Manager settings being invalid
 */
export class InvalidRollManagerSettingsError extends Error {}

/**
 * error class that models the Roll Manager state being invalid
 */
export class InvalidRollManagerStateError extends Error {}

/**
 * error class for when we try to roll the dice and we have no rolls left allowed
 */
export class NoRollsLeftError extends Error {}

/**
 * error class for when we try to select/unselect a die that has never been rolled
 */
export class UnrolledDiceError extends Error {}

/**
 * error class for when we try to operate on a die that does not exist in the given Roll Manager data.
 */
export class UnknownDieError extends Error {}

/**
 * error class for whe the setting numberOfDice is more than the limit.
 */
export class NumberOfDiceExceeded extends InvalidRollManagerSettingsError {}

/**
 * error class for whe the setting numberOfDice is less than the limit.
 */
export class NumberOfDiceInsufficient extends InvalidRollManagerSettingsError {}
/**
 * error class for whe the setting numberOfExtraDice is more than the limit.
 */
export class NumberOfExtraDiceExceeded extends InvalidRollManagerSettingsError {}

/**
 * error class for whe the setting numberOfExtraDice is less than the limit.
 */
export class NumberOfExtraDiceInsufficient extends InvalidRollManagerSettingsError {}
