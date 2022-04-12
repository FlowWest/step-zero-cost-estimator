interface CostBreakdown {
  total: number;
  materialCosts: number;
  adminFees: number;
  financialAssistance: number;
  adjustments: number;
}

export const getConsolidationCostDetails = ({
  waterSystemDetails,
  consolidationCostParams
}: any) => {
  const { connections, connectionCosts, distance, pipelineCosts, adminLegalCosts, contingency } =
    consolidationCostParams;

  // total distance always += 1000 because of buffer
  const totalDistance = distance + 1000;

  const totalPipelineCosts = pipelineCosts * totalDistance;
  // total distance always += 1000 because of buffer
  // so if total distance = 1000 (distance = 0), indicates intersecting system
  const totalServiceFee = totalDistance === 1000 ? 5000 : 0;
  const totalConnectionCosts = connectionCosts * connections;
  const totalMaterialCosts = totalPipelineCosts + totalServiceFee + totalConnectionCosts;

  const totalAdminFees = adminLegalCosts;

  const subtotal = totalMaterialCosts + totalAdminFees;

  const totalContingency = subtotal * (contingency / 100);
  const totalAdjustments = totalContingency;

  const total = subtotal + totalAdjustments;

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
    total
  } as any;

  return costBreakdown;
};
