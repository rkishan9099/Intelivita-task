/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../types/type";

export const isValidJSONFormat = (data: any): boolean => {
  if (!Array.isArray(data)) return false;
  
  return data.every((item) => 
    typeof item === 'object' && 
    'id' in item && 
    'name' in item && 
    'email' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    typeof item.name === 'string' &&
    typeof item.email === 'string'
  );
};

export const removeDuplicatesByEmail = (data: User[]): { 
  uniqueData: User[], 
  duplicatesRemoved: number 
} => {
  const uniqueEmails = new Set<string>();
  const uniqueData: User[] = [];
  let duplicatesRemoved = 0;

  data.forEach(item => {
    const email = item.email.toLowerCase().trim();
    
    if (!uniqueEmails.has(email)) {
      uniqueEmails.add(email);
      uniqueData.push(item);
    } else {
      duplicatesRemoved++;
    }
  });

  return { uniqueData, duplicatesRemoved };
};

export const mergeJSONData = (existingData: User[], newData: User[]): { 
  mergedData: User[], 
  duplicatesRemoved: number 
} => {
  const allData = [...existingData, ...newData];
  const { uniqueData, duplicatesRemoved } = removeDuplicatesByEmail(allData);
  
  return { 
    mergedData: uniqueData, 
    duplicatesRemoved 
  };
};

