import { getFactoryId } from "../utils";
import { DeployedEventLog, DeployedLoaderContext } from "./constants";
import { getParentId } from "./utils";

export function deployedEventLoader({
  event,
  context,
}: {
  event: DeployedEventLog;
  context: DeployedLoaderContext;
}) {
  const id = getFactoryId(event);
  const parentId = getParentId(event);
  context.FactorySummary.load(id);
  context.CollectionDeployed.load(parentId, undefined);
  context.User.load(event.params.deployer);
  context.contractRegistration.addERC721M(event.params.collection);
}
