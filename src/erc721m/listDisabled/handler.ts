import { createListDisabledEvent } from "./actions/createListDisabledEvent";
import { updateList } from "./actions/updateList";
import { updateMintListSummary } from "./actions/updateMintListSummary";
import { nftListDisabledContext, nftListDisabledEventLog } from "./constants";

export function nftListDisabledHandler({
  event,
  context,
}: {
  event: nftListDisabledEventLog;
  context: nftListDisabledContext;
}) {
  const summary = updateMintListSummary(event, context);

  const listDisabledEvent = createListDisabledEvent({ event });

  const list = updateList({ event, context });

  context.NftSummary.set(summary);

  context.CustomMintDisabled.set(listDisabledEvent);

  context.List.set(list);
}
