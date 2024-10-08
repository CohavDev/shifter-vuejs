import sendData from "./dataSubmitter";
const defaultSelection = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
export default function getData(
  date: string,
  userName: string
): Promise<number[][]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/readData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date, userName: userName }),
      });
      if (!response.ok) {
        if (response.status === 404) {
          // Handle creation of new doc locally
          resolve(defaultSelection);
        } else {
          throw new Error("Error reading data");
        }
      }
      const data = await response.json();
      // const formattedSelection = parseSelectionArray(data.selection);
      resolve(data.selection);
    } catch (err) {
      console.error("Error reading data", err);
      reject("Error reading data");
    }
  });
}
// function parseSelectionArray(selection: String) {
//   const splitedArray = selection.split(",");
//   const parsedArray = splitedArray.map((item) => parseInt(item));
//   return parsedArray;
// }
