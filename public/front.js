// function myFunction() {
//   let array = document.querySelectorAll('.dropdown-content');
//   for (let i = 0; i < array.length; i += 1) {
//     array[i].classList.toggle('show');
//   }
// }

const taxSelect = document.getElementById('taxId');
const levelSelect = document.getElementById('levelId');
const acceptSelect = document.getElementById('acceptId');
const statusSelect = document.getElementById('statusId');

const reportView = document.getElementById('reportView');

taxSelect.addEventListener('change', async (event) => {
  // console.log(event.target.value);
  const resp = await fetch('/reports/tax', {
    method: 'POST',
    body: JSON.stringify({
      tax: event.target.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await resp.json();

  const collect = result.collect;
  const refreshPage = await fetch('/hbs/reportFront.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ collect });
  reportView.innerHTML = htmlRefreshPage;
});

levelSelect.addEventListener('change', async (event) => {
  // console.log(event.target.value);
  const resp = await fetch('/reports/level', {
    method: 'POST',
    body: JSON.stringify({
      level: event.target.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await resp.json();

  const collect = result.collect;
  const refreshPage = await fetch('/hbs/reportFront.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ collect });
  reportView.innerHTML = htmlRefreshPage;
});

acceptSelect.addEventListener('change', async (event) => {
  // console.log(event.target.value);
  const resp = await fetch('/reports/accept', {
    method: 'POST',
    body: JSON.stringify({
      acceptability: event.target.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await resp.json();

  const collect = result.collect;
  const refreshPage = await fetch('/hbs/reportFront.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ collect });
  reportView.innerHTML = htmlRefreshPage;
});

statusSelect.addEventListener('change', async (event) => {
  // console.log(event.target.value);
  const resp = await fetch('/reports/status', {
    method: 'POST',
    body: JSON.stringify({
      status: event.target.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await resp.json();

  const collect = result.collect;
  const refreshPage = await fetch('/hbs/reportFront.hbs');
  const template = await refreshPage.text();
  const render = Handlebars.compile(template);
  const htmlRefreshPage = render({ collect });
  reportView.innerHTML = htmlRefreshPage;
});
