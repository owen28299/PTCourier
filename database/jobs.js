module.exports = {
  jobs : [
    {
      id : 0,
      client : "Mark Smith",
      item : "A4 Batteries",
      item_location : "261 Elizabeth St, Melbourne VIC 3000",
      delivery_location : "Melbourne Convention and Exhibition Centre, Convention Centre Place, South Wharf VIC",
      item_location_geocode : { latitude: -37.8126137, longitude: 144.9599423},
      delivery_location_geocode : { latitude: -37.8253897, longitude: 144.9509223},
      time : 3,
      budget : 50,
      status : "hiring",
      courier : null,
      applicants : [
        {
          id : 0,
          courierId : 0,
          name : "Tony Stark",
          offer : 50,
          time : 2.5,
          offer_time_geocode : { latitude: -37.8256, longitude: 144.9051}
        },
        {
          id : 1,
          courierId : 1,
          name : "Mickey Mouse",
          offer : 35,
          time : 4,
          offer_time_geocode : { latitude: -37.8456, longitude: 144.9621}
        }
      ]
    }
  ],
  couriers : [
    {
      id : 0,
      name: "Tony Stark",
      home_geocode : { latitude: -37.8256, longitude: 144.9051}
    },
    {
      id : 1,
      name: "Mickey Mouse",
      home_geocode : { latitude: -37.8456, longitude: 144.9621}
    },
    {
      id : 2,
      name: "Jimmy McGrath",
      home_geocode : { latitude: -37.85276, longitude: 144.96872}
    }
  ]
};
