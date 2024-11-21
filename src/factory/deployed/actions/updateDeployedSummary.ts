import { FactorySummaryEntity } from "generated";
import { getFactoryId } from "../../utils";
import { DeployedContext, DeployedEventLog } from "../constants";
import { INITIAL_EVENTS_SUMMARY } from "../../constants";

export async function updateDeployedSummary(
  event: DeployedEventLog,
  context: DeployedContext
) {
  const id = getFactoryId(event);

  const summary = await context.FactorySummary.get(id);

  const currentSummaryEntity: FactorySummaryEntity = summary ?? {
    ...INITIAL_EVENTS_SUMMARY,
    id,
    chain: BigInt(event.chainId),
  };

  const nextSummaryEntity: FactorySummaryEntity = {
    ...currentSummaryEntity,
    deployedCount: currentSummaryEntity.deployedCount + BigInt(1),
    updatedAt: BigInt(event.blockTimestamp),
    updatedBlock: BigInt(event.blockNumber),
  };

  return nextSummaryEntity;
}
