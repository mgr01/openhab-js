const triggers = require('../triggers');
const operations = require('./operation-builder');
const conditions = require('./condition-builder');

const log = require('../log')('trigger-builder');

class TriggerBuilder {
    constructor(builder) {
        this.builder = builder;
    }

    _setTrigger(trigger) {
        this.currentTigger = trigger;
        return this.currentTigger;
    }

    _or() {
        this.builder.addTrigger(this.currentTigger);
        return this;
    }

    _then(fn) {
        this._or();
        return new operations.OperationBuilder(this.builder, fn);
    }

    _if(fn) {
        this._or();
        return new conditions.ConditionBuilder(this.builder, fn);
    }

    /**
     * Specifies a channel event as a source for the rule to fire.
     * 
     * @memberof fluent
     * @param {String} channelName the name of the channel
     * @returns {ItemTriggerConfig} the trigger config
     */
    channel(s) {
        return this._setTrigger(new ChannelTriggerConfig(s, this));
    }

    /**
     * Specifies a cron schedule for the rule to fire.
     * 
     * @memberof fluent
     * @param {String} cronExpression the cron expression
     * @returns {ItemTriggerConfig} the trigger config
     */
    cron(s) {
        return this._setTrigger(new CronTriggerConfig(s, this));
    }

    /**
     * Specifies an item as the source of changes to trigger a rule.
     * 
     * @memberof fluent
     * @param {String} itemName the name of the item
     * @returns {ItemTriggerConfig} the trigger config
     */
    item(s) {
        return this._setTrigger(new ItemTriggerConfig(s, false, this));
    }

    /**
     * Specifies an group member as the source of changes to trigger a rule.
     * 
     * @memberof fluent
     * @param {String} groupName the name of the group
     * @returns {ItemTriggerConfig} the trigger config
     */
    memberOf(s) {
        return this._setTrigger(new ItemTriggerConfig(s, true, this));
    }

    /**
     * Specifies a Thing status event as a source for the rule to fire.
     * 
     * @memberof fluent
     * @param {String} thingUID the UID of the Thing
     * @returns {ThingTriggerConfig} the trigger config
     */
    thing(s) {
        return this._setTrigger(new ThingTriggerConfig(s, this));
    }

    /**
    * Specifies a period of day for the rule to fire. Note that this functionality depends on a 'vTimeOfDay' String item
    * existing and being updated.
    * 
    * @memberof fluent
    * @param {String} period the period, such as 'SUNSET'
    * @returns {ItemTriggerConfig} the trigger config
    */
    timeOfDay(s) {
        return this._setTrigger(new ItemTriggerConfig('vTimeOfDay', this).changed().to(s));
    }

    /**
     * Specifies a system event as a source for the rule to fire.
     * 
     * @memberof fluent
     * @returns {SystemTriggerConfig} the trigger config
     */
    system() {
        return this._setTrigger(new SystemTriggerConfig(this));
    }
}

class TriggerConf {
    constructor(triggerBuilder) {
        this.triggerBuilder = triggerBuilder;
    }

    or() {
        return this.triggerBuilder._or();
    }

    then(fn) {
        return this.triggerBuilder._then(fn);
    }

    if(fn) {
        return this.triggerBuilder._if(fn)
    }
}

class ChannelTriggerConfig extends TriggerConf {
    constructor(channelName, triggerBuilder) {
        super(triggerBuilder);
        this.channelName = channelName;
        this._toOHTriggers = () => [triggers.ChannelEventTrigger(this.channelName, this.eventName)]
    }

    describe(compact) {
        if (compact) {
            return this.channelName + (this.eventName ? `:${this.eventName}` : "")
        } else {
            return `matches channel "${this.channelName}"` + (this.eventName ? `for event ${this.eventName}` : "")
        }
    }

    to(eventName) {
        return this.triggered(eventName);
    }

    triggered(eventName) {
        this.eventName = eventName || "";
        return this;
    }

    _complete() {
        return typeof (this.eventName) !== 'undefined';
    }
};

class CronTriggerConfig extends TriggerConf {
    constructor(timeStr, triggerBuilder) {
        super(triggerBuilder);
        this.timeStr = timeStr;
        this._complete = () => true
        this._toOHTriggers = () => [triggers.GenericCronTrigger(this.timeStr)]
        this.describe = (compact) => compact ? `cron_${this.timeStr}` : `matches cron "${this.timeStr}"`
    }
};

class ItemTriggerConfig extends TriggerConf {
    constructor(itemOrName, isGroup, triggerBuilder) {
        super(triggerBuilder);
        this.type = isGroup ? 'memberOf' : 'item';
        if (typeof itemOrName !== 'string') {
            itemOrName = itemOrName.name;
        }

        this.item_name = itemOrName;
        this.describe = () => `${this.type} ${this.item_name} changed`
        this.of = this.to; //receivedCommand().of(..)
    }

    to(value) {
        this.to_value = value;
        return this;
    }

    from(value) {
        if (this.op_type != 'changed') {
            throw ".from(..) only available for .changed()";
        }
        this.from_value = value;
        return this;
    }

