const x = { name: "NGN", king: "Jame" };

const dataObj = Object.entries(x).map(([currency, rate]) => ({
  currency,
  rate,
}));

console.log(dataObj);
