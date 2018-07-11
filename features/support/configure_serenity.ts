import { serenity } from '@serenity-js/core';
import { serenityBDDReporter } from '@serenity-js/core/lib/reporting';

export = function() {

    /**
     * Registers the Serenity/JS Cucumber test listener
     * This could also be done as part of cucumber cli invocation, but keeping it together with the rest of Serenity/JS
     * config is a bit cleaner.
     */
    require('@serenity-js/cucumber/register').apply(this);

    serenity.configure({
        crew: [
            serenityBDDReporter(),
        ],
    });

}
