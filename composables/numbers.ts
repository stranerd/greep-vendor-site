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
    } else if (formattedNumber >= 1e3) {
      return formatter.format(formattedNumber / 1e3) + "k";
    } else {
      return formatter.format(formattedNumber);
    }
  },

  formatNumberToCurrency(value: number, currency = "USD") {
    // Define a formatter for the currency style
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (value >= 1e9) {
      return formatter.format(value / 1e6) + "B";
    } else if (value >= 1e6) {
      return formatter.format(value / 1e6) + "M";
    } else if (value >= 1e3) {
      return formatter.format(value / 1e3) + "k";
    } else {
      return formatter.format(value);
    }
  },

  // Example usage:    // "$500.00"

  convertCurrencyToNumber(value: string | number) {
    if (typeof value === "number") return value;
    else if (typeof value === "string") {
      const numberString = value.replace(/[^0-9.-]+/g, "");
      if (numberString === "") return 0;
      else return parseFloat(numberString);
    }
  },
};
