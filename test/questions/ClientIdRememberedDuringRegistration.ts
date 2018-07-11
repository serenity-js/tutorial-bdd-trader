import { Question, TakeNotes } from '@serenity-js/core/lib/screenplay';

export const ClientIdRememberedDuringRegistration = () => Question.about<PromiseLike<string>>(
    `client id remembered during registration`, actor => {
        return TakeNotes.as(actor).read('clientId');
    });
