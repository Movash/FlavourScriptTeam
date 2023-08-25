import axios from 'axios';

export class FetchInfo {
  constructor(id) {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  }

  fetchEventsMasterClass() {
    return axios.get(`${this.BASE_URL}events`);
  }

  fetchAllRecipesPerPage(limit, page) {
    return axios.get(`${this.BASE_URL}recipes?limit=${limit}&page=${page}`);
  }

  fetchPopularRecipes() {
    return axios.get(`${this.BASE_URL}recipes/popular`);
  }

  fetchAllCategories() {
    return axios.get(`${this.BASE_URL}categories`);
  }

  fetchByCategory(category, page, limit) {
    return axios.get(
      `${this.BASE_URL}recipes?category=${category}&page=${page}&limit=${limit}`
    );
  }

  fetchRecipeByTitle(title, page, limit) {
    return axios.get(
      `${this.BASE_URL}recipes?title=${title}&page=${page}&limit=${limit}`
    );
  }
  fetchRecipeByTitleAndCategory(category, title, page, limit) {
    return axios.get(
      `${this.BASE_URL}recipes?category=${category}title=${title}&page=${page}&limit=${limit}`
    );
  }
  fetchRecipesByFilter(page, limit, time, area, ingredient) {
    return axios.get(
      `${this.BASE_URL}recipes?page=${page}&limit=${limit}&time=${time}&area=${area}&ingredient=${ingredient}`
    );
  }

  fetchRecipesByFilterWithCategory(
    category,
    page,
    limit,
    time,
    area,
    ingredient
  ) {
    return axios.get(
      `${this.BASE_URL}recipes?category=${category}&page=${page}
      &limit=${limit}&time=${time}&area=${area}&ingredient=${ingredient}`
    );
  }

  fetchAllIngredients() {
    return axios.get(`${this.BASE_URL}ingredients`);
  }

  fetchAllAreas() {
    return axios.get(`${this.BASE_URL}areas`);
  }

  fetchRecipeById(id) {
    return axios.get(`${this.BASE_URL}recipes/${id}`);
  }

  patchRatingRecipe(id, ratingToSend) {
    return axios({
      url: `${this.BASE_URL}recipes/${id}/rating`,
      method: 'PATCH',
      data: {
        rate: ratingToSend.rate,
        email: ratingToSend.email,
      },
    });
  }

  postOrderApi(name, phone, email, comment) {
    return axios({
      url: `${this.BASE_URL}orders/add`,
      method: 'POST',
      data: {
        name: name,
        phone: phone,
        email: email,
        comment: comment,
      },
    });
  }
}

export class FetchInfoByFilter {
  constructor(category, page, limit, time, area, ingredient) {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
    this.category = category || 'Beef';
    this.page = page || '1';
    this.limit = limit || '6';
    this.time = time || '160';
    this.area = area || 'Irish';
    this.ingredient = ingredient || '640c2dd963a319ea671e3796';
  }
  fetchFilteredItems() {
    return axios.get(
      `${this.BASE_URL}recipes?category=${this.category}&page=${this.page}
      &limit=${this.limit}&time=${this.time}&area=${this.area}&ingredient=${this.ingredient}`
    );
  }
}
