/*************************
    EMPLOYEE DIRECTORY
*************************/


const lBox = document.querySelector('.l-box');
const box = document.querySelector('.box');
const closeBox = document.querySelector('.close-box');
const main = document.querySelector('.main');
let employees = [];
let container;
let index;



fetch('https://randomuser.me/api/?results=12&nat=US')
  .then((data) => data.json())  
  .then((res) => res.results)
  .then((data) => employeesList(data))
  .catch(error => alert(error))


  
function employeesList(employeeData){

  employees = employeeData;
  let containerHTML = "";

	employees.forEach((employee, index) => {

		let name = employee.name;
		let email = employee.email;
		let city = employee.location.city;
    let picture = employee.picture;

    containerHTML += `
      <div class="container" index="${index}">
          <img alt="profile-image" class="profile-image" src="${picture.large}"/>
          <div class="basic-info">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
          </div>
      </div>
    `;
    
	});

  main.innerHTML = containerHTML;

}



function lightBox(index){

	let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

	let date = new Date(dob.date);
	year = date.getFullYear().toString().substring(1,3);

  const boxHTML = `
    <span class="close-box">X</span> 
		<img class="box-image" src="${picture.large} " />
		<div>
			<h2 class="box-name">${name.first} ${name.last}</h2>
			<p class="email">${email}</p>
			<p class="address">${city}</p>
			<hr >
			<p>${phone}</p>
			<p class="address"> ${street.number} ${street.name}, ${state} ${postcode}</p>
			<p>Birthday: ${date.getMonth()}/${date.getDate()}/${year}</p>
		</div>
	`;

  lBox.classList.remove("hidden");
  
  box.innerHTML = boxHTML;
 
}


lBox.style.display = 'none';


main.addEventListener('click', e => {

	if (e.target !== main) {

		const container = e.target.closest(".container");
		const index = container.getAttribute('index');
    lightBox(index);

    lBox.style.display = 'flex';

	}

});



closeBox.addEventListener('click', () => {
  lBox.classList.add("hidden");
  box.style.display = 'none';
});