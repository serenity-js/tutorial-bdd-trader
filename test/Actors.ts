import { Actor, TakeNotes } from '@serenity-js/core/lib/screenplay';
import { Cast } from '@serenity-js/core/lib/stage';
import { CallAnApi } from '@serenity-js/rest';

export class Actors implements Cast {
    actor(name: string): Actor {
        return Actor.named(name).whoCan(
            CallAnApi.at(`https://bdd-trader-cheerful-wildebeest.cfapps.io/api`),
            TakeNotes.usingAnEmptyNotepad(),
        );
    }
}
