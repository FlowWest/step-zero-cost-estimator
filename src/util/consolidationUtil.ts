import { ConsolidationCostDetails } from './interfaces';

export const getConsolidationCostDetails = ({
  waterSystemDetails,
  consolidationCostParams
}: any) => {
  const { connections, connectionCosts, distance, pipelineCosts, adminLegalCosts, contingency } =
    consolidationCostParams;

  // if connections > 0, use connections, else use 8
  const calcConnections = connections || 8;

  // total distance always += 1000 because of buffer
  const totalDistance = distance + 1000;

  const totalPipelineCosts = pipelineCosts * totalDistance;
  // total distance always += 1000 because of buffer
  // so if total distance = 1000 (distance = 0), indicates intersecting system
  const totalServiceFee = distance === 0 ? 5000 : 0;
  const totalConnectionCosts = connectionCosts * calcConnections;
  const totalMaterialCosts = totalPipelineCosts + totalServiceFee + totalConnectionCosts;

  const totalAdminFees = adminLegalCosts;

  const subtotal = totalMaterialCosts + totalAdminFees;

  const totalContingency = subtotal * (contingency / 100);
  const totalAdjustments = totalContingency;

  const total = subtotal + totalAdjustments;
  const costPerConnection = total / calcConnections / 12;

  const costBreakdown = {
    materialCosts: {
      total: totalMaterialCosts,
      totalPipelineCosts,
      totalServiceFee,
      totalConnectionCosts
    },
    adminFees: {
      total: totalAdminFees,
      adminLegalCosts
    },
    financialAssistance: {},
    adjustments: {
      total: totalAdjustments,
      totalContingency
    },
    total,
    costPerConnection
  } as ConsolidationCostDetails;

  return costBreakdown;
};
