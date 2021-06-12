import { ColorTypes } from 'theme-types'

export const colors: ColorTypes.list = {
  black: {
    default: '#202224',
    light: '#3c424d',
  },
  'blue-gray': {
    default: '#aab2c0',
    dark: '#626d81',
    light: '#DFE4ED',
    lighter: '#e9ecf1',
  },
  'background-gray': {
    default: '#f8f9fb',
  },
  'white-off': {
    default: '#ffffff',
  },
  primary: {
    default: '#17bab0',
    dark: '#007e86',
    light: '#abe0dd',
    lighter: '#f2fbfa',
  },
  secondary: {
    default: '#576b94',
    dark: '#2d3f62',
    light: '#8fa1c4',
    lighter: '#dde7f4',
  },
  accent: {
    default: '#ef4a67',
    dark: '#d9304e',
    lighter: '#fff3f3',
  },
  warning: {
    default: '#fdb953',
    dark: '#c16835',
    lighter: '#FFF9E3',
  },
  success: {
    default: '#3ca1ff',
    dark: '#0c62b1',
    lighter: '#e9f4ff',
  },
}
export const getColor: ColorTypes.get = (colorName, colorType) =>
  colorType
    ? colors[colorName][colorType] ?? ''
    : colors[colorName]?.default ?? ''

export const colorSet: ColorTypes.group = {
  props: colors,
  get: getColor,
}

export default colorSet
