import { Task } from '@serenity-js/core/lib/screenplay';
import { Post } from '@serenity-js/rest';

import { ClientIdRememberedDuringRegistration } from '../questions';
import { WithPromisedAnswer } from '../interactions';

export const PlaceBuyOrder = ({
    for: (quantity: number) => ({
        sharesOf: (tickerSymbol: string) => ({
            at: (price: number) => Task.where(`#actor places a buy order for ${ quantity } shares of ${ tickerSymbol } at $${ price }`,
                WithPromisedAnswer.to(ClientIdRememberedDuringRegistration(), clientId => Post.item({
                    securityCode:   tickerSymbol,
                    type:           'Buy',
                    amount:         quantity,
                    priceInCents:   price * 100,
                }).on(`/portfolio/${ clientId }/order`))
            ),
        }),
    }),
});