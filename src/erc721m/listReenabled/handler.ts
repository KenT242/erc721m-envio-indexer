import { createListReenabledEvent } from "./actions/createListReenabledEvent";
import { updateList } from "./actions/updateList";
import { updateMintListSummary } from "./actions/updateMintListSummary";
import { nftListReenabledContext, nftListReenabledEventLog } from "./constants";

export function nftListReenabledHandler({
  event,
  context,
}: {
  event: nftListReenabledEventLog;
  context: nftListReenabledContext;
}) {
  const summary = updateMintListSummary(event, context);

  const listReenabledEvent = createListReenabledEvent({ event });

  const list = updateList({ event, context });

  context.NftSummary.set(summary);

  context.CustomMintReenabled.set(listReenabledEvent);

  context.List.set(list);
}
