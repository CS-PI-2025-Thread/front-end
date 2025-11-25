import BaseService from "./BaseService";

class SaleService extends BaseService {
  constructor() {
    super("/sales");
  }

  async findAll(page, size = 30) {
    const params = { page, size };
    const response = await this.api.get(`${this.endPoint}`, { params });
    return response.data;
  }
}

export default SaleService;
