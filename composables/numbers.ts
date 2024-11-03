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

  formatCurrency(value: number, currency = "TRY") {
    let formattedNumber = Number(value);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (formattedNumber >= 1e12) {
      return formatter.format(formattedNumber / 1e12) + "T";
    }
    if (formattedNumber >= 1e9) {
      return formatter.format(formattedNumber / 1e9) + "B";
    } else if (formattedNumber >= 1e6) {
      return formatter.format(formattedNumber / 1e6) + "M";
    } else {
      return formatter.format(formattedNumber);
    }
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
