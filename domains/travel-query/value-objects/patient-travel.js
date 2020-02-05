import { Travel } from './travel';

// 患者行程
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

  // 是否跟该行程重叠
  isOverlap(travel) {
    return this.place.toLowerCase().includes(travel.place.toLowerCase());
  }
}
