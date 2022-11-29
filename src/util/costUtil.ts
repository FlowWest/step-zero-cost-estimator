import { ConsolidationCostDetails } from './interfaces';
import { WaterSystem } from './interfaces';
import { inRange } from 'lodash';

const setCostVariables = {
  distanceBuffer: 1000,
  serviceLineFee: 5000,
  lotPropertyCost: 150000,
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

  const {
    distanceBuffer,
    boosterStation,
    inflationAdjustment,
    planningAndConstructionAdjustment,
    lotPropertyCost
  } = setCostVariables;
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

  const elevationAdjustmentCost = needsElevationAdjustment
    ? boosterStation * 2 + lotPropertyCost
    : 0;

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

export const getADD = (joinPopulation: any) => {
  return parseInt(joinPopulation) * 150;
};

export const getMDD = (joinPopulation: any) => {
  return (parseInt(joinPopulation) * 150 * 2.25) / 1440;
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
      component: 'Drilled Well, 6", steel casing',
      unitCost: 80,
      avgLife: 25,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Drilled Well, 8", steel casing',
      unitCost: 130,
      avgLife: 25,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Drilled Well, 12", steel casing',
      unitCost: 200,
      avgLife: 25,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Wellhead Electrical Controls',
      unitCost: 700,
      avgLife: 25,
      uid: Math.random()
    },
    { component: 'Submersible Pump, 20 HP', unitCost: 9000, avgLife: 7, uid: Math.random() },
    { component: 'Submersible Pump, 3 HP', unitCost: 2000, avgLife: 7, uid: Math.random() },
    {
      component: 'Submersible Pump, 5 HP',
      unitCost: 3500,
      avgLife: 7,
      uid: Math.random()
    },
    {
      component: 'Booster Pump Station, 25 HP, complete',
      unitCost: 14000,
      avgLife: 5,
      uid: Math.random()
    },
    {
      component: 'Booster Pump Station Electrical Controls',
      unitCost: 900,
      avgLife: 5,
      uid: Math.random()
    },
    {
      component: 'Pressure Tank',
      unitCost: 1.5,
      avgLife: 10,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Storage Tank, Plastic',
      unitCost: 0.5,
      avgLife: 10,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Storage Tank, Steel',
      unitCost: 1.2,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Storage Tank, Concrete',
      unitCost: 1.5,
      avgLife: 80,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Master Meter, 2"',
      unitCost: 450,
      avgLife: 10,
      uid: Math.random()
    },
    {
      component: 'Master Meter, 3"',
      unitCost: 800,
      avgLife: 10,
      uid: Math.random()
    },
    {
      component: 'Master Meter, 4"',
      unitCost: 2500,
      avgLife: 10,
      uid: Math.random()
    },
    {
      component: 'Hypochlorinator w/ Tank & Pump, Complete',
      unitCost: 800,
      avgLife: 10,
      uid: Math.random()
    },
    {
      component: 'Pipe w/ sand bedding, 1"',
      unitCost: 20,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Pipe w/ sand bedding, 2"',
      unitCost: 25,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Pipe w/ sand bedding, 3"',
      unitCost: 30,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Pipe w/ sand bedding, 4"',
      unitCost: 35,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Pipe w/ sand bedding, 6"',
      unitCost: 50,
      avgLife: 50,
      uid: Math.random(),
      requiresMeasurement: true
    },
    {
      component: 'Standpipe Hydrant, 1-1/2"',
      unitCost: 700,
      avgLife: 20,
      uid: Math.random()
    },
    { component: 'Standpipe Hydrant, 2-1/2"', unitCost: 900, avgLife: 20, uid: Math.random() },
    {
      component: 'Customer Meter w/ Box & Shutoff, Complete',
      unitCost: 250,
      avgLife: 20,
      uid: Math.random()
    },
    { component: 'Distribution Valve, 2"', unitCost: 150, avgLife: 10, uid: Math.random() },
    { component: 'Distribution Valve, 3"', unitCost: 250, avgLife: 10, uid: Math.random() },
    { component: 'Distribution Valve, 4"', unitCost: 600, avgLife: 20, uid: Math.random() },
    { component: 'Distribution Valve, 6"', unitCost: 850, avgLife: 20, uid: Math.random() },
    {
      component: 'Air & Vacuum Relief Valve, Typical,',
      unitCost: 375,
      avgLife: 20,
      uid: Math.random()
    }
  ] as Array<any>;
  const { joinCounty, joinPopulation } = waterSystemDetails || {};
  const { connections } = consolidationCostParams || {};

  // (population * 150gpd * 2.25peaking factor) / 1440 minutes
  // gpm
  const maximumDailyDemand = getMDD(joinPopulation);
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
    avgLife: 25,
    uid: Math.random()
  });

  // Meters
  // Total Cost = Meter Cost + Software + Regional Multiplier + 4.7% Total Cost Inflation
  const calcConnections = connections || 8;
  const metersCost = meterBaseCost * calcConnections + meterSoftware;
  systemComponents.push({
    component: 'Meters (all connections)',
    unitCost: getComponentAdjustedCost(metersCost, [regionalAdjustment, inflationAdjustment]),
    avgLife: 10,
    uid: Math.random()
  });

  systemComponents.forEach((component) => {
    component.annualReserve = component.unitCost / component.avgLife;
    component.monthlyReserve = component.unitCost / component.avgLife / 12;
  });

  return systemComponents;
};

