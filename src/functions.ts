import {
  EssentialProperties,
  AcceptableProperties,
  AcceptableTypes,
} from './enums';
import keys from 'all-object-keys';
import jessy from 'jessy';
import isolatedChecks from './isolated-checks';
import { CheckError } from './types/error';
import { SpellCheckProvider } from './services/spellcheck-provider';

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
  entries.forEach((e) => {
    if (baseObj[e].schema && typeCheck(baseObj[e].schema, 'object')) {
      Object.keys(baseObj[e].schema).forEach((el) => {
        temp.push(e + '.schema.' + el);
      });
    }
  });
  return [...entries, ...temp];
};

let hasEssentials = (obj) => {
  let condition = true;
  if (!typeCheck(obj, 'object')) {
    return false;
  } else {
    let properties = Object.keys(obj);
    EssentialProperties.forEach((element) => {
      if (!properties.includes(element)) {
        condition = false;
      }
    });
    return condition;
  }
};

let MainCheckFactory = (baseObj) => {
  const directKeys = Object.keys(baseObj);
  const allKeys: string[] = keys(baseObj);
  const entries: string[] = getEntries(baseObj, directKeys);

  return {
    baseObjectHasChildren: () => {
      if (directKeys.length > 0) {
        return true;
      } else {
        throw new CheckError(
          'Root object should have children!',
          'Root Object',
          '{}',
          '{...}'
        );
      }
    },
    allEntriesAreObjects: () => {
      for (const iterator of entries) {
        let value = jessy(iterator, baseObj);
        let result = typeCheck(value, 'object');
        if (!result) {
          throw new CheckError(
            'All entries should be Objects!',
            iterator,
            typeof value === 'object' ? 'array' : typeof value,
            '{...}'
          );
        }
      }
      return true;
    },
    allEssentialProperties: () => {
      for (const element of entries) {
        let value = jessy(element, baseObj);
        if (!check(value, hasEssentials)) {
          throw new CheckError(
            'All entries should have data_type, key and label properties!',
            element,
            value,
            '{data_type : ...., key : ..., label : ...}'
          );
        }
      }
      return true;
    },
    allPropertyNamesAreValid: () => {
      for (const iterator of allKeys) {
        let disected = iterator.split('.');
        if (disected.length < 2) {
          // this shouldn't ever execute, but we all know how shit is capable of hitting the fan all the time
          throw new CheckError(
            'Root object children should be Objects!',
            iterator,
            typeof jessy(iterator, baseObj),
            '{...}'
          );
        } else {
          for (let index = 1; index < disected.length; index += 2) {
            if (!AcceptableProperties.includes(disected[index])) {
              let lookup = '';
              let lookupResult = SpellCheckProvider.getDictionaries().property.lookup(
                disected[index]
              );
              if (
                lookupResult.suggestions &&
                lookupResult.suggestions.length > 0 &&
                lookupResult.suggestions[0].found
              ) {
                lookup =
                  ' did you mean "' + lookupResult.suggestions[0].word + '" ?';
              }
              throw new CheckError(
                'Property name is invalid!' + lookup,
                iterator,
                disected[index],
                AcceptableProperties
              );
            }
          }
        }
      }
      return true;
    },
    allTypesAreCorrect: () => {
      for (const iterator of allKeys) {
        let disected = iterator.split('.');
        if (disected.length < 2) {
          // this shouldn't ever execute, but we all know how shit is capable of hitting the fan all the time
          throw new CheckError(
            'Root object children should be Objects!',
            iterator,
            typeof jessy(iterator, baseObj),
            '{...}'
          );
        } else {
          for (let index = 1; index < disected.length; index += 2) {
            let jessyString = buildJessyString(disected, index);
            let value = jessy(jessyString, baseObj);
            if (!typeCheck(value, AcceptableTypes[disected[index]])) {
              throw new CheckError(
                'Incorrect property type!',
                jessyString,
                Array.isArray(value) ? 'array' : typeof value,
                AcceptableTypes[disected[index]]
              );
            }
          }
        }
      }
      return true;
    },
    keysEqualPropertyNames: () => {
      for (const element of allKeys) {
        let regexResult = element.match(/([^\.]*)\.key/);
        if (regexResult) {
          let value = jessy(element, baseObj);
          if (!(regexResult[1] === value)) {
            throw new CheckError(
              'Keys should equal object names!',
              element,
              value,
              regexResult[1]
            );
          }
        }
      }
      return true;
    },
    // data_type and display values are acceptable
    // these were implemented in isolated checks
    // valuesAreAcceptable: () => {
    //   for (const element of allKeys) {
    //     let regexResult = element.match(/[^.]*$/);
    //     if (regexResult && Object.keys(AcceptableValues).includes(regexResult[0])) {
    //       let value = jessy(element, baseObj);
    //       if (!AcceptableValues[regexResult[0]].includes(value)) {
    //         throw new CheckError(
    //           regexResult[0]+' value is not acceptable!',
    //           element,
    //           value,
    //           AcceptableValues[regexResult[0]]
    //         );
    //       }
    //     }
    //   }
    //   return true;
    // },
    noNestedInNested: () => {
      for (const iterator of allKeys) {
        if (iterator.split(/\.schema\b/).length > 2)  {
          throw new CheckError(
            'There can be only one level of nesting via Schema!',
            iterator,
            '{ schema: { ...: { schema: ... } } }',
            'no nested objects in nested objects'
          );
        }
      }
      return true;
    },
    noMultiInMulti: () => {
      let multiArray = allKeys.filter(
        (e) => e.match(/\.([^\.]*)$/)[1] === 'multi' && jessy(e, baseObj)
      );
      for (const iterator of multiArray) {
        let disected = iterator.split('.');
        if (disected.length > 2) {
          let jessyString =disected.slice(0, disected.length - 3).join('.');
          if (
            jessy(jessyString, baseObj)[
              'multi'
            ]
          ) {
            throw new CheckError(
              'Multi objects can\'t have nested multi objects in them!',
              jessyString,
              '{ multi: true }',
              'no nested multi in multi'
            );
          }
        }
      }
      return true;
    },
    isolated: () => {
      try {
        isolatedChecks(baseObj, directKeys, allKeys, entries);
      } catch (error) {
        throw error;
      }
    },
  };
};

export default MainCheckFactory;
