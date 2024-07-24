declare module 'numeral' {
  interface Numeral {
    format: (format: string) => string;
  }

  interface NumeralStatic {
    (value?: any): Numeral;
  }

  const numeral: NumeralStatic;

  export default numeral; /*  */
}
