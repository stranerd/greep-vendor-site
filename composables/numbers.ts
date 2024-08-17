import numeral from "numeral";

export const gpNumbers = {
  formatNumber(value: number | string) {
    let formattedNumber = value;
    if (typeof value === "string") {
      formattedNumber = parseFloat(value);
    }
    return `${numeral(formattedNumber).format("0,0")}`;
  },

  formatDecimals(value: number) {
    return `${numeral(value).format("0,0.00")}`;
  },

  formatCurrency(value: number | string, currency = "TRY") {
    let formattedNumber = value;
    if (typeof value === "string") {
      formattedNumber = parseFloat(value);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency,
    }).format(formattedNumber as number);
  },

  convertCurrencyToNumber(value: string | number) {
    if (typeof value === "number") return value;
    else if (typeof value === "string") {
      const numberString = value.replace(/[^0-9.-]+/g, "");
      if (numberString === "") return 0;
      else return parseFloat(numberString);
    }
  },
};
