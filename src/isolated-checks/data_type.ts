import { AcceptableValues } from '../enums';
import { Payload } from '../types/payload';
import { CheckError } from '../types/error';
import pipe from '../utils/pipe';

type data_typePayload = Payload<string>;

let checkValue = (payload: data_typePayload) => {
  if (AcceptableValues.data_type.includes(payload.value)) {
    return payload;
  } else {
    throw new CheckError(
      'Unexpected data_type value!',
      payload.jessyString,
      payload.value,
      AcceptableValues.data_type
    );
  }
};

let nestedDictatesSchema = (payload: data_typePayload) => {
  if (
    (payload.value === 'nested' && 'schema' in payload.parent) ||
    payload.value !== 'nested'
  ) {
    return payload;
  } else {
    throw new CheckError(
      'no schema found for nested data_type!',
      payload.jessyString,
      payload.parent.display,
      'object'
    );
  }
};

let areaDictatesDisplayHtml = (payload: data_typePayload) => {
  if (
    (payload.value === 'area' && payload.parent.display === 'html-editor') ||
    payload.value !== 'area'
  ) {
    return payload;
  } else {
    throw new CheckError(
      'data_type area requires "display":"html-editor" !',
      payload.jessyString,
      payload.parent.display,
      'html-editor'
    );
  }
};

let dropdownDictatesChoices = (payload: data_typePayload) => {
  if (
    (payload.value === 'dropdown' && 'choices' in payload.parent) ||
    payload.value !== 'dropdown'
  ) {
    return payload;
  } else {
    throw new CheckError(
      'data_type dropdown requires choices array!',
      payload.jessyString,
      payload.parent.choices,
      'array'
    );
  }
};

export default pipe(
  checkValue,
  nestedDictatesSchema,
  areaDictatesDisplayHtml,
  dropdownDictatesChoices
);
