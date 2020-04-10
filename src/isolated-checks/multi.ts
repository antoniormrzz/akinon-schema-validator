import { Payload } from '../types/payload';
import { WarningProvider } from '../services/warning-provider';

type multiPayload = Payload<boolean>;

let warnIfFalse = (payload: multiPayload) => {
  if (payload.value === false) {
    WarningProvider.getInstance().addWarning({
      jessyString: payload.jessyString,
      message: 'multi defaults to false, no need to set it manually.'
    });
  }
  return payload;
};

export default warnIfFalse;
