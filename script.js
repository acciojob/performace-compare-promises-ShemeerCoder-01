// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

// You can write your code here
 // Function to fetch data from a single API URL and return the response time
      const fetchUrl = async (url) => {
        const startTime = Date.now();
        await fetch(url);
        const endTime = Date.now();
        return endTime - startTime;
      };

      // Function to display the time taken for each API URL in a table
      const displayTimeTaken = (tableId, apiUrls, times) => {
        const table = document.getElementById(tableId);
        for (let i = 0; i < apiUrls.length; i++) {
          const row = table.insertRow();
          const urlCell = row.insertCell(0);
          const timeCell = row.insertCell(1);
          urlCell.innerHTML = apiUrls[i];
          timeCell.innerHTML = times[i];
        }
      };

      // Function that uses Promise.all to fetch data from multiple APIs
      const fetchAllUrls = async (apiUrls) => {
        const startTime = Date.now();
        const times = await Promise.all(apiUrls.map(fetchUrl));
        const endTime = Date.now();
        displayTimeTaken("output-all", apiUrls, times);
        // console.log("Promise.all time taken:", endTime - startTime);
      };

      // Function that uses Promise.any to fetch data from multiple APIs
      const fetchAnyUrl = async (apiUrls) => {
        const startTime = Date.now();
        const response = await Promise.any(apiUrls.map(fetchUrl));
        const endTime = Date.now();
        const index = apiUrls.indexOf(response.url);
        const times = new Array(apiUrls.length).fill(0);
        times[index] = response.time;
        displayTimeTaken("output-any", [response.url], [response.time]);
        // console.log("Promise.any time taken:", endTime - startTime);
      };

      fetchAllUrls(apiUrls);
      fetchAnyUrl(apiUrls);