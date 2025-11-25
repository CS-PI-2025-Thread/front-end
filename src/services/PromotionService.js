import BaseService from "./BaseService";

class PromotionService extends BaseService {
  constructor() {
    super("/promotions");
  }

  async findAll(page, size = 30) {
    const params = { page, size };
    const response = await this.api.get(`${this.endPoint}/list-all`, {
      params,
    });
    return response.data;
  }

  async findByName(page, name, size = 30) {
    const params = { page, name, size };
    const response = await this.api.get(
      `${this.endPoint}/find-by-name`,
      {
        params,
      }
    );
    return response.data;
  }
}

export default PromotionService;
