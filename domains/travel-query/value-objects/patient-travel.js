import { Travel } from './travel';

export class PatientTravel extends Travel {
  constructor({time, place, detail, source, link}) {
    super({time, place});
    this.detail = detail
    this.source = source
    this.link = link
  }

  isOverlap(travel) {
    // if (travel.time.getMonth() !== this.time.getMonth())
    //   return false
    //
    // if (travel.time.getDay() !== this.time.getDay())
    //   return false
    return this.place.toLowerCase().includes(travel.place.toLowerCase());
  }
}
