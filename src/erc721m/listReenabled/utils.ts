import { nftListReenabledEventLog } from "./constants";

export const getListId = (event: nftListReenabledEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.listId}`;
};
