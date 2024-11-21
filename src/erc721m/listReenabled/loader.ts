import { getCollectionId } from "../utils";
import {
  nftListReenabledEventLog,
  nftListReenabledLoaderContext,
} from "./constants";
import { getListId } from "./utils";

export function nftListReenabledLoader({
  event,
  context,
}: {
  event: nftListReenabledEventLog;
  context: nftListReenabledLoaderContext;
}) {
  const id = getCollectionId(event);
  const listId = getListId(event);

  context.NftSummary.load(id);

  context.List.load(listId, {});
}
