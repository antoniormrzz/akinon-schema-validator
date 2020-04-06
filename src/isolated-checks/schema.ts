import { Payload } from '../types/payload';
import { CheckError } from '../types/error';
import pipe from '../utils/pipe';

type schemaPayload = Payload<string>;

let schemaDictatesNested = (payload: schemaPayload) => {
  if (payload.parent.data_type === 'nested') {
    return payload;
  } else {
    throw new CheckError(
      'schema dictates a data_type of "nested"!',
      payload.jessyString,
      payload.parent.data_type,
      'nested'
    );
  }
};

let hasOneOrMoreChildren = (payload: schemaPayload) => {
  if (Object.keys(payload.value).length > 0) {
    return payload;
  } else {
    throw new CheckError(
      'schema should have children',
      payload.jessyString,
      payload.value,
      null
    );
  }
};

export default pipe(schemaDictatesNested, hasOneOrMoreChildren);
