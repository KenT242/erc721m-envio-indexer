import { getCollectionId } from "../utils";
import {
  nftListRepricedEventLog,
  nftListRepricedLoaderContext,
} from "./constants";
import { getListId } from "./utils";

export function nftListRepricedLoader({
  event,
  context,
}: {
  event: nftListRepricedEventLog;
  context: nftListRepricedLoaderContext;
}) {
  const id = getCollectionId(event);
  const listId = getListId(event);

  context.NftSummary.load(id);

  context.List.load(listId, {});
}
