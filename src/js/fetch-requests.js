import axios from 'axios';

export class FetchInfo {
  constructor(id) {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  }

  fetchEventsMasterClass() {
    return axios.get(`${this.BASE_URL}events`);
  }

  fetchAllRecipesPerPage(limit) {
    return axios.get(`${this.BASE_URL}recipes?limit=${limit}`);
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

  fetchAllIngredients() {
    return axios.get(`${this.BASE_URL}ingredients`);
  }

  fetchAllAreas() {
    return axios.get(`${this.BASE_URL}areas`);
  }

  fetchRecipeById(id) {
    return axios.get(`${this.BASE_URL}recipes/${id}`);
  }

  //   postOrder() {
  //     return axios.get(`${this.BASE_URL}orders`);
  //   }
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
