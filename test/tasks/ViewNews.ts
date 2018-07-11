import { Task } from '@serenity-js/core/lib/screenplay';
import { Get } from '@serenity-js/rest';

export const ViewNews = ({
    about: (tickerSymbol: string) => Task.where(`#actor views news about ${ tickerSymbol }`,
        Get.resource(`/stock/${ tickerSymbol }/news`)
    )
});
