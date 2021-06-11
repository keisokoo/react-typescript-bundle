declare module 'theme-types' {
  export namespace ThemeTypes {
    interface props {
      [keys: string]:
        | ColorVariation
        | Typography
        | string
        | InterpolationValue
        | number
    }
    interface ColorVariation {
      default: string
      dark?: string
      light?: string
      lighter?: string
    }
    interface Typography {
      default: InterpolationValue
      bold?: InterpolationValue
      lighter?: InterpolationValue
    }
  }
}
