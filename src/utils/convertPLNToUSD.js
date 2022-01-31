export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === "string" || PLN === undefined) {
    return NaN;
  }

  if (
    typeof PLN !== 'number' && typeof PLN !== 'string'
  ) {
    return "Error";
  }
  if (PLN < 0) {
    return 0;
  }
  const PLNtoUSD = PLN / 3.5;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(PLNtoUSD);
};
