import { createListRepricedEvent } from "./actions/createListRepricedEvent";
import { updateList } from "./actions/updateList";
import { updateMintListSummary } from "./actions/updateMintListSummary";
import { nftListRepricedContext, nftListRepricedEventLog } from "./constants";

export function nftListRepricedHandler({
  event,
  context,
}: {
  event: nftListRepricedEventLog;
  context: nftListRepricedContext;
}) {
  const summary = updateMintListSummary(event, context);

  const listRepricedEvent = createListRepricedEvent({ event });

  const list = updateList({ event, context });

  context.NftSummary.set(summary);

  context.CustomMintRepriced.set(listRepricedEvent);

  context.List.set(list);
}
