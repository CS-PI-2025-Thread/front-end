import BaseService from './BaseService';

class EmployeeService extends BaseService {
    constructor() {
        super('/employees');
    }
}

export default EmployeeService;