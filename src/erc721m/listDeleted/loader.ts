import { getCollectionId } from "../utils";
import {
  nftListDeletedEventLog,
  nftListDeletedLoaderContext,
} from "./constants";
import { getListId } from "./utils";

export function nftListDeletedLoader({
  event,
  context,
}: {
  event: nftListDeletedEventLog;
  context: nftListDeletedLoaderContext;
}) {
  const id = getCollectionId(event);
  const listId = getListId(event);

  context.NftSummary.load(id);

  context.List.load(listId, {});
}
