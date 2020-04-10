import spelling from 'spelling';
import { AcceptableProperties, AcceptableValues } from '../enums';

export class SpellCheckProvider {
  private static dictionaries;

  public static getDictionaries = () => {
    if (SpellCheckProvider.dictionaries) {
      return SpellCheckProvider.dictionaries;
    } else {
      let dictionaries: any = {};
      dictionaries.property = new spelling(AcceptableProperties);
      dictionaries.data_type = new spelling(AcceptableValues.data_type);
      dictionaries.display = new spelling(AcceptableValues.display);

      SpellCheckProvider.dictionaries = { ...dictionaries };
      return SpellCheckProvider.dictionaries;
    }
  };
}
