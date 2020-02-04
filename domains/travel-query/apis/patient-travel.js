import { mockData } from '../../../mock/data';
import { RequestService } from '../../infrastructure/requests/request';

export class PatientTravelApi {
  static async list() {
    let results = await RequestService.get('https://2019ncov.nosugartech.com/data.json')
    return results.data
  }
}

export class MockPatientTravelApi {
  static async list() {
    return mockData.data
  }
}
