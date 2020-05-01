export const AcceptableValues = {
  data_type: ['text', 'image', 'dropdown', 'area', 'nested'],
  display: ['html-editor', 'date_picker', 'color_picker']
};

export const AcceptableTypes = {
  data_type: 'string',
  key: 'string',
  label: 'string',
  display: 'string',
  required: 'boolean',
  multi: 'boolean',
  value: 'string',
  schema: 'object',
  choices: 'array',
  is_localizable: 'boolean'
};

export const EssentialProperties = ['data_type', 'key', 'label'];

export const AcceptableProperties = [
  'data_type',
  'key',
  'label',
  'display',
  'required',
  'multi',
  'value',
  'schema',
  'choices',
  'is_localizable'
];
