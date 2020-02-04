import { PatientTravelApi } from '../apis/patient-travel';
import { PatientTravel } from '../value-objects/patient-travel';
import { LocalStorage } from '../../infrastructure/storage/local-storage';

export class PatientTravelRepository {
  static CACHE_KEY = 'patient_travels'

  static async reload() {
    let data = await PatientTravelApi.list()
    LocalStorage.setJson(this.CACHE_KEY, data)
    console.log('Reload from server')
    console.log(data.slice(0, 2))
  }

  static list() {
    let travels = []

    let travelsApiResults = LocalStorage.getJson(this.CACHE_KEY)

    for (const travelApiData of travelsApiResults) {
      let detail = ''
      if (travelApiData.t_start)
        detail += travelApiData.t_start.slice(11, -3) + '-' + travelApiData.t_end.slice(11, -3) + ' '

      if (travelApiData.t_pos_start)
        detail += travelApiData.t_pos_start + '-' + travelApiData.t_pos_end + ' '

      if (travelApiData.t_no_sub)
        detail += travelApiData.t_no_sub + ' '

      detail += travelApiData.t_memo

      travels.push(new PatientTravel({
        time: new Date(travelApiData.t_date),
        type: travelApiData.t_type,
        place: travelApiData.t_no,
        detail: detail,
        source: travelApiData.who,
        link: travelApiData.source,
      }))
    }
    return travels
  }
}
