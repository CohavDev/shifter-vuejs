export default function sendData(
  date: string,
  selection: number[][],
  userName: string
) {
  return new Promise(async (resolve, reject) => {
    try {
      // const formattedSelection = parseSelectionArray(selection);
      const response = await fetch("/api/sendData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          selection: selection,
          userName: userName,
        }),
      });
      if (!response.ok) {
        throw new Error("Error submitting data");
      }
      const data = await response.json();
      resolve(data.message);
    } catch (err) {
      console.error("Error submitting data", err);
      reject("Error submitting data");
    }
  });
}
// function parseSelectionArray(selection: number[][]) {
//   return selection.join(",");
// }
