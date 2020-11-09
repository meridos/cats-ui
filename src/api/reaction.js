import { urls } from '../config';
import { getApiInstance } from '../utils/api';

const api = getApiInstance(urls.reactionApi);

export class ReactionApi {
  /**
   * Добавление лайка имени
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/post_cats__catId__like
   * @param {number} catId ID имени кота
   * @param {string} type Тип реакции: лайк/дизлайк
   * @param {boolean} isReacted Значение реакции
   * @returns {Promise<string>} OK
   */
  static likes(catId, type, isReacted) {
    const data = {};

    if (type === 'like') {
      data.like = isReacted;
    } else if (type === 'dislike') {
      data.dislike = isReacted;
    }

    return api.post(`/cats/${catId}/likes`, data);
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
