function colorForMonth(red, green, blue) {
  return {
    background: `rgba(${red}, ${green}, ${blue}, 0.2)`,
    border: `rgba(${red}, ${green}, ${blue}, 1)`
  };
}

export const MONTH_COLORS = {
  January: colorForMonth(255, 99, 132),
  February: colorForMonth(54, 162, 235),
  March: colorForMonth(255, 206, 86),
  April: colorForMonth(75, 192, 192),
  May: colorForMonth(153, 102, 255),
  June: colorForMonth(255, 159, 64),
  July: colorForMonth(255, 99, 132),
  August: colorForMonth(54, 162, 235),
  September: colorForMonth(255, 206, 86),
  October: colorForMonth(75, 192, 192),
  November: colorForMonth(153, 102, 255),
  December: colorForMonth(255, 159, 64)
};
