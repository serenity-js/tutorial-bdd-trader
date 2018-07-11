import { See } from '@serenity-js/core/lib/screenplay';

import { ViewNews } from '../../test/tasks';
import { expect } from '../../test/expect'
import { LastResponseData } from '../../test/questions';
import { every } from '../../test/assertions';
import { NewsItem } from '../../api';

export = function() {

    this.Given(/^(.*) (?:is interested in|wants to know about) (.*)/, function (traderName: string, topic: string) {
        return this.stage.theActorCalled(traderName).attemptsTo(
            // ... no-op, test api doesn't allow for preferences to be persisted, so we're ignoring the topic
        );
    });

    this.When(/^(?:he|she|they) views the news about (.*)/, function (tickerSymbol: string) {
        return this.stage.theActorInTheSpotlight().attemptsTo(
            ViewNews.about(tickerSymbol)
        );
    });

    this.Then(/^(?:he|she|they) should only see articles related to (.*)/, function(tickerSymbol: string) {
        return this.stage.theActorInTheSpotlight().attemptsTo(
            See.if(
                LastResponseData(),
                every<NewsItem>(record => expect(record.related, record.headline).to.have.string(tickerSymbol))
            ),
        );
    });
}
