const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = []
// unsplash api
const count = 30;
const apiKey = "B5-LM_DIgqdAhK610TWb6nU2wlp618syMzYryuRMyk8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images was loaded
function imageLoaded() {
  console.log('image loaded');
}
// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create element for links
function displayPhotos() {
  // run function for each object in photo array
  photosArray.forEach((photo) => {
    // create <a></a> element to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a></a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}
// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log('load more');
  }
})

// onload
getPhotos();
