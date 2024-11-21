import { createListDeletedEvent } from "./actions/createListDeletedEvent";
import { updateList } from "./actions/updateList";
import { updateMintListSummary } from "./actions/updateMintListSummary";
import { nftListDeletedContext, nftListDeletedEventLog } from "./constants";

export function nftListDeletedHandler({
  event,
  context,
}: {
  event: nftListDeletedEventLog;
  context: nftListDeletedContext;
}) {
  const summary = updateMintListSummary(event, context);

  const listDeletedEvent = createListDeletedEvent({ event });

  const list = updateList({ event, context });

  context.NftSummary.set(summary);

  context.CustomMintDeleted.set(listDeletedEvent);

  context.List.set(list);
}
