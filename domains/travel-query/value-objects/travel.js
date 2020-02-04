export class Travel {
  constructor({time, type, place}) {
    if (typeof time === 'string')
      time = new Date(time)
    this.time = time
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