    toOff() {
        return this.to('OFF');
    }

    toOn() {
        return this.to('ON');
    }

    receivedCommand() {
        this.op_type = 'receivedCommand';
        return this;
    }

    receivedUpdate() {
        this.op_type = 'receivedUpdate';
        return this;
    }

    changed() {
        this.op_type = 'changed';
        return this;
    }

    _complete() {
        return typeof (this.op_type) !== 'undefined';
    }

    describe(compact) {
        switch (this.op_type) {
            case "changed":
                if (compact) {
                    let transition = this.from_value + '=>' || '';
                    if (this.to_value) {
                        transition = (transition || '=>') + this.to_value;
                    }

                    return `${this.item_name} ${transition}/Δ`;
                } else {
                    let transition = 'changed';
                    if (this.from_value) {
                        transition += ` from ${this.from_value}`;
                    }

                    if (this.to_value) {
                        transition += ` to ${this.to_value}`;
                    }

                    return `${this.item_name} ${transition}`;
                }
            case "receivedCommand":
                return compact ? `${this.item_name}/⌘` : `${this.type} ${this.item_name} received command`;
            case "receivedUpdate":
                return compact ? `${this.item_name}/↻` : `${this.type} ${this.item_name} received update`;
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    }

    for(timespan) {
        return new TimingItemStateOperation(this, timespan);
    }

    _toOHTriggers() {
        if (this.type === "memberOf") {
            switch (this.op_type) {
                case "changed":
                    return [triggers.GroupStateChangeTrigger(this.item_name, this.from_value, this.to_value)];
                case 'receivedCommand':
                    return [triggers.GroupCommandTrigger(this.item_name, this.to_value)]
                case 'receivedUpdate':
                    return [triggers.GroupStateUpdateTrigger(this.item_name, this.to_value)]
                default:
                    throw error("Unknown operation type: " + this.op_type);
            }
        } else {
            switch (this.op_type) {
                case "changed":
                    return [triggers.ItemStateChangeTrigger(this.item_name, this.from_value, this.to_value)];
                case 'receivedCommand':
                    return [triggers.ItemCommandTrigger(this.item_name, this.to_value)]
                case 'receivedUpdate':
                    return [triggers.ItemStateUpdateTrigger(this.item_name, this.to_value)]
                default:
                    throw error("Unknown operation type: " + this.op_type);
            }
        }
    }

    _executeHook() {
        const getReceivedCommand = function (args) {
            return args.receivedCommand;
        };

        if (this.op_type === 'receivedCommand') { //add the received command as 'it'
            return function (next, args) {
                let it = getReceivedCommand(args);
                return next({
                    ...args,
                    it
                });
            }
        } else {
            return null;
        }
    }
}

class ThingTriggerConfig extends TriggerConf {
    constructor(thingUID, triggerBuilder) {
        super(triggerBuilder);
        this.thingUID = thingUID;
    }

    _complete() {
        return typeof (this.op_type) !== 'undefined';
    }

    describe(compact) {
        switch (this.op_type) {
            case "changed":
                let transition = 'changed';

                if (this.to_value) {
                    transition += ` to ${this.to_value}`;
                }

                if (this.from_value) {
                    transition += ` from ${this.from_value}`;
                }

                return `${this.thingUID} ${transition}`;
            case "updated":
                return compact ? `${this.thingUID}/updated` : `Thing ${this.thingUID} received update`;
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    }

    changed() {
        this.op_type = 'changed';
        return this;
    }

    updated() {
        this.op_type = 'updated';
        return this;
    }

    from(value) {
        if (this.op_type != 'changed') {
            throw ".from(..) only available for .changed()";
        }
        this.from_value = value;
        return this;
    }

    to(value) {
        this.to_value = value;
        return this;
    }

    _toOHTriggers() {
        switch (this.op_type) {
            case "changed":
                return [triggers.ThingStatusChangeTrigger(this.thingUID, this.to_value, this.from_value)];
            case 'updated':
                return [triggers.ThingStatusUpdateTrigger(this.thingUID, this.to_value)]
            default:
                throw error("Unknown operation type: " + this.op_type);
        }
    }
};

class SystemTriggerConfig extends TriggerConf {
    constructor(triggerBuilder) {
        super(triggerBuilder);
        this._toOHTriggers = () => [triggers.SystemStartlevelTrigger(this.level)]
        this.describe = (compact) => compact ? `system:${this.level}` : `system level "${this.level}"`
    }
    _complete() {
        return typeof (this.level) !== 'undefined';
    }

    rulesLoaded() {
        return this.startLevel(40);
    }

    ruleEngineStarted() {
        return this.startLevel(50);
    }

    userInterfacesStarted() {
        return this.startLevel(70);
    }

    thingsInitialized() {
        return this.startLevel(80);
    }

    startupComplete() {
        return this.startLevel(100);
    }

    startLevel(level) {
        this.level = level;
        return this;
    }
};

module.exports = {
    CronTriggerConfig,
    ChannelTriggerConfig,
    ItemTriggerConfig,
    ThingTriggerConfig,
    SystemTriggerConfig,
    TriggerBuilder
}