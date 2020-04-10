import MainCheckFactory, { check } from './functions';
import { chain } from './utils/chain';
import { CheckError } from './types/error';
import { WarningProvider } from './services/warning-provider';
// import jessy from 'jessy';

let example = {
  sliders: {
    multi: true,
    schema: {
      name: {
        data_type: 'text',
        key: 'name',
        label: 'Isim',
      },
      answer: {
        data_type: 'area',
        display: 'html-editor',
        key: 'answer',
        label: 'Cevap',
      },
      button_alignment: {
        choices: [
          {
            value: 'block',
            label: 'Alt alta',
          },
          {
            value: 'inline',
            label: 'Yan yana',
          },
        ],
        data_type: 'dropdown',
        key: 'button_alignment',
        label: 'Butonlar yan yana mı görünsün, alt alta mı?',
      },
    },
    data_type: 'nested',
    key: 'sliders',
    label: 'Sliderlar',
  },
};

let _ = MainCheckFactory(example);

// _.baseObjectHasChildren,
// _.allEntriesAreObjects,
// _.allEssentialProperties,
// _.allPropertyNamesAreValid,
// _.allTypesAreCorrect,
// _.keysEqualPropertyNames,
// _.noNestedInNested,
// _.noMultiInMulti,
// _.isolated,
try {
  console.log(
    chain(
      _.baseObjectHasChildren,
      _.allEntriesAreObjects,
      _.allEssentialProperties,
      _.allPropertyNamesAreValid,
      _.allTypesAreCorrect,
      _.keysEqualPropertyNames,
      _.noNestedInNested,
      _.noMultiInMulti,
      _.isolated
    )
  );
} catch (error) {
  console.error(error.getDetails());
} finally {
  console.log(WarningProvider.getInstance().getWarnings());
}

// console.log('allEssentials', check(_.allEssentialProperties));
// console.log('keys equal', check(_.keysEqualPropertyNames));
// console.log('allEntriesAreObjects', check(_.allEntriesAreObjects));
// console.log('baseObjectHasChildren', check(_.baseObjectHasChildren));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid)); // allTypesAreCorrect
// console.log('allTypesAreCorrect', check(_.allTypesAreCorrect));
// console.log('noMultiInMulti', check(_.noMultiInMulti));
// console.log('noNestedInNested', check(_.noNestedInNested));
// console.log('isolated', check(_.isolated));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log(jessy('images',example));

// let a = 'about';
// let b = a.match(/^(.*)\.([^\.]*)$/);
// // let b = a.split(/\.schema\b/);
// // let b = a.split('.');
// console.log(b);
