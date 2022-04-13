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
