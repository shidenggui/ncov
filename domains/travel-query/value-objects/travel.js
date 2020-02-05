export class Travel {
  constructor({place}) {
    this.place = place
  }

  isOverlapWithPatients(patientTravels) {
    let overlaps = []
    for (const patientTravel of patientTravels) {
      if (patientTravel.isOverlap(this))
        overlaps.push(patientTravel)
    }
    return overlaps
  }
}
