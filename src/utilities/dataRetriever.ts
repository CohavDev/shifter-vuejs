export default function getData(
  date: string,
  userName: string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "date":date, "userName":userName }),
      });
      if (!response.ok) {
        throw new Error("Error reading data");
      }
      const data = await response.json();
      const formattedSelection = parseSelectionArray(data.selection);
      resolve(formattedSelection);
    } catch (err) {
      console.error("Error reading data", err);
      reject("Error reading data");
    }
  });
}
function parseSelectionArray(selection: String) {
  return selection.split(",");
}
