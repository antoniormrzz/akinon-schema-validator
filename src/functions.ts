import {
  EssentialProperties,
  AcceptableValues,
  AcceptableProperties,
  AcceptableTypes
} from './enums';
import keys from 'all-object-keys';
import jessy from 'jessy';
import isolatedChecks from './isolated-checks';

export let check = (...data) => {
  if (data.length === 1) {
    return data[0]();
  } else {
    return data[1](data[0]);
  }
};

let typeCheck = (obj, type) => {
  if (type === 'array') {
    return Array.isArray(obj);
  } else {
    return typeof obj === type;
  }
};

let buildJessyString = (array: string[], index: number) => {
  let temp = [];
  for (let i = 0; i <= index; i++) {
    temp.push(array[i]);
  }
  return temp.join('.');
};

let getEntries = (baseObj, directKeys) => {
  const entries = [...directKeys];
  const temp = [];
  entries.forEach(e => {
    if (baseObj[e].schema) {
      // todo: try catch
      Object.keys(baseObj[e].schema).forEach(el => {
        temp.push(e + '.schema.' + el);
      });
    }
  });
  return [...entries, ...temp];
};

let hasEssentials = obj => {
  let properties = Object.keys(obj);
  let condition = true;
  EssentialProperties.forEach(element => {
    if (!properties.includes(element)) {
      condition = false;
    }
  });
  return condition;
};

let cacheGenerator = baseObj => {
  const directKeys = Object.keys(baseObj);
  const allKeys: string[] = keys(baseObj);
  const entries: string[] = getEntries(baseObj, directKeys);

  // console.log(allKeys);
  // console.log(entries);
  return {
    allEssentialProperties: () => {
      let condition = true;
      for (const element of entries) {
        if (!check(jessy(element, baseObj), hasEssentials)) condition = false;
        if (!condition) break;
      }
      return condition;
    },
    keysEqualPropertyNames: () => {
      let condition = true;
      for (const element of allKeys) {
        let regexResult = element.match(/([^\.]*)\.key/);
        if (regexResult) {
          condition = regexResult[1] === jessy(element, baseObj);
          if (!condition) break;
        }
      }
      return condition;
    },
    valuesAreAcceptable: () => {
      let condition = true;
      for (const element of allKeys) {
        let regexResult = element.match(/[^.]*$/);
        if (
          regexResult &&
          Object.keys(AcceptableValues).includes(regexResult[0])
        ) {
          condition = AcceptableValues[regexResult[0]].includes(
            jessy(element, baseObj)
          );
          if (!condition) break;
        }
      }
      return condition;
    },
    allEntriesAreObjects: () => {
      let condition = true;
      for (const iterator of entries) {
        condition =
          typeof jessy(iterator, baseObj) === 'object'
            ? !Array.isArray(jessy(iterator, baseObj))
            : false;
        if (!condition) break;
      }
      return condition;
    },
    baseObjectHasChildren: () => {
      return directKeys.length > 0;
    },
    allPropertyNamesAreValid: () => {
      let condition = true;
      for (const iterator of allKeys) {
        let disected = iterator.split('.');
        if (disected.length < 2) {
          return false;
        } else {
          for (let index = 1; index < disected.length; index += 2) {
            condition = AcceptableProperties.includes(disected[index]);
            if (!condition) return condition;
          }
        }
      }
      return condition;
    },
    allTypesAreCorrect: () => {
      let condition = true;
      for (const iterator of allKeys) {
        let disected = iterator.split('.');
        if (disected.length < 2) {
          return false;
        } else {
          for (let index = 1; index < disected.length; index += 2) {
            condition = typeCheck(
              jessy(buildJessyString(disected, index), baseObj),
              AcceptableTypes[disected[index]]
            );
            if (!condition) return condition;
          }
        }
      }
      return condition;
    },
    noMultiInMulti: () => {
      let multiArray = allKeys.filter(
        e => e.match(/\.([^\.]*)$/)[1] === 'multi' && jessy(e, baseObj)
      );
      for (const iterator of multiArray) {
        let disected = iterator.split('.');
        if (disected.length > 2) {
          if (
            jessy(disected.slice(0, disected.length - 3).join('.'), baseObj)[
              'multi'
            ]
          ) {
            return false;
          }
        }
      }
      return true;
    },
    noNestedInNested: () => {
      for (const iterator of allKeys) {
        if (iterator.split(/\.schema\b/).length > 2) return false;
      }
      return true;
    },
    isolated: () => {
      // implement this
      isolatedChecks(baseObj, directKeys, allKeys, entries);
      return true;
    }
  };
};

export default cacheGenerator;
