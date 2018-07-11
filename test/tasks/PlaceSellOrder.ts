import { Actor, Activity, Interaction, Question, TakeNotes, Task } from '@serenity-js/core/lib/screenplay';
import { Post } from '@serenity-js/rest';

import { ClientIdRememberedDuringRegistration } from '../questions';
import { WithPromisedAnswer } from '../interactions';

export const PlaceSellOrder = ({
    for: (quantity: number) => ({
        sharesOf: (tickerSymbol: string) => ({
            at: (price: number) => Task.where(`#actor places a sell order for ${ quantity } shares of ${ tickerSymbol } at $${ price }`,
                WithPromisedAnswer.to(ClientIdRememberedDuringRegistration(), clientId => Post.item({
                    securityCode:   tickerSymbol,
                    type:           'Sell',
                    amount:         quantity,
                    priceInCents:   price * 100,
                }).on(`/portfolio/${ clientId }/order`))
            ),
        }),
    }),
});