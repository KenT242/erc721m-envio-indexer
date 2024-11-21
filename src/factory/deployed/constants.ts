import {
  CollectionEntity,
  FactoryContract_DeployedEvent_eventArgs,
  FactoryContract_DeployedEvent_handlerContext,
  FactoryContract_DeployedEvent_handlerContextAsync,
  FactoryContract_DeployedEvent_loaderContext,
  eventLog,
} from "generated";

export type DeployedEventLog =
  eventLog<FactoryContract_DeployedEvent_eventArgs>;

export type DeployedLoaderContext = FactoryContract_DeployedEvent_loaderContext;
export type DeployedContextSync = FactoryContract_DeployedEvent_handlerContext;
export type DeployedContextAsync =
  FactoryContract_DeployedEvent_handlerContextAsync;
export type DeployedContext = DeployedContextAsync;

export const INITIAL_COLLECTION: CollectionEntity = {
  id: "",
  chain: BigInt(0),
  address: "",
  creator_id: undefined,
  owner_id: undefined,
  factory_id: undefined,
  parent_id: undefined,
  isErc721m: false,
  isParent: true,
  name: undefined,
  symbol: undefined,
  maxSupply: undefined,
  alignment: undefined,
  metadataUri: undefined,
  metadata_id: undefined,
  createdAt: undefined,
  createdBlock: undefined,
  encounteredAt: BigInt(0),
  encounteredBlock: BigInt(0),
  updatedAt: BigInt(0),
  updatedBlock: BigInt(0),
};
