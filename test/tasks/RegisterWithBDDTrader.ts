import { See, TakeNote, Task } from '@serenity-js/core/lib/screenplay';
import { Post } from '@serenity-js/rest';

import { Client } from '../../api';
import { LastResponseData, LastResponseStatusCode } from '../questions';
import { expect } from '../expect';

export const RegisterWithBDDTrader = ({
    asNewClient: (client: Client) => Task.where(`#actor registers as new client`,
        Post.item(client).on(`/client`),
        See.if(LastResponseStatusCode(), status => expect(status).to.eventually.equal(200)),
        TakeNote.of(LastResponseData((createdRecord: Client) => createdRecord.id)).as('clientId'),
    ),
});
