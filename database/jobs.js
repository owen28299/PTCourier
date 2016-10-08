module.exports = {
  jobs : [
    {
      id : 0,
      client : "Mark Smith",
      item : "A4 Batteries",
      item_location : "JB Hifi",
      delivery_location : "Melbourne Convention Centre",
      item_location_geocode : { latitude: -37.8136, longitude: 144.9031},
      delivery_location_geocode : { latitude: -37.8036, longitude: 144.9631},
      time : 3,
      budget : 50,
      status : "hiring",
      courier : null,
      applicants : [
        {
          id : 0,
          name : "Tony Stark",
          offer : 50,
          time : 2.5
        },
        {
          id : 1,
          name : "Mickey Mouse",
          offer : 35,
          time : 4
        }
      ]
    }
  ]
};
