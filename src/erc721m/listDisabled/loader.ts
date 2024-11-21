import { getCollectionId } from "../utils";
import {
  nftListDisabledEventLog,
  nftListDisabledLoaderContext,
} from "./constants";
import { getListId } from "./utils";

export function nftListDisabledLoader({
  event,
  context,
}: {
  event: nftListDisabledEventLog;
  context: nftListDisabledLoaderContext;
}) {
  const id = getCollectionId(event);
  const listId = getListId(event);

  context.NftSummary.load(id);

  context.List.load(listId, {});
}
