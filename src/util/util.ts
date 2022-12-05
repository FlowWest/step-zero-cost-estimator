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

export const resourceDataObjects: ResourceObject[] = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
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
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      "The Division of Drinking Water (DDW) acts as the administrative arm of the Utah Drinking Water Board. It is engaged in a variety of activities related to the design and operation of California's public drinking water systems.",
    title: 'DDW District Offices',
    link: 'https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/DDWdistrictofficesmap.pdf',
    category: 'governance'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'The Safe and Affordable Funding for Equity and Resilience (SAFER) Engagement Unit is a team of engineers and program specialists within the Division of Drinking Water. Our mission is to support water systems in achieving long-term sustainability.',
    title: 'DDW SAFER Engagement Units',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf',
    category: 'funding'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'The State Water Board supports water partnerships whenever feasible, a component of the Safe and Affordable Fund for Equity and Resilience (SAFER) program. Water partnerships can take many forms, including: local resource sharing, physical consolidation, managerial consolidation, and full regionalization.',
    title: "DDW's Water Partnership Page",
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/waterpartnership.html',
    category: 'technicalAssistance'
  }
];
