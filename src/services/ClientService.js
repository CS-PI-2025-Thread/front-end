import BaseService from "./BaseService";

class ClientService extends BaseService {
  constructor() {
    super("/clients");
  }

  async findAll() {
    const response = await this.api.get(`${this.endPoint}/list-all-clients`);
    return response.data.content;
  }

  async findPaginated(page, size = 30) {
    const params = { page, size };
    const response = await this.api.get(`${this.endPoint}/list-all-clients`, {
      params,
    });
    return response.data;
  }

  async findByName(page, name, size = 30) {
    const params = { page, name, size };
    const response = await this.api.get(
      `${this.endPoint}/list-clients-by-name`,
      {
        params,
      }
    );
    return response.data;
  }
}

export default ClientService;
