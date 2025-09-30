// json-filter-wrapper.js
export default function createJSONFilter(dataset) {
  // This is the function that will be used in your Express route handler.
  return function (req, res) {
    const filters = req.query; // Get all query parameters as an object
    let filteredData = [...dataset]; // Use a copy of the original data

    // Loop through each query parameter to filter the dataset
    for (const key in filters) {
      if (Object.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        filteredData = filteredData.filter((item) => {
          // Case-insensitive filtering
          return (
            item[key] &&
            item[key].toString().toLowerCase() === value.toLowerCase()
          );
        });
      }
    }

    res.json(filteredData); // Send the filtered data as a JSON response
  };
}
