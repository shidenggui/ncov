import { mockData } from '../../../mock/data';
import { RequestService } from '../../infrastructure/requests/request';
import { PATIENT_TRAVELS_API } from '../constants';

export class PatientTravelApi {
  static async list() {
    let results = await RequestService.get(PATIENT_TRAVELS_API)
    return results.data
  }
}

export class MockPatientTravelApi {
  static async list() {
    return mockData.data
  }
}
