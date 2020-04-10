import { Payload } from '../types/payload';
import jessy from 'jessy';
import { CheckError } from '../types/error';

// hof factory, returns payload generator
export default function (baseObj: any): (jessyString: string) => Payload<any> {
  return (jessyString: string): Payload<any> => {
    let parentJessy = jessyString.match(/^(.*)\.([^\.]*)$/)[1];
    if (parentJessy) {
      return {
        jessyString,
        value: jessy(jessyString, baseObj),
        baseObj,
        parent: jessy(parentJessy, baseObj),
      };
    } else {
      throw new CheckError(
        'invalid jessy string',
        jessyString,
        jessyString,
        'atleast one dot required'
      );
    }
  };
}
