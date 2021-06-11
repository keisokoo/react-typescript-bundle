import { ThemeTypes } from 'theme-types'
import styled, { css } from 'styled-components'

interface TypographyCSStoStyled {
  large: ThemeTypes.Typography
  medium: ThemeTypes.Typography
  small: ThemeTypes.Typography
}
interface FontFace {
  size: number | string
  weight: number | string
  line: number | string
  spacing: number | string
}
const font = ({ size, weight, line, spacing }: FontFace) => `
    font-weight: ${weight || 400};
    font-size: ${size || '14px'};
    letter-spacing: ${spacing || '-0.3%'};
    line-height: ${line || '20px'}
`

const DisplayLarge = css`
  ${font({ size: '26px', weight: 400, line: '34px', spacing: '-0.3%' })}
`
const DisplayLargeBold = css`
  ${DisplayLarge}
  font-weight: 700;
`

export const DisplayLargeElement = styled.div`
  ${DisplayLarge}
`

export const display: TypographyCSStoStyled = {
  large: {
    default: DisplayLarge,
    bold: DisplayLargeBold,
  },
  medium: {
    default: '',
    bold: '',
  },
  small: {
    default: '',
    bold: '',
  },
}

const baseShadow = css`
  box-shadow: ${(props: { color?: string }) =>
    `0 10px 6px -6px ${props.color || '#777'}`};
`
const typography: ThemeTypes.props = {
  test: baseShadow,
}
export default typography
