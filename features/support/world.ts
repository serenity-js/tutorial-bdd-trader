import { serenity } from '@serenity-js/core';
import { Actors } from '../../test/Actors';

export = function() {
    this.World = function() {
        /**
         * The Stage dynamically generates the Actors.
         * We assign it to the World object so that every scenario gets a fresh instance and there's no state leakage.
         *
         * @type {Stage}
         */
        this.stage = serenity.callToStageFor(new Actors());
    };
};
