import { startCase } from 'lodash';
import { ResourceObject } from './interfaces';

export const setCookie = (cookie: string, value: string): void => {
  if (typeof window !== 'undefined') {
    window.document.cookie = `${cookie}=${value}; path=/`;
  }
};

export const getCookie = (cookie: string): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = window.document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const [key, value] = cookies[i].split('=');
      if (key.trim() === cookie) {
        return value;
      }
    }
  }
  return null;
};

export const formatToUSD = (value: number): string => {
  const convertToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'

    //call the format method and pass in number to return dollar amount
  });

  return convertToUSD.format(value);
};

//Function will create title cased strings from the object keys
export const formatSubItemText = (subItem: any) => {
  const subItemWordsArray = subItem.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
  const updatedWordsArray: string[] = [];

  subItemWordsArray.forEach((word: string) => {
    if (word.toLowerCase() === 'total') {
      return;
    } else if (word.toLowerCase() === 'and') {
      updatedWordsArray.push(word.toLowerCase());
    } else {
      updatedWordsArray.push(startCase(word));
    }
  });
  const newString = updatedWordsArray.join(' ');
  return newString;
};

const waterBoardsLogo = 'SWRCB_Logo1.png';

export const resourceDataObjects: ResourceObject[] = [
  {
    logo: waterBoardsLogo,
    description:
      'The California Small Water Systems Rates Dashboard (dashboard) is an online informationsharing resource with an interactive interface that allows users to compare or benchmark residential rates, financial, and system performance data of community water systems serving between 500 and 3,300 connections',
    title: 'California Small Water Systems Rates Dashboard',
    link: 'https://dashboards.efc.sog.unc.edu/ca',
    category: 'waterRates'
  },
  {
    logo: 'efc_logo_new.png',
    description: `Tool to help set water and/or wastewater rates next year by projecting the utility's expenses, revenues from rates, and fund balance.`,
    title: 'Water And Wastewater Rates Analysis Model',
    link: 'https://efc.sog.unc.edu/resource/water-and-wastewater-rates-analysis-model/',
    category: 'waterRates'
  },
  {
    logo: 'SDWA-40-Anniv-Logo-JPEG-279x300.png',
    description:
      'The Drinking Water State Revolving Fund (DWRSF) program assists public water systems in financing the cost of drinking water infrastructure projects needed to achieve or maintain compliance with Safe Drinking Water Act (SDWA) requirements.',
    title: 'Drinking Water State Revolving Fund',
    link: 'https://www.waterboards.ca.gov/drinking_water/services/funding/SRF.html',
    category: 'funding'
  },
  {
    logo: waterBoardsLogo,
    description:
      'The Drinking Water State Revolving Fund (DWRSF) program assists public water systems in financing the cost of drinking water infrastructure projects needed to achieve or maintain compliance with Safe Drinking Water Act (SDWA) requirements.',
    title: 'Drinking Water Grants - Drinking Water State Revolving Fund (DWSRF) Program Fact Sheet',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/srf/docs/dw-grant-fact-sheet.pdf',
    category: 'funding'
  },
  {
    logo: waterBoardsLogo,
    description:
      'Small Community Funding is available to help small disadvantage communities (small DACs), providing drinking water service to less than 10,000 people or wastewater service to less than 20,000 people and having a median household income (MHI) of less than 80% the statewide MHI, with technical assistance needs, interim water supplies, and implement eligible drinking water or wastewater capital improvement projects.',
    title: 'Small Community Funding Program - Application Process',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/sustainable_water_solutions/scfp.html',
    category: 'funding'
  },
  {
    logo: 'prop_1_logo.png',
    description:
      'The Office of Sustainable Water Solutions (OSWS) administers the Technical Assistance (TA) Funding Program. TA is available to help small, disadvantaged communities (DACs) develop, fund, and implement eligible drinking water, wastewater, stormwater, or groundwater needs.',
    title: 'Technical Assistance Funding Program',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/tech_asst_funding.html',
    category: 'funding'
  },
  {
    logo: 'FinancialAssistance2.png',
    description:
      'The Financial Assistance Application Submittal Tool (FAAST) allows potential funding recipients to apply for grant and loan funding offered by various State agencies.',
    title: 'Financial Assistance Application Submittal Tool (FAAST)',
    link: 'https://faast.waterboards.ca.gov/Login.aspx',
    category: 'funding'
  },
  {
    logo: waterBoardsLogo,
    description:
      "The Division of Drinking Water (DDW) acts as the administrative arm of the Utah Drinking Water Board. It is engaged in a variety of activities related to the design and operation of California's public drinking water systems.",
    title: 'DDW District Offices',
    link: 'https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/DDWdistrictofficesmap.pdf',
    category: 'governance'
  },
  {
    logo: waterBoardsLogo,
    description:
      'The Safe and Affordable Funding for Equity and Resilience (SAFER) Engagement Unit is a team of engineers and program specialists within the Division of Drinking Water. Our mission is to support water systems in achieving long-term sustainability.',
    title: 'DDW SAFER Engagement Units',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf',
    category: 'funding'
  },
  {
    logo: waterBoardsLogo,
    description:
      'The Office of Sustainable Water Solutions (OSWS) administers the Technical Assistance (TA) Funding Program. TA is available to help small disadvantaged communities (DACs) develop, fund, and implement eligible drinking water, wastewater, stormwater, or groundwater needs.',
    title: 'Technical Assistance Funding Program',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/tech_asst_funding.html',
    category: 'technicalAssistance'
  },
  {
    logo: 'rcac-header-logo.png',
    description:
      'Free CA Drinking Water workshops are funded in full or in part under the Safe and Affordable Funding for Equity and Resiliency (SAFER) Drinking Water Program through an agreement with the State Water Resources Control Board.',
    title: 'Statewide RCAC Trainings',
    link: 'https://www.events.rcac.org/rcac/Free_CA_Drinking_Water_Workshops.asp',
    category: 'technicalAssistance'
  },
  {
    logo: waterBoardsLogo,
    description:
      'A ‘Water System Administrator’ is a qualified specialist that provides Technical, Managerial, and/or Financial expertise to struggling water systems. Disadvantaged communities served by a failing water system on the Human Right to Water list are eligible for an Administrator Appointment funded by the State Water Board, through SAFER program funding.',
    title: 'Water System Administrators: Community and Program Info',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/administrator.html',
    category: 'technicalAssistance'
  },
  {
    logo: 'cal_legislative_info.png',
    description:
      'Senate Bill (SB) 403, will prevent water contamination and water system failures in disadvantaged communities throughout California by authorizing the State Water Resources Control Board (SWRCB) to mandate the consolidation of a water system that is at-risk of failing.',
    title: 'SB-403 Drinking Water: Consolidation',
    link: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB403',
    category: 'legislation'
  },
  {
    logo: 'cal_legislative_info.png',
    description:
      'New legislation effective January 1st, 2023 allows the State Water Board to assign an administrator to water systems that are designated as “At-Risk”.  Administrators can provide administration, technical, operational, legal or managerial services of a water system. Full managerial control results in the water system relinquishing all water system duties and powers to the administrator.',
    title: 'SB-1254 Drinking Water: Administrator: Managerial and Other Services',
    link: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1254',
    category: 'legislation'
  },
  {
    logo: 'cal_legislative_info.png',
    description:
      'SB-552, Section 10609.62, requires that small water suppliers have additional water resiliency infrastructure, including: monitoring equipment for groundwater well levels, mutual aid membership, backup electrical power, at least two sources of water that meet average daily demand, water service meters and distribution systems that meet fire flow.',
    title:
      'SB-552 Drought Planning: Small Water Suppliers: Nontransient Noncommunity Water Systems',
    link: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB552',
    category: 'legislation'
  },
  {
    logo: waterBoardsLogo,
    description:
      'In order to best support your water system’s removal from the “At-Risk” list, we recommend reviewing the Drinking Water Needs Assessment Dashboard, searching your water system and considering ways to address Risk Categories where your water system is at medium or high risk.',
    title: 'Drinking Water Needs Assessment Dashboard',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/2022.html',
    category: 'miscellaneous'
  },
  {
    logo: waterBoardsLogo,
    description:
      'The State Water Board also has a Drinking Water System Outreach Tool, and dedicated staff, that can allow you to evaluate what water systems may be in close proximity to yours for physical consolidation, managerial consolidation, or broader partnership opportunities.',
    title: 'Drinking Water System Outreach Tool',
    link: 'https://gispublic.waterboards.ca.gov/portal/apps/webappviewer/index.html?id=70d27423735e45d6b037b7fbaea9a6a6',
    category: 'miscellaneous'
  },
  {
    logo: waterBoardsLogo,
    description:
      'New consolidation efforts and strategies have resulted in approximately 220 water systems being consolidated or partnerships being developed in California since 2017.',
    title: 'Success Map',
    link: 'https://gispublic.waterboards.ca.gov/portal/apps/webappviewer/index.html?id=fabf64fbe50343219a5d34765eb7daad',
    category: 'miscellaneous'
  },
  {
    logo: waterBoardsLogo,
    description:
      'The State of California made clean drinking water a legislative right for all residents in 2012 with AB 685, the Human Right to Water bill. The Water Board’s SAFER program advances the Human Right to Water by supporting water systems and communities achieved sustainable drinking water solutions.',
    title: 'Water Partnership Success Stories',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/partnershipsuccess.html',
    category: 'miscellaneous'
  }
];
