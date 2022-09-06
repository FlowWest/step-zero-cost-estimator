import { startCase } from 'lodash';

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
