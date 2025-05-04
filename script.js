let clickCount = 0;
let detectedCountry = ''; // Zmienna do przechowania kraju po IP

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const city = document.getElementById('city');
const isAcc = document.getElementById('acc');
const isVat = document.getElementById('vatUE');
const passwordInput = document.getElementById('passwordInput');
const vatInput = document.getElementById('vatInput');

function handleClick() {
	clickCount++;
	clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		if (!response.ok) {
			throw new Error('Błąd pobierania danych');
		}
		const data = await response.json();
		const countries = data.map((country) => country.name.common);

		// Umieść wykryty kraj jako pierwszy i zaznaczony
		countries.sort((a, b) => {
			if (a === detectedCountry) return -1;
			if (b === detectedCountry) return 1;
			return a.localeCompare(b);
		});

		countryInput.innerHTML = countries
			.map(
				(country) =>
					`<option value="${country}" ${
						country === detectedCountry ? 'selected' : ''
					}>${country}</option>`
			)
			.join('');
	} catch (error) {
		console.error('Wystąpił błąd:', error);
	}
}

async function getCountryByIP() {
	try {
		const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
		const data = await response.json();
		detectedCountry = data.country;
		console.log('Kraj po IP:', detectedCountry);
		console.log(data);
		city.value = data.city;
		await fetchAndFillCountries();
		getCountryCode(detectedCountry);
	} catch (error) {
		console.error('Błąd pobierania danych z serwera GeoJS:', error);
	}
}

function getCountryCode(countryName) {
	const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Błąd pobierania danych');
			}
			return response.json();
		})
		.then((data) => {
			const countryCode =
				data[0].idd.root + data[0].idd.suffixes.join('');
			const optionToMove = Array.from(countryCodeInput.options).find(
				(option) => option.value === countryCode
			);

			// Jeśli znaleziono, przenieś na początek i zaznacz
			if (optionToMove) {
				//countryCodeInput.removeChild(optionToMove); // Usuń z obecnej pozycji
				//countryCodeInput.insertBefore(
				// 	optionToMove,
				// 	countryCodeInput.firstChild
				// ); // Wstaw na górę
				optionToMove.selected = true; // Ustaw jako wybraną
			}
		})
		.catch((error) => {
			console.error('Wystąpił błąd:', error);
		});
}

// Inicjalizacja
(() => {
	document.addEventListener('click', handleClick);
	getCountryByIP(); // fetchAndFillCountries() zostanie wywołane później
})();

isAcc.addEventListener('change', function () {
	passwordInput.className = this.checked ? 'd-block' : 'd-none';
});
isVat.addEventListener('change', function () {
	vatInput.className = this.checked ? 'd-block' : 'd-none';
});
