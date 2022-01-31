export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === "string" || PLN instanceof String) {
    return NaN;
  }
  if (PLN === undefined) {
    return NaN;
  }
  if (
    PLN === null ||
    PLN.constructor === Object ||
    PLN.constructor === Array ||
    PLN.constructor === Function
  ) {
    return "Error";
  }
  if (PLN < 0) {
    return "$0.00";
  }
  const PLNtoUSD = PLN / 3.5;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(PLNtoUSD);
};
