// indonesia
const positif = document.querySelector('p.t-kasus');
const sembuh = document.querySelector('p.s-kasus');
const meninggal = document.querySelector('p.k-kasus');
const dirawat = document.querySelector('p.d-kasus');

// number format
function number(num) {
	// return new Intl.NumberFormat().format(num);
	 return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function covid19Ind(indonesia) {

	let jmlhKasus = indonesia.jumlahKasus;
	let sembKasus = indonesia.sembuh;
	let menKasus = indonesia.meninggal;
	let diraKasus = indonesia.perawatan;

	positif.textContent = number(jmlhKasus);
	sembuh.textContent = number(sembKasus);
	meninggal.textContent = number(menKasus);
	dirawat.textContent = number(diraKasus);

}

// request rest api
function req(url, func) {
	const xhr = new XMLHttpRequest();

	xhr.open('POST', url, true)

	xhr.onreadystatechange = async function() {
		// if success and status 200 OK
		if(xhr.readyState == 4 && xhr.status == 200) {
			// parse json to object
			let data = JSON.parse(this.responseText);
			time();
			await func(data);
		}
	}

	xhr.send();
}

req('https://indonesia-covid-19.mathdro.id/api/', covid19Ind);

function time() {
	const date = new Date();
	const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
	const time = document.getElementById('time');
	time.textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${getTimezoneName()}`;
}

function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });

  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
}

