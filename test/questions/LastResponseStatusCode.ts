import { Question } from '@serenity-js/core/lib/screenplay';
import { CallAnApi } from '@serenity-js/rest';

export const LastResponseStatusCode = () =>
    Question.about<PromiseLike<number>>(`last response status code`, actor => {
        return actor.abilityTo(CallAnApi).getLastResponse().then(response => response.status);
    });
