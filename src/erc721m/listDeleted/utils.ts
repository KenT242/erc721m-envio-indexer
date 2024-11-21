import { nftListDeletedEventLog } from "./constants";

export const getListId = (event: nftListDeletedEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.listId}`;
};
