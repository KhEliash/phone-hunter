const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // 1 get the main div
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container before adding new cards
  phoneContainer.textContent = "";

  // display all btn more than 10
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 10) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display only 10 phones
  phones = phones.slice(0, 10);

  phones.forEach((phone) => {
    // console.log(phone);

    //2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    // set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });

  // toggle remove
  toggleSpinner(false);
};

// handel show details
const handleShowDetails = async (id) => {
  // console.log('object', id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  // console.log(phone);
  const phoneDetail = document.getElementById("show-detail-phone-name");
  phoneDetail.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt=""/>
  <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>
  <p><span>Gps:</span> ${phone?.others?.GPS}</p>
  
  `;
  // show the modal
  my_modal_5.showModal();
};

// handleSearch
const handleSearch = () => {
  // toggle appear
  toggleSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};

// toggle
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// loadPhone()
