const fetch = require('node-fetch')
const { apiUri } = require('./configs')

/*
Сохранение описания кота
*/
function saveCatDescription(catId, catDescription) {
  return fetch(`${apiUri}/cats/save-description`, {
    method: 'post',
    body: JSON.stringify({
      catId,
      catDescription,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}

/*
Получение правил валидации
*/
function getRules() {
  return fetch(`${apiUri}/cats/validation`).then(res => res.json())
}

/**
 * Получение характеристик кота
 */
function searchNameDetails(catId) {
  return fetch(`${apiUri}/cats/get-by-id?id=${catId}`).then(res => res.json())
}

/*
Ищем подходящих котов через api (отправка запроса и получение данных)
*/
function searchCatsWithApi(searchParams) {
  const { needle, genders } = searchParams

  return fetch(`${apiUri}/cats/search`, {
    method: 'post',
    body: JSON.stringify({
      name: needle,
      genders,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => createRenderContesxtSearchResult(json, searchParams))
}

/*
Ищем подходящих котов через api по части имени (отправка запроса и получение данных)
*/
function searchCatsByPatternWithApi(searchName, limit) {
  return fetch(
    `${apiUri}/cats/search-pattern?name=${encodeURI(searchName)}&limit=${limit}`
  ).then(res => res.json())
}

/*
Возвращаем всех котов
 */
function getAllCats(order) {
  let query = '';

  if (order) {
    query = `?order=${order}`;
  }

  return fetch(`${apiUri}/cats/all${query}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => createRenderAllContext(json))
}

/*
Добавление котов
*/
function addCats(cats) {
  return fetch(`${apiUri}/cats/add`, {
    method: 'post',
    body: JSON.stringify({
      cats,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.ok)
}

/*
Вьюшка для отрисовки всех котов
 */
function createRenderAllContext(json) {
  if (json.groups == null || json.groups.length == 0) {
    return {
      template: 'no-result',
    }
  } else {
    return {
      template: 'results',
      context: {
        groups: json.groups,
        count: json.count,
      },
    }
  }
}

/*
Выбор вьюшки для отрисовки (с результатами или без)
*/
function createRenderContesxtSearchResult(json, searchParams) {
  const { needle, genders } = searchParams
  const searchContext = {
    needle,
    male: genders.includes('male'),
    female: genders.includes('female'),
    unisex: genders.includes('unisex'),
  }

  if (json.groups == null || json.groups.length == 0) {
    return {
      template: 'no-result',
      context: searchContext,
    }
  } else {
    return {
      template: 'results',
      context: {
        ...searchContext,
        groups: json.groups,
        count: json.count,
      },
    }
  }
}

/*
Рендеринг главной страницы в случае неуспеха
*/
function showFailPage(res) {
  res.render('index', { showFailPopup: true })
}

/*
Получение фотографий
*/
function getPhotos(catId) {
  return fetch(`${apiUri}/cats/${catId}/photos`).then(res => res.json())
}

module.exports = {
  getRules,
  searchCatsWithApi,
  showFailPage,
  saveCatDescription,
  searchNameDetails,
  addCats,
  getAllCats,
  searchCatsByPatternWithApi,
  getPhotos,
}