export const getTreatmentOptionsValues = ({
  waterSystemDetails,
  consolidationCostParams
}: {
  waterSystemDetails: any;
  consolidationCostParams: any;
}) => {
  if (!waterSystemDetails) {
    return [];
  }
  const { joinCounty, joinPopulation } = waterSystemDetails || {};
  const { connections } = consolidationCostParams || {};
  // (population * 150gpd * 2.25peaking factor) / 1440 minutes
  // gpm
  const maximumDailyDemand = getMDD(joinPopulation);
  let treatmentOptions = [] as Array<any>;

  //GAC
  //The vendor-supplied estimates were averaged by vessel size
  //and translated to an installed cost using an engineering multiplier of approximately 2.36x equipment cost.
  let gacEquipmentCost = 0;
  if (maximumDailyDemand <= 250) {
    gacEquipmentCost = 437000;
  } else if (maximumDailyDemand <= 425) {
    gacEquipmentCost = 536000;
  } else if (maximumDailyDemand <= 875) {
    gacEquipmentCost = 745000;
  } else if (maximumDailyDemand <= 1750) {
    gacEquipmentCost = 1490000;
  }
  gacEquipmentCost *= 2.36;

  treatmentOptions.push({
    uid: 1,
    code: 'GAC',
    treatment: 'Granular Activated Carbon',
    contaminant: 'Organic Contaminants, Total Organic Carbon',
    capitalCost: gacEquipmentCost,
    operationalCost: (getADD(joinPopulation) / 1000) * 365 * 0.28, // These costs were normalized to a standard production cost equivalent to $0.28/1,000 gallons of water produced.
    category: 'groundWater'
  });

  let axEquipmentCost = 0;
  if (maximumDailyDemand <= 125) {
    axEquipmentCost = 764000;
  } else if (maximumDailyDemand <= 275) {
    axEquipmentCost = 1118000;
  } else if (maximumDailyDemand <= 400) {
    axEquipmentCost = 1370000;
  } else if (maximumDailyDemand <= 550) {
    axEquipmentCost = 1656000;
  } else if (maximumDailyDemand <= 700) {
    axEquipmentCost = 2045000;
  } else if (maximumDailyDemand <= 850) {
    axEquipmentCost = 2753000;
  } else if (maximumDailyDemand <= 1000) {
    axEquipmentCost = 2972000;
  }

  treatmentOptions.push({
    uid: 2,
    code: 'AX',
    treatment: 'Anion Exchange',
    contaminant: 'Nitrate',
    capitalCost: axEquipmentCost,
    operationalCost: getMDD(joinPopulation) * 4000, // figure C8 linear model
    category: 'groundWater'
  });

  treatmentOptions.push({
    uid: 3,
    code: 'CX',
    treatment: 'Cation Exchange',
    contaminant: 'Radium',
    capitalCost: axEquipmentCost,
    operationalCost: getMDD(joinPopulation) * 4000, // For this instance, the costs for nitrate disposal were applied
    category: 'groundWater'
  });

  let ixEquipmentCost = 0;
  if (maximumDailyDemand <= 101) {
    ixEquipmentCost = 357000;
  } else if (maximumDailyDemand <= 225) {
    ixEquipmentCost = 538000;
  } else if (maximumDailyDemand <= 401) {
    ixEquipmentCost = 713000;
  } else if (maximumDailyDemand <= 627) {
    ixEquipmentCost = 926000;
  } else if (maximumDailyDemand <= 1256) {
    ixEquipmentCost = 1852000;
  }

  treatmentOptions.push({
    uid: 4,
    code: 'IX',
    treatment: 'Ion Exchange',
    contaminant: 'Uranium, Gross Alpha as a result of Uranium, and Perchlorate',
    capitalCost: ixEquipmentCost,
    operationalCost: (getADD(joinPopulation) / 1000) * 365 * 0.56, // . A review of service supplier cost estimates for these services resulted in a unit cost of $0.56/kgal of water produced for uranium and $0.10/kgal for perchlorate, with the primary difference being the disposal and handling of the uranium laden waste This unit cost assumes a throughput of approximately 100,000 BV prior to replacement resin and reflects the cost for replacement, disposal, and associated services
    category: 'groundWater'
  });

  let adEquipmentCost = 0;
  if (maximumDailyDemand <= 250) {
    adEquipmentCost = 437000;
  } else if (maximumDailyDemand <= 425) {
    adEquipmentCost = 536000;
  } else if (maximumDailyDemand <= 875) {
    adEquipmentCost = 745000;
  }

  treatmentOptions.push({
    uid: 5,
    code: 'AD',
    treatment: 'Adsorption',
    contaminant: 'Arsenic',
    capitalCost: adEquipmentCost,
    operationalCost: (getADD(joinPopulation) / 1000) * 365 * 1.54, // Coagulation Filtration $1.07/kgal,
    category: 'groundWater'
  });

  // Figure C3.3 ~= 1,000,000 + (gpm*1000)
  let cfEquipmentCost = 1000000 + maximumDailyDemand * 1000;

  treatmentOptions.push({
    uid: 6,
    code: 'CF',
    treatment: 'Coagulation Filtration',
    contaminant: 'Arsenic',
    capitalCost: cfEquipmentCost,
    operationalCost: (getADD(joinPopulation) / 1000) * 365 * 1.07, // Coagulation Filtration $1.07/kgal
    category: 'groundWater'
  });

  // Figure C3.4 ~= 1,000,000 + (gpm*1000)
  let filtrationEquipmentCost = 1000000 + maximumDailyDemand * 1000;

  treatmentOptions.push({
    uid: 7,
    code: 'F',
    treatment: 'Filtration',
    contaminant: 'Iron and Manganese',
    capitalCost: filtrationEquipmentCost,
    operationalCost: (getADD(joinPopulation) / 1000) * 365 * 1.07, // The operational costs for iron and manganese removal use arsenic removal with coagulation filtration as a surrogate which are anticipated to be a conservative estimate.
    category: 'groundWater'
  });

  let aaEquipmentCost = 0;
  if (maximumDailyDemand <= 250) {
    aaEquipmentCost = 833000;
  } else if (maximumDailyDemand <= 425) {
    aaEquipmentCost = 949000;
  } else if (maximumDailyDemand <= 675) {
    aaEquipmentCost = 1029000;
  } else if (maximumDailyDemand <= 900) {
    aaEquipmentCost = 1199000;
  }

  treatmentOptions.push({
    uid: 8,
    code: 'AA',
    treatment: 'Activated Alumina',
    contaminant: 'Fluoride',
    capitalCost: aaEquipmentCost,
    operationalCost: 295 * connections, // Table 26 : $295 - average OM cost per conn
    category: 'groundWater'
  });

  let swppEquipmentCost = 0;
  if (maximumDailyDemand <= 175) {
    swppEquipmentCost = 703000;
  } else if (maximumDailyDemand <= 300) {
    swppEquipmentCost = 983000;
  } else if (maximumDailyDemand <= 700) {
    swppEquipmentCost = 1461000;
  } else if (maximumDailyDemand <= 1400) {
    swppEquipmentCost = 1951000;
  } else if (maximumDailyDemand <= 2100) {
    swppEquipmentCost = 3012000;
  }

  treatmentOptions.push({
    uid: 9,
    code: 'SWPP',
    treatment: 'Surface Water Package Plant',
    contaminant: null,
    capitalCost: swppEquipmentCost,
    operationalCost: 41000, // Table C12:  Annual Operator Labor Cost Estimate
    category: 'surfaceWater'
  });

  let fourLVIEquipmentCost = 0;
  if (maximumDailyDemand <= 175) {
    fourLVIEquipmentCost = 23000;
  } else if (maximumDailyDemand <= 300) {
    fourLVIEquipmentCost = 38000;
  } else if (maximumDailyDemand <= 700) {
    fourLVIEquipmentCost = 196000;
  } else if (maximumDailyDemand <= 1400) {
    fourLVIEquipmentCost = 416000;
  } else if (maximumDailyDemand <= 2100) {
    fourLVIEquipmentCost = 627000;
  }

  treatmentOptions.push({
    uid: 10,
    code: '4LVI',
    treatment: '4-Log Virus Inactivation',
    contaminant: null,
    capitalCost: fourLVIEquipmentCost,
    operationalCost: 41000, // Table C12:  Annual Operator Labor Cost Estimate
    category: 'surfaceWater'
  });

  return treatmentOptions;
};
