import {
  ERC721MContract_TransferEvent_handlerContextAsync,
  ERC721MContract_TransferEvent_loaderContext,
  ERC721MContract_Transfer_EventLog,
  ListEntity,
} from "generated";

export type nftTransferEventLog = ERC721MContract_Transfer_EventLog;

export type nftTransferLoaderContext =
  ERC721MContract_TransferEvent_loaderContext;
export type nftTransferContext =
  ERC721MContract_TransferEvent_handlerContextAsync;

export const INITIAL_LIST: ListEntity = {
  id: "",
  chain: 0n,
  collection_id: "",
  listId: 0n,
  merkleRoot: "",
  supply: 0n,
  claimable: 0n,
  price: 0n,
  paused: false,
  deleted: false,
  createdAt: 0n,
  createdBlock: 0n,
  updatedAt: 0n,
  updatedBlock: 0n,
};
