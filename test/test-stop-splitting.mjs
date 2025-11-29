import { expect } from 'chai'
import { PlatformStoppingPattern } from '../static/scripts/metro-lcd/platform.mjs'
import { PrePlatPortraitStoppingPattern } from '../static/scripts/metro-lcd/pre-plat-portrait.mjs'
import { HalfPlatformStoppingPattern } from '../static/scripts/metro-lcd/half-platform.mjs'
import { Stop } from '../static/scripts/metro-lcd/stopping-pattern.mjs'

let fssBairnsdale = [
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

function splitStops(classType, stops) {
  return classType.splitStops(
    stops.map(stop => new Stop(stop))
  ).columns.map(col => col.map(stop => stop.getStopName()))
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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
    let stops = fssBairnsdale

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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

  it('Flinders Street - Sandringham', () => {
    let stops = [
      'Flinders Street',
      'Richmond',
      'South Yarra',
      'Prahran',
      'Windsor',
      'Balaclava',
      'Ripponlea',
      'Elsternwick',
      'Gardenvale',
      'North Brighton',
      'Middle Brighton',
      'Brighton Beach',
      'Hampton',
      'Sandringham'
    ]
    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
      [
        'Flinders Street',
        'Richmond',
        'South Yarra',
        'Prahran',
        'Windsor',
        'Balaclava',
        'Ripponlea'
      ], [
        'Elsternwick',
        'Gardenvale',
        'North Brighton',
        'Middle Brighton',
        'Brighton Beach',
        'Hampton',
        'Sandringham'
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

    expect(splitStops(PlatformStoppingPattern, stops)).to.deep.equals([
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


describe('The stop splitting function - Pre Platform Portrait', () => {
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

    expect(splitStops(PrePlatPortraitStoppingPattern, stops)).to.deep.equals([
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

  it('Flinders Street - East Pakenham', () => {
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
      'East Pakenham'
    ]

    expect(splitStops(PrePlatPortraitStoppingPattern, stops)).to.deep.equals([
      [
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
        'Clayton'
      ], [
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
    ])
  })

  it('North Melbourne - Watergardens', () => {
    let stops = [
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
      'Watergardens'
    ]

    expect(splitStops(PrePlatPortraitStoppingPattern, stops)).to.deep.equals([
      [
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
        'Watergardens'
      ]
    ])
  })

  it('Flinders Street - Bairnsdale', () => {
    let stops = fssBairnsdale

    expect(splitStops(PrePlatPortraitStoppingPattern, stops)).to.deep.equals([
      [
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
        'Narre Warren'
      ], [
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
    ])
  })

  it('North Melbourne - Pakenham', () => {
    let stops = [
      'North Melbourne',
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
      'Pakenham'
    ]

    expect(splitStops(PrePlatPortraitStoppingPattern, stops)).to.deep.equals([
      [
        'North Melbourne',
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
        'Huntingdale'
      ], [
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
        'Pakenham'
      ]
    ])
  })
})

describe('The stop splitting function - Half Platform', () => {
  it('Heatherdale - Flinders Street', () => {
    let stops = [
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

    expect(splitStops(HalfPlatformStoppingPattern, stops)).to.deep.equals([
      [
        'Heatherdale',
        'Mitcham',
        'Nunawading',
        'Blackburn',
        'Laburnum',
        'Box Hill'
      ], [
        'Union',
        'Chatham',
        'Canterbury',
        'East Camberwell',
        'Camberwell',
        'Auburn'
      ], [
        'Glenferrie',
        'Hawthorn',
        'Burnley',
        'East Richmond',
        'Richmond',
        'Parliament',
      ], [
        'Melbourne Central',
        'Flagstaff',
        'Southern Cross',
        'Flinders Street'
      ]
    ])
  })

  it('Heatherdale - Belgrave', () => {
    let stops = [
      'Heatherdale',
      'Ringwood',
      'Heathmont',
      'Bayswater',
      'Boronia',
      'Ferntree Gully',
      'Upper Ferntree Gully',
      'Upwey',
      'Tecoma',
      'Belgrave'
    ]

    expect(splitStops(HalfPlatformStoppingPattern, stops)).to.deep.equals([
      [
        'Heatherdale',
        'Ringwood',
        'Heathmont',
        'Bayswater',
        'Boronia'
      ], [
        'Ferntree Gully',
        'Upper Ferntree Gully',
        'Upwey',
        'Tecoma',
        'Belgrave'
      ]
    ])
  })

  // Note: Need to pass in an array as it might want to tweak column size based on stops in the future
  it('Clayton - Traralgon', () => {
    expect(HalfPlatformStoppingPattern.getColumnSize(Array(30).fill(0))).to.equal(6)
  })

  it('Clayton - Flinders Street', () => {
    expect(HalfPlatformStoppingPattern.getColumnSize(Array(24).fill(8))).to.equal(6)
  })

  it('Sunshine - Flinders Street', () => {
    expect(HalfPlatformStoppingPattern.getColumnSize(Array(9).fill(0))).to.equal(5)
  })

  it('Mitcham - Upper Ferntree Gully', () => {
    expect(HalfPlatformStoppingPattern.getColumnSize(Array(8).fill(0))).to.equal(4)
  })
})