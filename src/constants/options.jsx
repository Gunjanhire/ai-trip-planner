export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveles in exploration",
    icon: "🛫",
    people: "1",
    img: "/solo.png",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "💑🏻",
    people: "2 People",
    img: "/couple.png",
  },
  {
    id: 3,
    title: "Friends",
    desc: "A group of fun loving adv",
    icon: "🤝🏻",
    people: "5+ People",
    img: "/friends.png",
  },
  {
    id: 4,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "👪🏻",
    people: "4 People",
    img: "/family.png",
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    title: "Low",
    desc: "0-1000",
    icon: "💸",
    img: "/low.png",
  },
  {
    id: 2,
    title: "Medium",
    desc: "1000-2500",
    icon: "💰",
    img: "/medium.png",
  },
  {
    id: 3,
    title: "High",
    desc: "2500+",
    icon: "💳",
    img: "/high.png",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
