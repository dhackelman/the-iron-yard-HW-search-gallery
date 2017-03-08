"use strict"

const imageVideoList = document.querySelector('.listSearchItems');
const searchForm = document.querySelector('.searchImagesForm');
let allSearchItems = [];
let searchTerm = document.getElementById('search-term');
function clearPrevSearch() {
  allSearchItems = [];
  imageVideoList.innerHTML = "";
}

const runImageModule = function () {


  function addImagesToDisplay(nuevoArray) {
    let arrayLength = nuevoArray.length;

    //create DOM element for each item
    if (arrayLength === 0) {
      let zeroResult = document.createElement('P');
      zeroResult.textContent = "Sorry, no images match your search term."
      imageVideoList.appendChild(zeroResult);
      searchForm.reset();
      } else {
      for (let i = 0; i < arrayLength; i++) {
        let imageElem1 = document.createElement('img'); //create div for each
        let imageElem2 = document.createElement('img'); //create div for each
        imageElem1.setAttribute("src", `${allSearchItems[i].url}`);
        imageElem2.setAttribute("src", `${allSearchItems[i].large_url}`);
        imageElem1.className = "is-showing";
        imageElem2.className = "is-hidden lightbox";
        imageVideoList.appendChild(imageElem1);
        imageVideoList.appendChild(imageElem2);
      console.log("running loop"); //is loop running?
      }
    }
  }


  function loadSearchResults() {

    const http = new XMLHttpRequest();
    console.log(searchTerm);

    http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status ===200) {
        console.log(http);
        // const searchResultData = JSON.parse(http.response);//returns object.images[array of 10]
        // const resultImages = searchResultData.images;
        // //bind event listeners to create lightbox and dispaly large image
        // //display images in my html listeners
        // updateSearchItemArray(resultImages);//load image objects with ids, large url and reg url to array
        // console.log(allSearchItems);//make sure array exists
        // addImagesToDisplay(allSearchItems);//display each item in the array as list item
      }
    }

    http.open('GET', `https://www.splashbase.co/api/v1/images/search?query="${searchTerm}"`, true); //will need to update URL to show items based on search term from field
    http.send();
  }

  function toggleLightbox() {
    console.log('click');
  }


  function updateSearchItemArray (imagenes) {
    //access image array?? I don't need to do this, because I'm calling this image within the onreadystatechange function
    let tempItem = {};
    let imagenesLength = imagenes.length; //don't recalc .length in the for loop
    for (let i = 0; i < imagenesLength; i++) {
      tempItem = {}; //lather, rinse, repeat
      tempItem.id = imagenes[i].id;
      tempItem.large_url = imagenes[i].large_url;
      tempItem.url = imagenes[i].url;
      allSearchItems.push(tempItem);//add to existing module-scoped array
    }
  }


  function init() {
    clearPrevSearch();
    loadSearchResults();
  }

  return {
    init: init
  }

}

const searchImageApp = runImageModule();

searchForm.addEventListener('submit', () => {
    event.preventDefault();
    searchTerm = document.getElementById('search-term').value;
    searchImageApp.init();
    searchForm.reset();
  });
