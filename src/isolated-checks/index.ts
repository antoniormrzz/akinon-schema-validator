import choices from './choices';
import data_type from './data_type';
import display from './display';
import key from './key';
import label from './label';
import multi from './multi';
import required from './required';
import schema from './schema';
import value from './value';
import is_localizable from './is_localizable';

import PayloadGeneratorFactory from '../utils/payload-generator';

import jessy from 'jessy';
import { CheckError } from '../types/error';

let tests = {
  choices,
  data_type,
  display,
  key,
  label,
  multi,
  required,
  schema,
  value,
  is_localizable
};

let runIsolatedChecksOnEndPoints = (baseObj, directKeys, allKeys, entries) => {
  let schemaMap = new Map();
  let choicesMap = new Map();
  directKeys.forEach((element) => {
    if ('schema' in baseObj[element]) {
      schemaMap.set(element + '.schema', true);
    }
  });
  entries.forEach((element) => {
    if ('choices' in jessy(element, baseObj)) {
      choicesMap.set(element + '.choices', true);
    }
  });
  let checkpoints = [
    ...Array.from(schemaMap.keys()),
    ...Array.from(choicesMap.keys()),
    ...allKeys,
  ];

  const payloadGenerator = PayloadGeneratorFactory(baseObj);

  checkpoints.forEach((e) => {
    let matched = e.match(/\.([^\.]*)$/);
    if (matched) {
      try {
        tests[e.match(/\.([^\.]*)$/)[1]](payloadGenerator(e));
      } catch (error) {
        throw error;
      }
    } else {
      throw new CheckError(
        'invalid jessy string',
        e,
        e,
        'atleast one dot expected'
      );
    }
  });
};

export default runIsolatedChecksOnEndPoints;
