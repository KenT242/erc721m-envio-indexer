import { ContractMetadataEntity } from "generated";
import { validateUri } from "../../../validateUri";
import { INITIAL_CONTRACT_METADATA } from "../../constants";

interface ContractMetadataInterface {
  name?: string;
  description?: string;
  image?: string;
  banner_image?: string;
  featured_image?: string;
  external_link?: string;
  collaborators?: string[];
}

export async function createMetadata({
  id,
  contractUri,
  blockTimestamp,
  blockNumber,
  isDeployed,
}: {
  id: string;
  contractUri?: string;
  blockTimestamp: bigint;
  blockNumber: bigint;
  isDeployed?: boolean;
}) {
  let metadata: undefined | ContractMetadataInterface;

  if (contractUri) {
    const uri = validateUri(contractUri);
    if (uri) {
      try {
        const result = await fetch(uri);
        metadata = (await result.json()) as
          | ContractMetadataInterface
          | undefined;
      } catch (e) {
        console.log("[initCollections] unable to fetch contract uri: ", uri);
      }
    } else {
      try {
        metadata = JSON.parse(contractUri);
      } catch (e) {}
    }
  }
  let raw;
  try {
    raw = metadata ? JSON.stringify(metadata) : "";
  } catch (_) {}

  // @TODO add schema validation

  const metadataEntity: ContractMetadataEntity = {
    ...INITIAL_CONTRACT_METADATA,
    id,
    raw,
    name: metadata?.name,
    description: metadata?.description,
    image: metadata?.image,
    banner_image: metadata?.banner_image,
    featured_image: metadata?.featured_image,
    external_link: metadata?.external_link,
    collaborators: metadata?.collaborators,
    createdAt: isDeployed ? blockTimestamp : undefined,
    createdBlock: isDeployed ? blockNumber : undefined,
    encounteredAt: blockTimestamp,
    encounteredBlock: blockNumber,
    updatedAt: blockTimestamp,
    updatedBlock: blockNumber,
  };

  return metadataEntity;
}
