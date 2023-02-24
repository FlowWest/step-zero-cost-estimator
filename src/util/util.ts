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

const waterBoardsLogo =
  'data:image/png;base64,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';

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
    logo: 'https://dashboards.efc.sog.unc.edu/efc_logo_new.png',
    description: `Tool to help set water and/or wastewater rates next year by projecting the utility's expenses, revenues from rates, and fund balance.`,
    title: 'Water And Wastewater Rates Analysis Model',
    link: 'https://efc.sog.unc.edu/resource/water-and-wastewater-rates-analysis-model/',
    category: 'waterRates'
  },
  {
    logo: 'http://sourcewaterpa-archive.prwa.com/wp-content/uploads/2014/12/SDWA-40-Anniv-Logo-JPEG-279x300.jpg',
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
    logo: 'https://www.waterboards.ca.gov/images/water_issues/prop_1_logo.jpg',
    description:
      'The Office of Sustainable Water Solutions (OSWS) administers the Technical Assistance (TA) Funding Program. TA is available to help small, disadvantaged communities (DACs) develop, fund, and implement eligible drinking water, wastewater, stormwater, or groundwater needs.',
    title: 'Technical Assistance Funding Program',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/tech_asst_funding.html',
    category: 'funding'
  },
  {
    logo: 'https://catalog.dcc.edu/mime/media/11/213/Financial%20Assistance2.jpg',
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
    logo: 'https://www.rcac.org/wp-content/uploads/2014/12/rcac-header-logo.png',
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
    logo: 'https://www.danville.ca.gov/ImageRepository/Document?documentId=4160',
    description:
      'Senate Bill (SB) 403, will prevent water contamination and water system failures in disadvantaged communities throughout California by authorizing the State Water Resources Control Board (SWRCB) to mandate the consolidation of a water system that is at-risk of failing.',
    title: 'SB-403 Drinking Water: Consolidation',
    link: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB403',
    category: 'legislation'
  },
  {
    logo: 'https://www.danville.ca.gov/ImageRepository/Document?documentId=4160',
    description:
      'New legislation effective January 1st, 2023 allows the State Water Board to assign an administrator to water systems that are designated as “At-Risk”.  Administrators can provide administration, technical, operational, legal or managerial services of a water system. Full managerial control results in the water system relinquishing all water system duties and powers to the administrator.',
    title: 'SB-1254 Drinking Water: Administrator: Managerial and Other Services',
    link: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1254',
    category: 'legislation'
  },
  {
    logo: 'https://www.danville.ca.gov/ImageRepository/Document?documentId=4160',
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
