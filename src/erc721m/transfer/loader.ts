import { getCollectionId } from "../utils";
import { nftTransferEventLog, nftTransferLoaderContext } from "./constants";
import { getTokenId } from "./utils";

export function nftTransferLoader({
  event,
  context,
}: {
  event: nftTransferEventLog;
  context: nftTransferLoaderContext;
}) {
  const id = getCollectionId(event);
  context.NftSummary.load(id);

  const tokenId = getTokenId(event);
  context.Token.load(tokenId, {});

  context.User.load(event.params.from);
  context.User.load(event.params.to);
}
