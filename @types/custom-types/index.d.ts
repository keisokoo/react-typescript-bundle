declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}
declare module 'custom-types' {
  export namespace customTypes {
    type foo = string
    interface Bar {
      baz: number
    }
  }
}
interface CSSModule {
  [key: string]: string
}

declare module '*.css' {
  const styles: CSSModule
  export default styles
}
declare module '*.scss' {
  const styles: CSSModule
  export default styles
}
