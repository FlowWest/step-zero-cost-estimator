import { ConsolidationCostDetails } from './interfaces';
import { WaterSystem } from './interfaces';

const setCostVariables = {
  distanceBuffer: 1000,
  serviceLineFee: 5000,
  propertyCostLot: 150000,
  boosterStation: 75000,
  urbanAdjustment: 0.32,
  suburbanAdjustment: 0.3,
  ruralAdjustment: 0.0,
  inflationAdjustment: 0.047,
  planningAndConstructionAdjustment: 0.25
};

const ruralCounties = [
  'Alpine',
  'Amador',
  'Butte',
  'Calaveras',
  'Colusa',
  'Del Norte',
  'Fresno',
  'Glenn',
  'Humboldt',
  'Imperial',
  'Inyo',
  'Kern',
  'Kings',
  'Lake',
  'Lassen',
  'Madera',
  'Mariposa',
  'Mendocino',
  'Merced',
  'Modoc',
  'Mono',
  'Nevada',
  'Placer',
  'Plumas',
  'San Joaquin',
  'Shasta',
  'Sierra',
  'Siskiyou',
  'Stanislaus',
  'Sutter',
  'Tehama',
  'Trinity',
  'Tulare',
  'Tuolumne',
  'Yolo',
  'Yuba'
].map((county) => county.toLowerCase());

const suburbanCounties = [
  'Alameda',
  'Contra Costa',
  'El Dorado',
  'Marin',
  'Monterey',
  'Napa',
  'Orange,',
  'San Benito',
  'San Bernardino',
  'San Luis Obispo',
  'Santa Barbara',
  'Santa',
  'Cruz',
  'Solano',
  'Sonoma'
].map((county) => county.toLowerCase());

const urbanCounties = [
  'Los Angeles',
  'Riverside',
  'Sacramento',
  'San Diego',
  'San Francisco',
  'San Mateo',
  'Santa Clara',
  'Ventura'
].map((county) => county.toLowerCase());

const getRegionalAdjustment = (waterSystemCounty: string) => {
  const { ruralAdjustment, suburbanAdjustment, urbanAdjustment } = setCostVariables;
  if (!waterSystemCounty) {
    return ruralAdjustment;
  }

  if (urbanCounties.includes(waterSystemCounty.toLowerCase())) {
    return urbanAdjustment;
  } else if (suburbanCounties.includes(waterSystemCounty.toLowerCase())) {
    return suburbanAdjustment;
  } else {
    return ruralAdjustment;
  }
};

const getElevationAdjustmentRequirement = (waterSystemDetails: WaterSystem) => {
  const { joinElevation, receivingElevation } = waterSystemDetails;

  const pressureLoss = (parseInt(receivingElevation) - parseInt(joinElevation)) * 0.433;

  return pressureLoss > 10;
};

export const getConsolidationCostDetails = ({
  waterSystemDetails,
  consolidationCostParams
}: any) => {
  const {
    connections,
    feeCostPerConnection,
    distance,
    pipelineCosts,
    adminLegalCEQACosts,
    contingency
  } = consolidationCostParams;

  const { distanceBuffer, boosterStation, inflationAdjustment, planningAndConstructionAdjustment } =
    setCostVariables;
  console.log('wsd', waterSystemDetails);

  // if connections > 0, use connections, else use 8
  const calcConnections = connections || 8;
  const totalConnectionCosts = calcConnections * feeCostPerConnection;

  // total distance always += 1000 because of buffer
  const totalDistance = distance + distanceBuffer;
  const totalPipelineCosts = pipelineCosts * totalDistance;
  // so if total distance = 1000 (distance = 0), indicates intersecting system
  const totalServiceFee = distance === 0 ? 5000 : 0;

  const totalMaterialCosts = totalPipelineCosts + totalServiceFee + totalConnectionCosts;

  const totalAdminFees = adminLegalCEQACosts;

  const needsElevationAdjustment = getElevationAdjustmentRequirement(waterSystemDetails);
  const elevationAdjustmentCost = needsElevationAdjustment ? boosterStation * 2 : 0;

  const subtotal = totalMaterialCosts + totalAdminFees + elevationAdjustmentCost;

  const totalContingencyCost = subtotal * (contingency / 100);
  const planningAndConstructionAdjustmentCost = subtotal + planningAndConstructionAdjustment;

  const totalMergerCost = subtotal + totalContingencyCost + planningAndConstructionAdjustmentCost;

  const regionalAdjustment = getRegionalAdjustment(waterSystemDetails?.joinCounty);
  const regionalAdjustmentCost = totalMergerCost * regionalAdjustment;

  const costBeforeInflation = totalMergerCost + regionalAdjustmentCost;

  const inflationAdjustmentCost = costBeforeInflation * inflationAdjustment;
  // const subtotal = adjustedPhysicalCosts + inflationAdjustmentCost;

  const totalAdjustments =
    totalContingencyCost +
    elevationAdjustmentCost +
    regionalAdjustmentCost +
    inflationAdjustmentCost +
    planningAndConstructionAdjustmentCost;

  const total = costBeforeInflation + inflationAdjustmentCost;
  const totalCostPerConnection = total / calcConnections;

  const costBreakdown = {
    materialCosts: {
      total: totalMaterialCosts,
      totalPipelineCosts,
      totalServiceFee,
      totalConnectionCosts
    },
    adminFees: {
      total: totalAdminFees,
      adminLegalCEQACosts
    },
    adjustments: {
      total: totalAdjustments,
      elevationAdjustmentCost,
      regionalAdjustmentCost,
      inflationAdjustmentCost,
      planningAndConstructionAdjustmentCost,
      totalContingencyCost
    },
    total,
    totalCostPerConnection
  } as ConsolidationCostDetails;

  console.log('costBreakdown', costBreakdown);
  return costBreakdown;
};
