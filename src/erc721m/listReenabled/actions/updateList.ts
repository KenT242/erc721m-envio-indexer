import { ListEntity } from "generated";
import {
  nftListReenabledContext,
  nftListReenabledEventLog,
} from "../constants";
import { getListId } from "../utils";
import { getCollectionId } from "../../utils";
import { INITIAL_LIST } from "../../transfer/constants";

export function updateList({
  event,
  context,
}: {
  event: nftListReenabledEventLog;
  context: nftListReenabledContext;
}): ListEntity {
  const listId = getListId(event);
  const list = context.List.get(listId);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const currentListEntity = list ?? {
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
    paused: false,
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return nextListEntity;
}
