/**
 * Utils for web scraping scripts
 */

import moment from 'moment';

export const condenseAll = string => string.replace(/[^a-z0-9]/gi, '');

export const condenseName = string => string.replace(/[^a-z0-9+.]/gi, '');

export const condenseTitle = string => string.replace(/[^a-z0-9+&!-?]/gi, '');

export const condenseDomain = string => string.replace(/[^a-z0-9.]/gi, '');

export const condenseUrl = string => string.replace(/[^a-z0-9+&!?./]/gi, '');

const findLps = (string) => {
  const result = [];
  result.push(0);
  let j = 0;
  for (let i = 1; i < string.length; i++) {
    if (string[i] === string[j]) {
      result.push(j + 1);
      j++;
    } else {
      let same = false;
      while (!same && j > 0) {
        j = result[j - 1];
        if (string[i] === string[j]) {
          same = true;
        }
      }
      string[i] === string[j] ? result.push(result[j] + 1) : result.push(0);
    }
  }
  return result;
};

const foundSubstring = (string, target) => {
  // using Knuth-Morris-Pratt (KMP) substring search
  const lps = findLps(target);
  let i = 0; // counter for outer for loop going through string
  let j = i; // counter for inner for loop testing string against target word
  let k = 0; // counter for loop testing target against string

  for (i; i < string.length; i++) {
    if (string[i] === target[k]) {
      j = i;
      let mismatchFound = false;
      while (!mismatchFound) {
        if (string[j] === target[k]) {
          j++;
          k++;
        } else {
          k = lps[k - 1];
          mismatchFound = true;
        }
        if (k >= target.length) {
          return true;
        }
      }
    }
  }
  return false;
};

// TODO: find a more efficient way to do this?
export const findBrands = (str, availableBrands, type = null) => {
  let condense = null;
  if (type === 'title') {
    condense = condenseTitle;
  } else if (type === 'domain') {
    condense = condenseDomain;
  } else if (type === 'url') {
    condense = condenseUrl;
  } else {
    condense = condenseName;
  }
  const condensedStr = condense(str.toLowerCase());
  return availableBrands.filter((brand) => {
    if (type === 'domain') {
      return foundSubstring(condensedStr, condenseName(brand));
    }
    if (type === 'title' && brand.length < 4) {
      return foundSubstring(str.toLowerCase(), brand.toLowerCase());
    }
    if (type === 'url' && brand.length < 3) {
      return false;
    }
    return foundSubstring(condensedStr, condense(brand.toLowerCase()));
  });
};

export const findClass = (node, cls, result = []) => {
  if (!node || !node.children) {
    return result;
  }
  if (node.attribs && node.attribs.class === cls) {
    result.push(node);
  }
  for (let i = 0; i < node.children.length; i++) {
    findClass(node.children[i], cls, result);
  }
  return result;
};

export const findTag = (node, tag, result = []) => {
  if (!node || !node.children) {
    return result;
  }
  if (node.name && node.name === tag) {
    result.push(node);
  }
  for (let i = 0; i < node.children.length; i++) {
    findTag(node.children[i], tag, result);
  }
  return result;
};

export const formatDate = (date) => {
  date[0] = moment().month(date[0]).format('MM');
  date[1] = date[1].split('').slice(0, date[1].length - 1).join('');
  return date.join('-');
};
