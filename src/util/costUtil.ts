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
  planningAndConstructionAdjustment: 0.25,
  sounderBaseCost: 1700,
  generatorBaseCost: 30134,
  airPollutionPermittingFees: 0.05,
  CEQA: 85000,
  SCADA: 100000,
  wellDrillingCost: 1200000,
  meterBaseCost: 1200,
  meterSoftware: 29000
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
  const { ruralAdjustment, suburbanAdjustment, urbanAdjustment } = setCostVariables || {};
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
  const { joinElevation, receivingElevation } = waterSystemDetails || {};

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
  } = consolidationCostParams || {};

  const { distanceBuffer, boosterStation, inflationAdjustment, planningAndConstructionAdjustment } =
    setCostVariables;
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
  const planningAndConstructionAdjustmentCost = subtotal * planningAndConstructionAdjustment;

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

  return costBreakdown;
};

export const getComponentAdjustedCost = (basePrice: number, multipliers: Array<number>) => {
  // iterate over all multipliers
  // start at base price and add adjustment cost for each multiplier
  // all adjustments based on base price
  const totalCost = multipliers.reduce((previousValue, currentValue) => {
    return previousValue + basePrice * currentValue;
  }, basePrice);

  return Math.round(totalCost);
};

export const getSystemComponentValues = ({
  waterSystemDetails,
  consolidationCostParams
}: {
  waterSystemDetails: any;
  consolidationCostParams: any;
}) => {
  if (!waterSystemDetails) {
    return [];
  }
  const systemComponents = [
    {
      component: 'Water Pump 1',
      unitCost: 100000,
      avgLife: 20,
      uid: Math.random()
    },
    {
      component: 'Water Pump 2',
      unitCost: 100000,
      avgLife: 20,
      uid: Math.random()
    },
    {
      component: 'Water Pump 3',
      unitCost: 100000,
      avgLife: 20,
      uid: Math.random()
    },
    {
      component: 'Water Pump 4',
      unitCost: 100000,
      avgLife: 20,
      uid: Math.random()
    },
    {
      component: 'Water Pump 5',
      unitCost: 100000,
      avgLife: 20,
      uid: Math.random()
    }
  ] as Array<any>;
  const { joinCounty, joinPopulation } = waterSystemDetails || {};
  const { connections } = consolidationCostParams || {};

  // (population * 150gpd * 2.25peaking factor) / 1440 minutes
  // gpm
  const maximumDailyDemand = (parseInt(joinPopulation) * 150 * 2.25) / 1440;
  const {
    sounderBaseCost,
    generatorBaseCost,
    airPollutionPermittingFees,
    inflationAdjustment,
    wellDrillingCost,
    planningAndConstructionAdjustment,
    meterBaseCost,
    meterSoftware
  } = setCostVariables;
  const regionalAdjustment = getRegionalAdjustment(joinCounty);

  // Sounder
  // Total Cost = Sounder Cost + Regional Multiplier + Total Cost Inflation
  systemComponents.push({
    component: 'Sounder',
    unitCost: getComponentAdjustedCost(sounderBaseCost, [regionalAdjustment, inflationAdjustment]),
    avgLife: 20,
    uid: Math.random()
  });

  // Generator
  // Total Cost = $30,134 + ($341 x MDD) + Regional Multiplier + Total Cost Air Pollution Permitting + Total Cost Inflation
  const generatorMDDCost = generatorBaseCost + 341 * maximumDailyDemand;
  systemComponents.push({
    component: 'Generator',
    unitCost: getComponentAdjustedCost(generatorMDDCost, [
      regionalAdjustment,
      airPollutionPermittingFees,
      inflationAdjustment
    ]),
    avgLife: 20,
    uid: Math.random()
  });

  // New Well
  // Total Cost ($) = Well drilling + CEQA+SCADA + Well Development+ Well Pump and Motor + 25% Total Cost Planning and Construction + Regional Multiplier + 4.7% Total Cost Inflation
  const wellDevelopmentCost = 145.01 * maximumDailyDemand + 32268;
  const wellPumpAndMotorCost = 136.73 * maximumDailyDemand + 116448;
  const newWellMDDCost = wellDrillingCost + wellDevelopmentCost + wellPumpAndMotorCost;
  systemComponents.push({
    component: 'New Well',
    unitCost: getComponentAdjustedCost(newWellMDDCost, [
      planningAndConstructionAdjustment,
      regionalAdjustment,
      inflationAdjustment
    ]),
    avgLife: 20,
    uid: Math.random()
  });

  // Meters
  // Total Cost = Meter Cost + Software + Regional Multiplier + 4.7% Total Cost Inflation
  const calcConnections = connections || 8;
  const metersCost = meterBaseCost * calcConnections + meterSoftware;
  systemComponents.push({
    component: 'Meters (all connections)',
    unitCost: getComponentAdjustedCost(metersCost, [regionalAdjustment, inflationAdjustment]),
    avgLife: 20,
    uid: Math.random()
  });
  return systemComponents;
};
