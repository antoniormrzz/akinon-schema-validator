import { Payload } from '../types/payload';
import { CheckError } from '../types/error';

type labelPayload = Payload<string>;

let notEmpty = (payload: labelPayload) => {
  if (payload.value.trim().length > 0) {
    return payload;
  } else {
    throw new CheckError(
      'label should not be empty!',
      payload.jessyString,
      payload.value,
      'a descriptive string'
    );
  }
};

export default notEmpty;
