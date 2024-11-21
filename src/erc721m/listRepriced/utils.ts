import { nftListRepricedEventLog } from "./constants";

export const getListId = (event: nftListRepricedEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.listId}`;
};
