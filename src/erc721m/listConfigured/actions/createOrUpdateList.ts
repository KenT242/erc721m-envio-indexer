import { ListEntity } from "generated";
import {
  nftListConfiguredContext,
  nftListConfiguredEventLog,
} from "../constants";
import { getListId } from "../utils";
import { getCollectionId } from "../../utils";
import { INITIAL_LIST } from "../../transfer/constants";

export function createOrUpdateList({
  event,
  context,
}: {
  event: nftListConfiguredEventLog;
  context: nftListConfiguredContext;
}): ListEntity {
  const listId = getListId(event);
  const list = context.List.get(listId);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const currentListEntity =
    list && !list.deleted
      ? list
      : {
          ...INITIAL_LIST,
          id: listId,
          listId: BigInt(event.params.listId),
          chain: BigInt(event.chainId),
          collection_id: getCollectionId(event),
          createdAt: currentTime,
          createdBlock: currentBlock,
        };

  const nextListEntity: ListEntity = {
    ...currentListEntity,
    merkleRoot: event.params.merkleRoot,
    supply: BigInt(event.params.amount),
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return nextListEntity;
}
