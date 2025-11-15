import BaseService from './BaseService';

class EmployeeService extends BaseService {
    constructor() {
        super('/employees');
    }

    async findAll(){
        const response = await this.api.get(`${this.endPoint}/list-all-employees`);
        return response.data.content;
    }
}

export default EmployeeService;