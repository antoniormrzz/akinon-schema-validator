import { Payload } from '../types/payload';
import { WarningProvider } from '../services/warning-provider';

type requiredPayload = Payload<boolean>;

let warnIfTrue = (payload: requiredPayload) => {
  if (payload.value === true) {
    WarningProvider.getInstance().addWarning({
      jessyString: payload.jessyString,
      message: 'required defaults to true, no need to set it manually.',
      type: 'others'
    });
  }
  return payload;
};

export default warnIfTrue;
