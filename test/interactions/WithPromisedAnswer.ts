import { Activity, Actor, Interaction, Question } from '@serenity-js/core/lib/screenplay';

export const WithPromisedAnswer = ({
    to: <T>(question: Question<PromiseLike<T>>, task: (answer: T) => Activity) =>
        Interaction.where(`#actor answers the question about ${ question.toString() }`,
            (actor: Actor) => question.answeredBy(actor).then(v => actor.attemptsTo(task(v))).then(_ => void 0),
        ),
});
