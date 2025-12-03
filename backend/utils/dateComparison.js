export function checkInsuranceExpiration(insDateString) {
  // insDateString comes as "DD-MM-YYYY"
  const [day, month, year] = insDateString.split("-");

  const insuranceDate = new Date(`${year}-${month}-${day}`); // keep zeroes
  const today = new Date();

  // Only compare date (remove time)
  insuranceDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today > insuranceDate;
}
