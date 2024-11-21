import { ListEntity } from "generated";
import { nftListRepricedContext, nftListRepricedEventLog } from "../constants";
import { getListId } from "../utils";
import { getCollectionId } from "../../utils";
import { INITIAL_LIST } from "../../transfer/constants";

export function updateList({
  event,
  context,
}: {
  event: nftListRepricedEventLog;
  context: nftListRepricedContext;
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
    price: BigInt(event.params.price),
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return nextListEntity;
}
