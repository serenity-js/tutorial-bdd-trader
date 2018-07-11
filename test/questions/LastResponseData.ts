import { Question } from '@serenity-js/core/lib/screenplay';
import { CallAnApi } from '@serenity-js/rest';

const noop = v => v;

export const LastResponseData = <T>(mapper: (data: any) => T = noop): Question<PromiseLike<T>> =>
    Question.about<PromiseLike<T>>(`last response data`, actor => {
        return actor.abilityTo(CallAnApi).getLastResponse().then(response => mapper(response.data));
    });
