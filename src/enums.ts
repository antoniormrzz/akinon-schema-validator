export let AcceptableValues = {
  data_type: ['text', 'image', 'dropdown', 'area', 'nested'],
  display: ['html-editor', 'date_picker', 'color_picker']
};

export let AcceptableTypes = {
  data_type: 'string',
  key: 'string',
  label: 'string',
  display: 'string',
  required: 'boolean',
  multi: 'boolean',
  value: 'string',
  schema: 'object',
  choices: 'array'
};

export let EssentialProperties = ['data_type', 'key', 'label'];

export let AcceptableProperties = [
  'data_type',
  'key',
  'label',
  'display',
  'required',
  'multi',
  'value',
  'schema',
  'choices'
];
