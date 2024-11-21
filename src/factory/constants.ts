import { ContractMetadataEntity, FactorySummaryEntity } from "generated";
import { zeroAddress } from "viem";

export const INITIAL_EVENTS_SUMMARY: FactorySummaryEntity = {
  id: "",
  chain: BigInt(0),
  address: zeroAddress,
  deployedCount: BigInt(0),
  ownershipTransferredCount: BigInt(0),
  updatedAt: BigInt(0),
  updatedBlock: BigInt(0),
};

export const INITIAL_CONTRACT_METADATA: ContractMetadataEntity = {
  id: "",
  raw: "",
  name: undefined,
  description: undefined,
  external_link: undefined,
  image: undefined,
  featured_image: undefined,
  banner_image: undefined,
  collaborators: [],
  createdAt: undefined,
  createdBlock: undefined,
  encounteredAt: undefined,
  encounteredBlock: undefined,
  updatedAt: undefined,
  updatedBlock: undefined,
};
