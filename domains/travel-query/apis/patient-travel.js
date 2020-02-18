// 患者行程数据获取 api
import { mockData } from '../../../mock/data';
import { RequestService } from '../../infrastructure/requests/request';
import { PATIENT_TRAVELS_API } from '../constants';

export class PatientTravelApi {
  // 获取第三方数据源提供的患者行程
  static async list() {
    let results = await RequestService.get(PATIENT_TRAVELS_API)
    return results.data
  }
}

// 测试类，用于获取 mock 数据
export class MockPatientTravelApi {
  static async list() {
    return mockData.data
  }
}
