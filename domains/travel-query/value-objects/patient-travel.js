import { Travel } from './travel';

export class PatientTravel extends Travel {
  constructor({time, place, detail, source, link}) {
    super({place});

    if (typeof time === 'string')
      time = new Date(time)
    this.time = time
    this.detail = detail
    this.source = source
    this.link = link
  }

  isOverlap(travel) {
    return this.place.toLowerCase().includes(travel.place.toLowerCase());
  }
}
