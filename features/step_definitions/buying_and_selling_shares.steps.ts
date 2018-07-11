import { See } from '@serenity-js/core/lib/screenplay';
import { Get } from '@serenity-js/rest';
import { TableDefinition } from 'cucumber';

import { PlaceBuyOrder, PlaceSellOrder, RegisterWithBDDTrader } from '../../test/tasks';
import { expect } from '../../test/expect'
import { ClientIdRememberedDuringRegistration, LastResponsePositions } from '../../test/questions';
import { WithPromisedAnswer } from '../../test/interactions';
import { Position } from '../../api';

const numeric = (value: string) => parseInt(value, 10);

export = function() {

    this.Given(/(\w+) (\w+) is a registered trader$/, function(firstName: string, lastName: string) {
        return this.stage.theActorCalled(firstName).attemptsTo(
            RegisterWithBDDTrader.asNewClient({ firstName, lastName }),
        );
    });

    this.When(/^(?:he|she|they) (?:purchases|has purchased) (\d+) (.*) shares at \$(.*) each$/,
        function(quantity: string, tickerSymbol: string, marketPrice: string) {
            return this.stage.theActorInTheSpotlight().attemptsTo(
                PlaceBuyOrder.for(numeric(quantity))
                    .sharesOf(tickerSymbol)
                    .at(numeric(marketPrice)),
            );
        });

    this.When(/^(?:he|she|they) sells? (\d+) (.*) shares for \$(.*) each$/,
        function(quantity: string, tickerSymbol: string, marketPrice: string) {
            return this.stage.theActorInTheSpotlight().attemptsTo(
                PlaceSellOrder.for(numeric(quantity))
                    .sharesOf(tickerSymbol)
                    .at(numeric(marketPrice)),
            );
        });

    this.Then(/^(?:he|she|they) should have the following positions:$/, function(table: TableDefinition) {

        const expectedPositions: Array<Partial<Position>> = table.hashes().map(row => ({
            securityCode: row.securityCode,
            amount: numeric(row.amount),
        }));

        return this.stage.theActorInTheSpotlight().attemptsTo(
            WithPromisedAnswer.to(ClientIdRememberedDuringRegistration(), clientId => Get.resource(`/portfolio/${clientId}/positions`)),
            See.if(
                LastResponsePositions(),
                entries => expect(entries).to.eventually.deep.equal(expectedPositions)),
        );
    });
}
