import { splitStops } from '../static/scripts/pid-utils.mjs'
import { expect } from 'chai'

let FSS_PLATFORM = {
  MAX_COLUMNS: 4,
  CONNECTION_LOSS: 2,
  MIN_COLUMN_SIZE: 6,
  MAX_COLUMN_SIZE: 9
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

  // it('Richmond - Cheltenham', () => {
  //   let stops = [
  //     'Richmond',
  //     'South Yarra',
  //     'Hawksburn',
  //     'Toorak',
  //     'Armadale',
  //     'Malvern',
  //     'Caulfield',
  //     'Glen Huntly',
  //     'Ormond',
  //     'McKinnon',
  //     'Bentleigh',
  //     'Patterson',
  //     'Moorabbin',
  //     'Highett',
  //     'Southland',
  //     'Cheltenham'
  //   ]

  //   expect(splitStops(stops, false, FSS_PLATFORM).columns).to.deep.equals([
  //     [
  //       'Richmond',
  //       'South Yarra',
  //       'Hawksburn',
  //       'Toorak',
  //       'Armadale',
  //       'Malvern',
  //       'Caulfield',
  //       'Glen Huntly'
  //     ], [
  //       'Ormond',
  //       'McKinnon',
  //       'Bentleigh',
  //       'Patterson',
  //       'Moorabbin',
  //       'Highett',
  //       'Southland',
  //       'Cheltenham'
  //     ]
  //   ])
  // })

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
})