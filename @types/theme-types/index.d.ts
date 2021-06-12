declare module 'theme-types' {
  type Assignable =
    | ColorVariation
    | Typography
    | string
    | InterpolationValue
    | number
  export namespace ColorTypes {
    interface group {
      props: list
      get: get
    }
    type list = {
      [key in
        | 'black'
        | 'blue-gray'
        | 'background-gray'
        | 'white-off'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'warning'
        | 'success']: Variation
    }
    interface Variation {
      default: string
      dark?: string
      light?: string
      lighter?: string
    }
    type get = (colorName: keyof list, colorType?: keyof Variation) => string
  }
  export namespace ThemeTypes {
    interface props {
      [keys: string]: Assignable
    }
    interface Typography {
      default: InterpolationValue
      bold?: InterpolationValue
      lighter?: InterpolationValue
    }
  }
}
