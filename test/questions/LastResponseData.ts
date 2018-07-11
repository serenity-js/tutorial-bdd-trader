import { Question } from '@serenity-js/core/lib/screenplay';
import { CallAnApi } from '@serenity-js/rest';

export const LastResponseData = () =>
    Question.about<PromiseLike<any>>(`last response data`, actor => {
        return actor.abilityTo(CallAnApi).getLastResponse().then(response => response.data);
    });
