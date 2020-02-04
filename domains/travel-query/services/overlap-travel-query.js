import { PatientTravelRepository } from '../repositories/patient-travel';

export class OverlapTravelQuery {
  static query(travel) {
    let patientTravels = PatientTravelRepository.list()
    return travel.isOverlapWithPatients(patientTravels)
  }
}
