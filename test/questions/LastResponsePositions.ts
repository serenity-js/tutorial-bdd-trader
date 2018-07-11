import { Question } from '@serenity-js/core/lib/screenplay';
import { LastResponseData } from './LastResponseData';
import { Position } from '../../api';

export const LastResponsePositions = (): Question<PromiseLike<Array<Partial<Position>>>> =>
    LastResponseData<Array<Partial<Position>>>((data: { [securityCode: string]: Position }) =>
        Object.values(data).map((v: any) => ({ securityCode: v.securityCode, amount: v.amount }))
    );
