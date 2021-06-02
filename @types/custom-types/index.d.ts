declare module 'custom-types' {
  export namespace customTypes {
    type foo = string
    interface Bar {
      baz: number
    }
  }
}
interface CSSModule {
  [key: string]: string;
}

declare module '*.css' {
  const styles: CSSModule;
  export default styles;
}
declare module '*.scss' {
  const styles: CSSModule;
  export default styles;
}