import { getCollectionId } from "../utils";
import {
  nftListConfiguredEventLog,
  nftListConfiguredLoaderContext,
} from "./constants";
import { getListId } from "./utils";

export function nftListConfiguredLoader({
  event,
  context,
}: {
  event: nftListConfiguredEventLog;
  context: nftListConfiguredLoaderContext;
}) {
  const id = getCollectionId(event);
  const listId = getListId(event);

  context.NftSummary.load(id);

  context.List.load(listId, {});
}
