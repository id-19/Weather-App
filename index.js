//console.log("this is a test");

let newCity = "Gurgaon";
let cityDataList = {};

let input_box = document.getElementById("city_input");
let tile_container = document.getElementById("display-tile-container");
let clear_button = document.getElementById("clear-button");
let add_button = document.getElementById("add-button");

async function API_call(cityName) {
	let URL = `http://api.weatherapi.com/v1/current.json?key=67c84223d94b4ad191c154522230605&q=${cityName}&aqi=no`;
	//let rawData = {};
	const notJson = await fetch(URL);
	//console.log("this is notJson", notJson);
	const Json = notJson ? await notJson.json() : {};
	//console.log("this is Json", Json);
	let rawData = Json;
	//console.log("this is the final data", rawData);
	return rawData;
}

async function addValueToList(cityName) {
	let result = await API_call(cityName);
	if (result.location) {
		cityDataList[cityName] = result;
	}
	console.log(cityDataList);
}

const generateHTML = (city) => {
	console.log(city);
	let tile = tile_container.appendChild(document.createElement("div"));
	let weatherImage = tile.appendChild(document.createElement("img"));
	weatherImage.src = cityDataList[city]["current"]["condition"]["icon"];
	let locationData = tile.appendChild(document.createElement("h4"));
	locationData.innerText =
		cityDataList[city]["location"]["name"] +
		", " +
		cityDataList[city]["location"]["region"] +
		", " +
		cityDataList[city]["location"]["country"];
	let textCondition = tile.appendChild(document.createElement("h4"));
	textCondition.innerText =
		cityDataList[city]["current"]["condition"]["text"];
	let realTemp = tile.appendChild(document.createElement("h4"));
	realTemp.innerText = cityDataList[city]["current"]["temp_c"] + "'C";
	let appTemp = tile.appendChild(document.createElement("h4"));
	appTemp.innerText = cityDataList[city]["current"]["feelslike_c"] + "'C";
	let cloud = tile.appendChild(document.createElement("h4"));
	cloud.innerText = cityDataList[city]["current"]["cloud"] + "%";
	let windSpeed = tile.appendChild(document.createElement("h4"));
	windSpeed.innerText = cityDataList[city]["current"]["wind_kph"] + " kph";
};

add_button.addEventListener("click", async () => {
	newCity = input_box.value;
	console.log(newCity);
	await addValueToList(newCity);
	generateHTML(newCity);
});

clear_button.addEventListener("click", () => {
	tile_container.innerHTML = "";
});
