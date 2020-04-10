import { AcceptableValues } from '../enums';
import { Payload } from '../types/payload';
import { CheckError } from '../types/error';
import pipe from '../utils/pipe';
import { SpellCheckProvider } from '../services/spellcheck-provider';

type displayPayload = Payload<string>;

let checkValue = (payload: displayPayload) => {
  if (AcceptableValues.display.includes(payload.value)) {
    return payload;
  } else {
    let lookup = '';
    if (typeof payload.value === 'string') {
      let lookupResult = SpellCheckProvider.getDictionaries().display.lookup(
        payload.value
      );
      if (
        lookupResult.suggestions &&
        lookupResult.suggestions.length > 0 &&
        lookupResult.suggestions[0].found
      ) {
        lookup = ' did you mean "' + lookupResult.suggestions[0].word + '" ?';
      }
    }
    throw new CheckError(
      'Unexpected display value!' + lookup,
      payload.jessyString,
      payload.value,
      AcceptableValues.display
    );
  }
};

// if display is color or date, data_type needs to be 'text'
let colorAndDateDictateDTtext = (payload: displayPayload) => {
  if (
    (payload.value === 'color_picker' && payload.parent.data_type === 'text') ||
    (payload.value === 'date_picker' && payload.parent.data_type === 'text') ||
    (payload.value !== 'color_picker' && payload.value !== 'date_picker')
  ) {
    return payload;
  } else {
    throw new CheckError(
      'if display is color or date picker, data_type needs to be "text"',
      payload.jessyString,
      payload.parent.data_type,
      'text'
    );
  }
};

let displayHtmlDictatesArea = (payload: displayPayload) => {
  if (
    (payload.value === 'html-editor' && payload.parent.data_type === 'area') ||
    payload.value !== 'html-editor'
  ) {
    return payload;
  } else {
    throw new CheckError(
      'data_type area is required for display html editor!',
      payload.jessyString,
      payload.parent.data_type,
      'area'
    );
  }
};

export default pipe(
  checkValue,
  colorAndDateDictateDTtext,
  displayHtmlDictatesArea
);
