import { expect } from './expect';

export const every = <T = any>(assertion: (record: T) => void) => (actual: PromiseLike<T[]>) => actual.then(records => {
    records.map(assertion)
});
