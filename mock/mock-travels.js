import { Travel } from '../domains/travel-query/value-objects/travel';

export const MOCK_TRAVELS = [
  new Travel({
      time: new Date('2020-01-29'),
      type: 1,
      place: '西安多彩商城难'
    },
  ),
  new Travel({
      time: new Date('2020-01-29'),
      type: 1,
      place: '西安多彩商城'
    },
  ),
  new Travel({
      time: new Date('2020-01-28'),
      type: 1,
      place: 'G7162'
    },
  ),
  new Travel({
      time: new Date('2020-01-28'),
      type: 1,
      place: '淮北市1路公交车'
    },
  )
]

