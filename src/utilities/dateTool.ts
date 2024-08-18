/**
 * Returns an object with the current week's Sunday and Saturday dates in a formatted string.
 *
 * @return {{ sundayDateFormatted: string, saturadayFormatted: string }} An object containing the formatted Sunday and Saturday dates.
 */
export default function getDates() {
  const sundayDate = new Date(
    Date.now() - new Date().getDay() * 24 * 60 * 60 * 1000
  );
  const saturadayDate = new Date(
    sundayDate.getTime() + 6 * 24 * 60 * 60 * 1000
  );
  function getDayFormatted(date: Date) {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
  const sundayDateFormatted = getDayFormatted(sundayDate);
  const saturadayFormatted = getDayFormatted(saturadayDate);
  return { sundayDateFormatted, saturadayFormatted };
}
