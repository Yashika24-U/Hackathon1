//  URL for the Nationalize API
const apiUrl = "https://api.nationalize.io";

// Get HTML elements
const nameInput = document.getElementById("nameInput");
const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");
const nationalitiesList = document.getElementById("nationalities");



// Function to fetch data from the Nationalize API
async function fetchNationalities(name) {
    try {
        const response = await fetch(`${apiUrl}/?name=${name}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from API (${response.status} ${response.statusText})`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

// Function to display nationalities
function displayNationalities(data, searchTerm) {
    nationalitiesList.innerHTML = "";

    if (data.country.length === 0) {
        nationalitiesList.innerText = "No nationality data found.";
        return;
    }

    // Displaying the top two countries and their probability values
    for (let i = 0; i  < 2 ; i++) {
        const nationality = data.country[i].country_id;
        const probability = data.country[i].probability.toFixed(2);
      

        // Highlighting the matched part of the nationality
        const highlightedNationality = nationality.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);


        const listItem = document.createElement("li");
        listItem.innerText = `${highlightedNationality}: ${probability}`;
        nationalitiesList.append(listItem);
        // body.append(nationalitiesList)
    }
}

// Function to handle the search
async function search() {
    const name = nameInput.value.trim();
    nationalitiesList.innerHTML = "";

    if (name === "") {
        resultDiv.innerText = "Please enter a name to search.";
        nationalitiesList.innerHTML = "";
        return;
    }

    try {
        const data = await fetchNationalities(name);
         displayNationalities(data, name);
        

    } catch (error) {
        resultDiv.innerText = `Error: ${error.message}`;
        nationalitiesList.innerText = "";
       
    }
}

// Add an event listener to the search button
searchButton.addEventListener("click", search);




























