export type Quantity = import('../quantity').Quantity;
/**
 * Class representing the historic state of an openHAB Item.
 * If the Item receives its state from a binding that supports units of measurement, the returned state is in the according base unit, otherwise there is no unit conversion happening.
 * Wrapping the {@link https://www.openhab.org/javadoc/latest/org/openhab/core/persistence/extensions/persistenceextensions PersistenceExtensions}.
 *
 * Be warned: This class can throw several exceptions from the underlying Java layer. It is recommended to wrap the methods of this class inside a try_catch block!
 *
 * @memberOf items
 * @hideconstructor
 */
export class ItemHistory {
    constructor(rawItem: any);
    rawItem: any;
    /**
     * Gets the average value of the state of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    averageBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the average value of the state of a given Item since a certain point in time.
     *
     * @example
     * var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
     * var item = items.getItem('KitchenDimmer');
     * console.log('KitchenDimmer average since yesterday', item.history.averageSince(yesterday));
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    averageSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Checks if the state of a given Item has changed between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {boolean}
     */
    changedBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): boolean;
    /**
     * Checks if the state of a given Item has changed since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {boolean}
     */
    changedSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): boolean;
    /**
     * Gets the number of available historic data points of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {number}
     */
    countBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): number;
    /**
     * Gets the number of available historic data points of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {number}
     */
    countSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): number;
    /**
     * Gets the number of changes in historic data points of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {number}
     */
    countStateChangesBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): number;
    /**
     * Gets the number of changes in historic data points of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {number}
     */
    countStateChangesSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): number;
    /**
     * Gets the difference value of the state of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    deltaBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the difference value of the state of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    deltaSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the standard deviation of the state of the given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    deviationBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the standard deviation of the state of the given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    deviationSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the evolution rate of the state of a given Item since a certain point in time.
     *
     * @deprecated Replaced by evolutionRateSince and evolutionRateBetween.
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    evolutionRate(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the evolution rate of the state of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    evolutionRateBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the evolution rate of the state of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    evolutionRateSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Retrieves the {@link HistoricItems} for for a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {HistoricItem[]}
     */
    getAllStatesBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): HistoricItem[];
    /**
     * Retrieves the {@link HistoricItems} for for a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {HistoricItem[]}
     */
    getAllStatesSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): HistoricItem[];
    /**
     * Retrieves the historic state for a given Item at a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item
     */
    historicState(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Query the last update time of a given Item.
     *
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(time.ZonedDateTime | null)}
     */
    lastUpdate(serviceId?: string, ...args: any[]): (time.ZonedDateTime | null);
    /**
     * Retrieves the historic Item state for a given Item at the current point in time.
     *
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(string | null)} state
     */
    latestState(serviceId?: string, ...args: any[]): (string | null);
    /**
     * Gets the state with the maximum value of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item or null
     */
    maximumBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Gets the state with the maximum value of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item or null
     */
    maximumSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Gets the state with the minimum value of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item or null
     */
    minimumBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Gets the state with the minimum value of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item or null
     */
    minimumSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Persists the state of a given Item.
     *
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     */
    persist(serviceId?: string, ...args: any[]): void;
    /**
     * Returns the previous state of a given Item.
     *
     * @param {boolean} [skipEqual] optional, if true, skips equal state values and searches the first state not equal the current state
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(HistoricItem | null)} historic item or null
     */
    previousState(skipEqual?: boolean, serviceId?: string, ...args: any[]): (HistoricItem | null);
    /**
     * Gets the sum of the states of a given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    sumBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the sum of the states of a given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    sumSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Checks if the state of a given Item has been updated between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {boolean}
     */
    updatedBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): boolean;
    /**
     * Checks if the state of a given Item has been updated since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {boolean}
     */
    updatedSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): boolean;
    /**
     * Gets the variance of the state of the given Item between two certain points in time.
     *
     * @param {(time.ZonedDateTime | Date)} begin begin
     * @param {(time.ZonedDateTime | Date)} end end
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    varianceBetween(begin: (time.ZonedDateTime | Date), end: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
    /**
     * Gets the variance of the state of the given Item since a certain point in time.
     *
     * @param {(time.ZonedDateTime | Date)} timestamp
     * @param {string} [serviceId] Optional persistence service ID, if omitted, the default persistence service will be used.
     * @returns {(number | null)}
     */
    varianceSince(timestamp: (time.ZonedDateTime | Date), serviceId?: string, ...args: any[]): (number | null);
}
/**
 * Class representing an openHAB HistoricItem
 *
 * @memberof items
 * @hideconstructor
 */
export class HistoricItem {
    /**
     * @param {*} rawHistoricItem {@link https://www.openhab.org/javadoc/latest/org/openhab/core/persistence/historicitem org.openhab.core.persistence.HistoricItem}
     */
    constructor(rawHistoricItem: any);
    rawHistoricItem: any;
    /**
     * Raw Java Item state
     * @type {HostState}
     */
    rawState: HostState;
    /**
     * String representation of the Item state.
     * @type {string}
     */
    get state(): string;
    /**
     * Numeric representation of Item state, or `null` if state is not numeric
     * @type {number|null}
     */
    get numericState(): number;
    /**
     * Item state as {@link Quantity} or `null` if state is not Quantity-compatible or Quantity would be unit-less (without unit)
     * @type {Quantity|null}
     */
    get quantityState(): import("../quantity").Quantity;
    /**
     * Timestamp of persisted Item.
     * @type {time.ZonedDateTime}
     */
    get timestamp(): JSJoda.ZonedDateTime;
}
declare namespace time {
    type ZonedDateTime = import('@js-joda/core').ZonedDateTime;
}
import time = require("../time");
export {};
//# sourceMappingURL=item-history.d.ts.map