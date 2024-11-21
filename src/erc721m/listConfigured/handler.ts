import { createListConfiguredEvent } from "./actions/createListConfiguredEvent";
import { createOrUpdateList } from "./actions/createOrUpdateList";
import { updateMintListSummary } from "./actions/updateMintListSummary";
import {
  nftListConfiguredContext,
  nftListConfiguredEventLog,
} from "./constants";

export function nftListConfiguredHandler({
  event,
  context,
}: {
  event: nftListConfiguredEventLog;
  context: nftListConfiguredContext;
}) {
  const summary = updateMintListSummary(event, context);

  const listConfiguredEvent = createListConfiguredEvent({ event });

  const list = createOrUpdateList({ event, context });

  context.NftSummary.set(summary);

  context.CustomMintConfigured.set(listConfiguredEvent);

  context.List.set(list);
}
