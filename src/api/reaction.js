import { urls } from '../config';
import { getApiInstance } from '../utils/api';

const api = getApiInstance(urls.reactionApi);

export class ReactionApi {
  /**
   * Добавление лайка имени
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/post_cats__catId__like
   * @param {number} catId ID имени кота
   * @returns {Promise<string>} OK
   */
  static like(catId) {
    return api.post(`/cats/${catId}/like`);
  }

  /**
   * Удаление лайка имени
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/delete_cats__catId__like
   * @param {number} catId ID имени кота
   * @returns {Promise<string>} OK
   */
  static removeLike(catId) {
    return api.delete(`/cats/${catId}/like`);
  }

  /**
   * Добавление дизлайка имени
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/post_cats__catId__dislike
   * @param {number} catId ID имени кота
   * @returns {Promise<string>} OK
   */
  static dislike(catId) {
    return api.post(`/cats/${catId}/dislike`);
  }

  /**
   * Удаление дизлайка имени
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/delete_cats__catId__dislike
   * @param {number} catId ID имени кота
   * @returns {Promise<string>} OK
   */
  static removeDislike(catId) {
    return api.delete(`/cats/${catId}/dislike`);
  }

  /**
   * Рейтинг имен
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/get_cats_rating
   * @returns {Promise<{likes: Array, dislikes: Array}>} Массив объектов с списоками лайков и дизлайков
   */
  static rating() {
    return api.get(`/cats/rating`);
  }
}
