const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true, $data: true })
addFormats(ajv)

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: {
      type: 'string',
      minLength: 6,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).*$',
    },
    confirmPassword: { type: 'string', const: { $data: '1/password' } },
  },
  required: ['email', 'name', 'password', 'confirmPassword'],
  additionalProperties: false,
}

module.exports = ajv.compile(schema)
