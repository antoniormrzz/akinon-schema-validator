import MainCheckFactory, { check } from './functions';
import { chain } from './utils/chain';
import { WarningProvider } from './services/warning-provider';
  
globalThis.validator = function (schema) {
  let result: any = {};
  try {
    let _ = MainCheckFactory(schema);
    chain(
      _.baseObjectHasChildren,
      _.allEntriesAreObjects,
      _.allEssentialProperties,
      _.allPropertyNamesAreValid,
      _.allTypesAreCorrect,
      _.keysEqualPropertyNames,
      _.noNestedInNested,
      _.noMultiInMulti,
      _.isolated
    );
    result.success = true;
  } catch (error) {
    result.error = error;
  } finally {
    result.warnings = WarningProvider.getInstance().getWarnings();
    return result;
  }
}
