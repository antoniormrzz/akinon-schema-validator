import { Payload } from '../types/payload';
import { CheckError } from '../types/error';
import pipe from '../utils/pipe';

type keyPayload = Payload<string>;

let notEmpty = (payload: keyPayload) => {
  if (payload.value.trim().length > 0) {
    return payload;
  } else {
    throw new CheckError(
      'keys should not be empty!',
      payload.jessyString,
      payload.value,
      'a key string'
    );
  }
};

let noWeirdChars = (payload: keyPayload) => {
  if (!payload.value.match(/[^\w-]/)) {
    return payload;
  } else {
    throw new CheckError(
      'keys can only contain a-z A-Z - _ 0-9',
      payload.jessyString,
      payload.value.match(/[^\w-]/)[0],
      'a valid key string'
    );
  }
};


export default pipe(notEmpty, noWeirdChars);
