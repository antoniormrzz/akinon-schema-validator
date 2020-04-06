import { Payload } from '../types/payload';
import { CheckError } from '../types/error';
import pipe from '../utils/pipe';

type choicesPayload = Payload<[]>;

let choicesDictatesDropdown = (payload: choicesPayload) => {
  if (payload.parent.data_type === 'dropdown') {
    return payload;
  } else {
    throw new CheckError(
      'choices dictates a data_type of "dropdown"!',
      payload.jessyString,
      payload.parent.data_type,
      'dropdown'
    );
  }
};

let hasOneOrMoreMembers = (payload: choicesPayload) => {
  if (payload.value.length > 1) {
    if (
      payload.value.every(e => {
        return (
          typeof e === 'object' &&
          'value' in e &&
          'label' in e &&
          Object.keys(e).length === 2
        );
      })
    ) {
      return payload;
    } else {
      throw new CheckError(
        'choices array members should be of type object, and have "label" and "value" properties, and no other properties',
        payload.jessyString,
        payload.value,
        null
      );
    }
  } else {
    throw new CheckError(
      'choices array should have more than one member',
      payload.jessyString,
      payload.value,
      null
    );
  }
};

export default pipe(choicesDictatesDropdown, hasOneOrMoreMembers);
