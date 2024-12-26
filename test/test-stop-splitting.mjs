import { splitStops } from '../static/scripts/pid-utils.mjs'
import { expect } from 'chai'

let FSS_PLATFORM = {
  MAX_COLUMNS: 4,
  CONNECTION_LOSS: 2,
  MIN_COLUMN_SIZE: 6,
  MAX_COLUMN_SIZE: 9,
  PERFECT_SPLIT: true
}

let FSS_ESCALATOR = {
  MAX_COLUMNS: 2,
  CONNECTION_LOSS: 2,
  MIN_COLUMN_SIZE: 5,
  MAX_COLUMN_SIZE: 18
}

describe('The stop splitting function - FSS Platform', () => {
  it('Richmond - Westall', () => {
    let stops = [
      'Richmond',
      'South Yarra',
      'Hawksburn',
      'Toorak',
      'Armadale',
      'Malvern',
      'Caulfield',
      'Carnegie',
      'Murrumbeena',
      'Hughesdale',
      'Oakleigh',
      'Huntingdale',
      'Clayton',
      'Westall'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Richmond',
        'South Yarra',
        'Hawksburn',
        'Toorak',
        'Armadale',
        'Malvern',
        'Caulfield'
      ], [
        'Carnegie',
        'Murrumbeena',
        'Hughesdale',
        'Oakleigh',
        'Huntingdale',
        'Clayton',
        'Westall'
      ]
    ])
  })

  it('Oakleigh - East Pakenham', () => {
    let stops = [
      'Oakleigh',
      'Huntingdale',
      'Clayton',
      'Westall',
      'Springvale',
      'Sandown Park',
      'Noble Park',
      'Yarraman',
      'Dandenong',
      'Hallam',
      'Narre Warren',
      'Berwick',
      'Beaconsfield',
      'Officer',
      'Cardinia Road',
      'Pakenham',
      'East Pakenham'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Oakleigh',
        'Huntingdale',
        'Clayton',
        'Westall',
        'Springvale',
        'Sandown Park',
        'Noble Park'
      ], [
        'Yarraman',
        'Dandenong',
        'Hallam',
        'Narre Warren',
        'Berwick',
        'Beaconsfield',
        'Officer'
      ], [
        'Cardinia Road',
        'Pakenham',
        'East Pakenham'
      ]
    ])
  })

  it('Caulfield - Bairnsdale', () => {
    let stops = [
      'Caulfield',
      'Carnegie',
      'Murrumbeena',
      'Hughesdale',
      'Oakleigh',
      'Huntingdale',
      'Clayton',
      'Westall',
      'Springvale',
      'Sandown Park',
      'Noble Park',
      'Yarraman',
      'Dandenong',
      'Hallam',
      'Narre Warren',
      'Berwick',
      'Beaconsfield',
      'Officer',
      'Cardinia Road',
      'Pakenham',
      'East Pakenham',
      'Nar Nar Goon',
      'Tynong',
      'Garfield',
      'Bunyip',
      'Longwarry',
      'Drouin',
      'Warragul',
      'Yarragon',
      'Trafalgar',
      'Moe',
      'Morwell',
      'Traralgon',
      'Rosedale',
      'Sale',
      'Stratford',
      'Bairnsdale'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Caulfield',
        'Carnegie',
        'Murrumbeena',
        'Hughesdale',
        'Oakleigh',
        'Huntingdale',
        'Clayton',
        'Westall',
        'Springvale'
      ], [
        'Sandown Park',
        'Noble Park',
        'Yarraman',
        'Dandenong',
        'Hallam',
        'Narre Warren',
        'Berwick',
        'Beaconsfield',
        'Officer'
      ], [
        'Cardinia Road',
        'Pakenham',
        'East Pakenham',
        'Nar Nar Goon',
        'Tynong',
        'Garfield',
        'Bunyip',
        'Longwarry',
        'Drouin'
      ], [
        'Warragul',
        'Yarragon',
        'Trafalgar',
        'Moe',
        'Morwell',
        'Traralgon',
        'Rosedale',
        'Sale',
        'Stratford'
      ], [
        'Bairnsdale'
      ]
    ])
  })

  it('Flinders Street - Bairnsdale', () => {
    let stops = [
      'Flinders Street',
      'Richmond',
      'South Yarra',
      'Hawksburn',
      'Toorak',
      'Armadale',
      'Malvern',
      'Caulfield',
      'Carnegie',
      'Murrumbeena',
      'Hughesdale',
      'Oakleigh',
      'Huntingdale',
      'Clayton',
      'Westall',
      'Springvale',
      'Sandown Park',
      'Noble Park',
      'Yarraman',
      'Dandenong',
      'Hallam',
      'Narre Warren',
      'Berwick',
      'Beaconsfield',
      'Officer',
      'Cardinia Road',
      'Pakenham',
      'Nar Nar Goon',
      'Tynong',
      'Garfield',
      'Bunyip',
      'Longwarry',
      'Drouin',
      'Warragul',
      'Yarragon',
      'Trafalgar',
      'Moe',
      'Morwell',
      'Traralgon',
      'Rosedale',
      'Sale',
      'Stratford',
      'Bairnsdale'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Flinders Street',
        'Richmond',
        'South Yarra',
        'Hawksburn',
        'Toorak',
        'Armadale',
        'Malvern',
        'Caulfield',
        'Carnegie'
      ], [
        'Murrumbeena',
        'Hughesdale',
        'Oakleigh',
        'Huntingdale',
        'Clayton',
        'Westall',
        'Springvale',
        'Sandown Park',
        'Noble Park',
      ], [
        'Yarraman',
        'Dandenong',
        'Hallam',
        'Narre Warren',
        'Berwick',
        'Beaconsfield',
        'Officer',
        'Cardinia Road',
        'Pakenham',
      ], [
        'Nar Nar Goon',
        'Tynong',
        'Garfield',
        'Bunyip',
        'Longwarry',
        'Drouin',
        'Warragul',
        'Yarragon',
        'Trafalgar',
      ], [
        'Moe',
        'Morwell',
        'Traralgon',
        'Rosedale',
        'Sale',
        'Stratford',
        'Bairnsdale'
      ]
    ])
  })

  it('Richmond - Blackburn', () => {
    let stops = [
      'Richmond',
      'East Richmond',
      'Burnley',
      'Hawthorn',
      'Glenferrie',
      'Auburn',
      'Camberwell',
      'East Camberwell',
      'Canterbury',
      'Chatham',
      'Union',
      'Box Hill',
      'Laburnum',
      'Blackburn'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Richmond',
        'East Richmond',
        'Burnley',
        'Hawthorn',
        'Glenferrie',
        'Auburn',
        'Camberwell'
      ], [
        'East Camberwell',
        'Canterbury',
        'Chatham',
        'Union',
        'Box Hill',
        'Laburnum',
        'Blackburn'
      ]
    ])
  })

  it('Glen Huntly - Frankston', () => {
    let stops = [
      'Glen Huntly',
      'Ormond',
      'McKinnon',
      'Bentleigh',
      'Patterson',
      'Moorabbin',
      'Highett',
      'Southland',
      'Cheltenham',
      'Mentone',
      'Parkdale',
      'Mordialloc',
      'Aspendale',
      'Edithvale',
      'Chelsea',
      'Bonbeach',
      'Carrum',
      'Seaford',
      'Kananook',
      'Frankston'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Glen Huntly',
        'Ormond',
        'McKinnon',
        'Bentleigh',
        'Patterson',
        'Moorabbin',
        'Highett'
      ], [
        'Southland',
        'Cheltenham',
        'Mentone',
        'Parkdale',
        'Mordialloc',
        'Aspendale',
        'Edithvale'
      ], [
        'Chelsea',
        'Bonbeach',
        'Carrum',
        'Seaford',
        'Kananook',
        'Frankston'
      ]
    ])
  })

  it('Richmond - Cheltenham', () => {
    let stops = [
      'Richmond',
      'South Yarra',
      'Hawksburn',
      'Toorak',
      'Armadale',
      'Malvern',
      'Caulfield',
      'Glen Huntly',
      'Ormond',
      'McKinnon',
      'Bentleigh',
      'Patterson',
      'Moorabbin',
      'Highett',
      'Southland',
      'Cheltenham'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Richmond',
        'South Yarra',
        'Hawksburn',
        'Toorak',
        'Armadale',
        'Malvern',
        'Caulfield',
        'Glen Huntly'
      ], [
        'Ormond',
        'McKinnon',
        'Bentleigh',
        'Patterson',
        'Moorabbin',
        'Highett',
        'Southland',
        'Cheltenham'
      ]
    ])
  })

  it('Glen Huntly - Laverton', () => {
    let stops = [
      'Glen Huntly',
      'Caulfield',
      'Malvern',
      'Armadale',
      'Toorak',
      'Hawksburn',
      'South Yarra',
      'Richmond',
      'Flinders Street',
      'Southern Cross',
      'North Melbourne',
      'South Kensington',
      'Footscray',
      'Seddon',
      'Yarraville',
      'Spotswood',
      'Newport',
      'Seaholme',
      'Altona',
      'Westona',
      'Laverton'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Glen Huntly',
        'Caulfield',
        'Malvern',
        'Armadale',
        'Toorak',
        'Hawksburn',
        'South Yarra'
      ], [
        'Richmond',
        'Flinders Street',
        'Southern Cross',
        'North Melbourne',
        'South Kensington',
        'Footscray',
        'Seddon'
      ], [
        'Yarraville',
        'Spotswood',
        'Newport',
        'Seaholme',
        'Altona',
        'Westona',
        'Laverton'
      ]
    ])
  })

  it('Glen Huntly - Flinders Street', () => {
    let stops = [
      'Glen Huntly',
      'Caulfield',
      'Malvern',
      'Armadale',
      'Toorak',
      'Hawksburn',
      'South Yarra',
      'Richmond',
      'Flinders Street'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Glen Huntly',
        'Caulfield',
        'Malvern',
        'Armadale',
        'Toorak',
        'Hawksburn',
        'South Yarra'
      ], [
        'Richmond',
        'Flinders Street',
      ]
    ])
  })

  it('Croydon - City Loop', () => {
    let stops = [
      'Croydon',
      'Ringwood East',
      'Ringwood',
      'Heatherdale',
      'Mitcham',
      'Nunawading',
      'Blackburn',
      'Laburnum',
      'Box Hill',
      'Union',
      'Chatham',
      'Canterbury',
      'East Camberwell',
      'Camberwell',
      'Auburn',
      'Glenferrie',
      'Hawthorn',
      'Burnley',
      'East Richmond',
      'Richmond',
      'Parliament',
      'Melbourne Central',
      'Flagstaff',
      'Southern Cross',
      'Flinders Street'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Croydon',
        'Ringwood East',
        'Ringwood',
        'Heatherdale',
        'Mitcham',
        'Nunawading',
        'Blackburn'
      ], [
        'Laburnum',
        'Box Hill',
        'Union',
        'Chatham',
        'Canterbury',
        'East Camberwell',
        'Camberwell'
      ], [
        'Auburn',
        'Glenferrie',
        'Hawthorn',
        'Burnley',
        'East Richmond',
        'Richmond',
        'Parliament'
      ], [
        'Melbourne Central',
        'Flagstaff',
        'Southern Cross',
        'Flinders Street'
      ]
    ])
  })

  it('Caulfield - City Loop', () => {
    let stops = [
      'Caulfield',
      'Malvern',
      'Armadale',
      'Toorak',
      'Hawksburn',
      'South Yarra',
      'Richmond',
      'Parliament',
      'Melbourne Central',
      'Flagstaff',
      'Southern Cross',
      'Flinders Street'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Caulfield',
        'Malvern',
        'Armadale',
        'Toorak',
        'Hawksburn',
        'South Yarra',
        'Richmond'
      ], [
        'Parliament',
        'Melbourne Central',
        'Flagstaff',
        'Southern Cross',
        'Flinders Street'
      ]
    ])
  })

  it('North Melbourne - Laverton', () => {
    let stops = [
      'North Melbourne',
      'South Kensington',
      'Footscray',
      'Seddon',
      'Yarraville',
      'Spotswood',
      'Newport',
      'Seaholme',
      'Altona',
      'Westona',
      'Laverton'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'North Melbourne',
        'South Kensington',
        'Footscray',
        'Seddon',
        'Yarraville',
        'Spotswood',
        'Newport'
      ], [
        'Seaholme',
        'Altona',
        'Westona',
        'Laverton'
      ]
    ])
  })

  it('North Melbourne - Seymour', () => {
    let stops = [
      'North Melbourne',
      'Kensington',
      'Newmarket',
      'Ascot Vale',
      'Moonee Ponds',
      'Essendon',
      'Glenbervie',
      'Strathmore',
      'Pascoe Vale',
      'Oak Park',
      'Glenroy',
      'Jacana',
      'Broadmeadows',
      'Coolaroo',
      'Roxburgh Park',
      'Craigieburn',
      'Donnybrook',
      'Wallan',
      'Heathcote Junction',
      'Wandong',
      'Kilmore East',
      'Broadford',
      'Tallarook',
      'Seymour'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'North Melbourne',
        'Kensington',
        'Newmarket',
        'Ascot Vale',
        'Moonee Ponds',
        'Essendon',
        'Glenbervie'
      ], [
        'Strathmore',
        'Pascoe Vale',
        'Oak Park',
        'Glenroy',
        'Jacana',
        'Broadmeadows',
        'Coolaroo'
      ], [
        'Roxburgh Park',
        'Craigieburn',
        'Donnybrook',
        'Wallan',
        'Heathcote Junction',
        'Wandong',
        'Kilmore East'
      ], [
        'Broadford',
        'Tallarook',
        'Seymour'
      ]
    ])
  })

  it('Melbourne Central - Alamein', () => {
    let stops = [
      'Melbourne Central',
      'Flagstaff',
      'Southern Cross',
      'Flinders Street',
      'Richmond',
      'East Richmond',
      'Burnley',
      'Hawthorn',
      'Glenferrie',
      'Auburn',
      'Camberwell',
      'Riversdale',
      'Willison',
      'Hartwell',
      'Burwood',
      'Ashburton',
      'Alamein'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Melbourne Central',
        'Flagstaff',
        'Southern Cross',
        'Flinders Street',
        'Richmond',
        'East Richmond',
        'Burnley'
      ], [
        'Hawthorn',
        'Glenferrie',
        'Auburn',
        'Camberwell',
        'Riversdale',
        'Willison',
        'Hartwell'
      ], [
        'Burwood',
        'Ashburton',
        'Alamein'
      ]
    ])
  })

  it('Flagstaff - Broadmeadows', () => {
    let stops = [
      'Flagstaff',
      'Melbourne Central',
      'Parliament',
      'Flinders Street',
      'Southern Cross',
      'North Melbourne',
      'Kensington',
      'Newmarket',
      'Ascot Vale',
      'Moonee Ponds',
      'Essendon',
      'Glenbervie',
      'Strathmore',
      'Pascoe Vale',
      'Oak Park',
      'Glenroy',
      'Jacana',
      'Broadmeadows'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Flagstaff',
        'Melbourne Central',
        'Parliament',
        'Flinders Street',
        'Southern Cross',
        'North Melbourne',
        'Kensington'
      ], [
        'Newmarket',
        'Ascot Vale',
        'Moonee Ponds',
        'Essendon',
        'Glenbervie',
        'Strathmore',
        'Pascoe Vale'
      ], [
        'Oak Park',
        'Glenroy',
        'Jacana',
        'Broadmeadows'
      ]
    ])
  })

  it('Flinders Street - Sunbury', () => {
    let stops = [
      'Flinders Street',
      'Southern Cross',
      'North Melbourne',
      'South Kensington',
      'Footscray',
      'Middle Footscray',
      'West Footscray',
      'Tottenham',
      'Sunshine',
      'Albion',
      'Ginifer',
      'St. Albans',
      'Keilor Plains',
      'Watergardens',
      'Diggers Rest',
      'Sunbury'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Flinders Street',
        'Southern Cross',
        'North Melbourne',
        'South Kensington',
        'Footscray',
        'Middle Footscray',
        'West Footscray',
        'Tottenham',
      ], [
        'Sunshine',
        'Albion',
        'Ginifer',
        'St. Albans',
        'Keilor Plains',
        'Watergardens',
        'Diggers Rest',
        'Sunbury'
      ]
    ])
  })

  it('Melbourne Central - Westall', () => {
    let stops = [
      'Melbourne Central',
      'Flagstaff',
      'Southern Cross',
      'Flinders Street',
      'Richmond',
      'South Yarra',
      'Hawksburn',
      'Toorak',
      'Armadale',
      'Malvern',
      'Caulfield',
      'Carnegie',
      'Murrumbeena',
      'Hughesdale',
      'Oakleigh',
      'Huntingdale',
      'Clayton',
      'Westall'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Melbourne Central',
        'Flagstaff',
        'Southern Cross',
        'Flinders Street',
        'Richmond',
        'South Yarra',
        'Hawksburn'
      ], [
        'Toorak',
        'Armadale',
        'Malvern',
        'Caulfield',
        'Carnegie',
        'Murrumbeena',
        'Hughesdale'
      ], [
        'Oakleigh',
        'Huntingdale',
        'Clayton',
        'Westall'
      ]
    ])
  })

  it('North Melbourne - Batman', () => {
    let stops = [
      'North Melbourne',
      'Macaulay',
      'Flemington Bridge',
      'Royal Park',
      'Jewell',
      'Brunswick',
      'Anstey',
      'Moreland',
      'Coburg',
      'Batman',
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'North Melbourne',
        'Macaulay',
        'Flemington Bridge',
        'Royal Park',
        'Jewell',
        'Brunswick',
        'Anstey',
      ], [
        'Moreland',
        'Coburg',
        'Batman',
      ]
    ])
  })

  it('Frankston - Laverton: Note that an actual PID should cut off at Newport', () => {
    let stops = [
      'Frankston',
      'Kananook',
      'Seaford',
      'Carrum',
      'Bonbeach',
      'Chelsea',
      'Edithvale',
      'Aspendale',
      'Mordialloc',
      'Parkdale',
      'Mentone',
      'Cheltenham',
      'Southland',
      'Highett',
      'Moorabbin',
      'Patterson',
      'Bentleigh',
      'McKinnon',
      'Ormond',
      'Glen Huntly',
      'Caulfield',
      'Malvern',
      'Armadale',
      'Toorak',
      'Hawksburn',
      'South Yarra',
      'Richmond',
      'Flinders Street',
      'Southern Cross',
      'North Melbourne',
      'South Kensington',
      'Footscray',
      'Seddon',
      'Yarraville',
      'Spotswood',
      'Newport',
      'Seaholme',
      'Altona',
      'Westona',
      'Laverton'
    ]

    expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
      [
        'Frankston',
        'Kananook',
        'Seaford',
        'Carrum',
        'Bonbeach',
        'Chelsea',
        'Edithvale',
        'Aspendale',
        'Mordialloc'
      ], [
        'Parkdale',
        'Mentone',
        'Cheltenham',
        'Southland',
        'Highett',
        'Moorabbin',
        'Patterson',
        'Bentleigh',
        'McKinnon'
      ], [
        'Ormond',
        'Glen Huntly',
        'Caulfield',
        'Malvern',
        'Armadale',
        'Toorak',
        'Hawksburn',
        'South Yarra',
        'Richmond'
      ], [
        'Flinders Street',
        'Southern Cross',
        'North Melbourne',
        'South Kensington',
        'Footscray',
        'Seddon',
        'Yarraville',
        'Spotswood',
        'Newport'
      ], [
        'Seaholme',
        'Altona',
        'Westona',
        'Laverton'
      ]
    ])
  })
})


describe('The stop splitting function - FSS Escalator', () => {
  it('Flinders Street - Glen Waverley', () => {
    let stops = [
      'Flinders Street',
      'Southern Cross',
      'Flagstaff',
      'Melbourne Central',
      'Parliament',
      'Richmond',
      'East Richmond',
      'Burnley',
      'Heyington',
      'Kooyong',
      'Tooronga',
      'Gardiner',
      'Glen Iris',
      'Darling',
      'East Malvern',
      'Holmesglen',
      'Jordanville',
      'Mount Waverley',
      'Syndal',
      'Glen Waverley'
    ]

    expect(splitStops(stops, false, FSS_ESCALATOR).columns).to.deep.equals([
      [
        'Flinders Street',
        'Southern Cross',
        'Flagstaff',
        'Melbourne Central',
        'Parliament',
        'Richmond',
        'East Richmond',
        'Burnley',
        'Heyington',
        'Kooyong',
        'Tooronga',
        'Gardiner',
        'Glen Iris',
        'Darling'
      ], [
        'East Malvern',
        'Holmesglen',
        'Jordanville',
        'Mount Waverley',
        'Syndal',
        'Glen Waverley'
      ]
    ])
  })
})