
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  let city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + '/adventures/?city=' + city);
    let data = await res.json();
    return data;
  } catch(e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(element => {
    let div = document.createElement('div');
    div.className = 'col-12 col-sm-6 col-lg-3 mb-4 position-relative'
    div.innerHTML = `
         <a id=${element.id} href="/frontend/pages/adventures/detail/?adventure=${element.id}">
         <div class='category-banner'>
         <p>${element.category}</p>
         </div>
            <div class="align-items-stretch activity-card mb-4" >
                <img class="img" src="${element.image}">
          <div class="d-flex justify-content-between font-weight-500 px-3">
            <h6>${element.name}</h6> 
            <p class="mb-0">₹${element.costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between font-weight-500 px-3">
            <h6>Duartion</h6>
            <p>${element.duration} Hours</p>
          </div>
        </div>
        </a>
        `
        document.getElementById('data').append(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(function(e) {
    return e.duration >= low && e.duration <= high;
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    let filteredList = list.filter(function (e) {
      if(e.category.length !== 0) {
        for(let c of categoryList) {
          if(e.category === c)
          return e;
        }
      }
      else
      return e;
    })
    return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if((filters.duration !== "" && filters.category.length !== 0)) {
    let myArr = filters.duration.split("-");
    let dfiltered = filterByDuration(list, myArr[0], myArr[1]);
    return filterByCategory(dfiltered, filters.category);
  }

  else if(filters.duration !== "") {
    let myArr = filters.duration.split("-");
    return filterByDuration(list, myArr[0], myArr[1]);
  }

  else if(filters.category.length !== 0) {
    return filterByCategory(list, filters.category);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let filteredList = JSON.parse(localStorage.getItem("filters"));
return filteredList;
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let selected = document.getElementById('category-list');
  let category = filters.category;
  category.forEach(c => {
    selected.innerHTML += `
    <div class="category-filter">${c}</div>`;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
