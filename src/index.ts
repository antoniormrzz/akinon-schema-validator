import cacheGenerator, { check } from './functions';
// import jessy from 'jessy';

let example = {
  images: {
    multi: true,
    schema: {
      url: {
        data_type: 'text',
        key: 'url',
        label: 'Link'
      },
      image: {
        data_type: 'image',
        key: 'image',
        label: 'Resim'
      },
      title: {
        data_type: 'text',
        key: 'title',
        label: 'Başlık'
      }
    },
    data_type: 'nested',
    key: 'images',
    required: false,
    label: 'Navigasyon Resimleri'
  },
  about: {
    multi: true,
    schema: {
      about_url: {
        data_type: 'text',
        key: 'about_url',
        label: 'Link'
      },
      url_text: {
        data_type: 'text',
        key: 'url_text',
        label: 'Daha Fazla Yazısı'
      },
      image: {
        data_type: 'image',
        key: 'image',
        label: 'Resim'
      },
      desc: {
        data_type: 'text',
        key: 'desc',
        label: 'Açıklama'
      },
      title: {
        data_type: 'text',
        key: 'title',
        label: 'Başlık'
      }
    },
    data_type: 'nested',
    key: 'about',
    required: false,
    label: 'Hakkımızda Linki (en fazla 3 adet)'
  },
  css_class: {
    data_type: 'text',
    key: 'css_class',
    required: false,
    label: 'CSS Selector Class'
  },
  color: {
    data_type: 'text',
    key: 'color',
    label: 'Kare Rengi',
    required: false,
    display: 'color_picker'
  },
  nav_image: {
    data_type: 'image',
    key: 'nav_image',
    required: false,
    label: 'Resim'
  },
  nav_image_url: {
    data_type: 'text',
    key: 'nav_image_url',
    required: false,
    label: 'Resim URL'
  },
  newtab: {
    choices: [
      {
        value: 'false',
        label: 'Hayır'
      },
      {
        value: 'true',
        label: 'Evet'
      }
    ],
    data_type: 'dropdown',
    required: false,
    key: 'newtab',
    label: 'Yeni sekmede mi açılacak?'
  }
};

let _ = cacheGenerator(example);

console.log('allEssentials', check(_.allEssentialProperties));
console.log('keys equal', check(_.keysEqualPropertyNames));
console.log('values are acceptable', check(_.valuesAreAcceptable));
console.log('allEntriesAreObjects', check(_.allEntriesAreObjects));
console.log('baseObjectHasChildren', check(_.baseObjectHasChildren));
console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid)); // allTypesAreCorrect
console.log('allTypesAreCorrect', check(_.allTypesAreCorrect));
console.log('noMultiInMulti', check(_.noMultiInMulti));
console.log('noNestedInNested', check(_.noNestedInNested));
console.log('isolated', check(_.isolated));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log('allPropertyNamesAreValid', check(_.allPropertyNamesAreValid));
// console.log(jessy('images',example));

let a = 'about.schema.about_url.dsfsd';
// let b = a.match(/\.([^\.]*)$/);
let b = a.split(/\.schema\b/);
// let b = a.split('.');
console.log(b);
