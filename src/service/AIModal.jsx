import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, here\'s a JSON-formatted travel plan for Las Vegas tailored to a couple on a budget for 3 days. I\'ve included hotel options, a detailed itinerary with estimated costs and times, and images where possible.\n\n```json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "budget": "Cheap/Budget-Friendly",\n    "travelers": "Couple"\n  },\n  "hotelOptions": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$30 - $60 per night (depending on season and deals)",\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/7a/03/c7/circus-circus-hotel-casino.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1262,\n        "longitude": -115.1653\n      },\n      "rating": 3.5,\n      "description": "A classic Vegas hotel with a circus theme, offering affordable rooms, a casino, and the Adventuredome indoor theme park.  Great for those looking for budget-friendly entertainment."\n    },\n    {\n      "hotelName": "Stratosphere Hotel, Casino & Tower",\n      "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",\n      "price": "$40 - $80 per night",\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/1b/10/82/the-strat-hotel-casino.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1473,\n        "longitude": -115.1554\n      },\n      "rating": 3.5,\n      "description": "Located at the north end of the Strip, the Stratosphere offers panoramic views from its tower, a casino, and thrill rides. Rooms are generally more affordable than central Strip hotels."\n    },\n    {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$35 - $75 per night",\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1a/6d/55/55/excalibur-hotel-casino.jpg",\n      "geoCoordinates": {\n        "latitude": 36.0985,\n        "longitude": -115.1742\n      },\n      "rating": 4,\n      "description": "A medieval-themed hotel with a family-friendly atmosphere, several dining options, and a casino.  It\'s well-located on the south end of the Strip and often has good deals."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Exploring the Strip (South End) & Free Attractions",\n      "bestTimeToVisit": "Morning & Evening for cooler temperatures",\n      "places": [\n        {\n          "placeName": "Welcome to Las Vegas Sign",\n          "placeDetails": "A classic photo opportunity!  Get your picture taken at the iconic sign.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Welcome_to_Las_Vegas_sign.JPG/1280px-Welcome_to_Las_Vegas_sign.JPG",\n          "geoCoordinates": {\n            "latitude": 36.0828,\n            "longitude": -115.1731\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Short walk or ride-share from Excalibur/South Strip"\n        },\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "A stunning free display of floral arrangements that changes seasonally.",\n          "placeImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/d1/63/39/bellagio-conservatory.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1127,\n            "longitude": -115.1742\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Take the bus or walk if staying at central strip",\n          "bestTimeToVisit": "Morning to avoid crowds."\n        },\n        {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "A mesmerizing free water show synchronized to music.  Runs every 30 minutes during the day and every 15 minutes in the evening.",\n          "placeImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/16/35/97/79/bellagio-fountains.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1125,\n            "longitude": -115.1735\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Located right outside the Bellagio Conservatory.",\n          "bestTimeToVisit": "Evening for the lights."\n        },\n          {\n            "placeName": "High Roller Observation Wheel",\n            "placeDetails": "Enjoy breathtaking panoramic views of the Las Vegas Strip and the surrounding area. Each cabin is climate-controlled and offers a comfortable experience.",\n            "placeImageUrl": "https://res.cloudinary.com/simpleview/image/upload/v1686764125/clients/lasvegas/High_Roller_3a229e38-e4b6-4e51-bd20-fffd277b86e3.jpg",\n            "geoCoordinates": {\n              "latitude": 36.1146,\n              "longitude": -115.1698\n            },\n            "ticketPricing": "Approximately $25 - $37 per person (book in advance for better deals)",\n            "timeToTravel": "A short walk from the Bellagio Fountains or take the Las Vegas Monorail.",\n            "bestTimeToVisit": "Evening for the city lights, but daytime offers clear views of the surrounding landscape."\n          }\n      ]\n    },\n    "day2": {\n      "theme": "Downtown Las Vegas (Fremont Street) & Budget Entertainment",\n      "bestTimeToVisit": "Evening for the light shows and atmosphere",\n      "places": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian mall with a massive video screen canopy, light shows, street performers, and cheap eats.",\n          "placeImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/e2/d9/07/fremont-street-experience.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1703,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "Free (some attractions within Fremont Street may have costs)",\n          "timeToTravel": "Ride-sharing or bus from the Strip (allow 30-45 minutes). Consider The Deuce bus for budget travel.",\n          "bestTimeToVisit": "Evening for Viva Vision Light show."\n        },\n        {\n          "placeName": "Container Park",\n          "placeDetails": "Unique shopping and dining area constructed from repurposed shipping containers. Offers live music and a playground for kids (if you have them!).",\n          "placeImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/07/87/d2/96/container-park.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1702,\n            "longitude": -115.1407\n          },\n          "ticketPricing": "Free to enter (costs for food/shopping)",\n          "timeToTravel": "Short walk from Fremont Street.",\n          "bestTimeToVisit": "Afternoon/Evening"\n        },\n        {\n          "placeName": "Free Concerts/Street Performers (Fremont Street)",\n          "placeDetails": "Enjoy free live music and entertainment throughout the Fremont Street Experience.",\n          "placeImageUrl": "https://downtownerlv.com/wp-content/uploads/2023/06/FSE-summer-concert-series-2023-compressed.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1703,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Located along Fremont Street.",\n           "bestTimeToVisit": "Evening"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Nature Escape & Budget Relaxation",\n      "bestTimeToVisit": "Morning for hiking/outdoor activities, Afternoon for pool/relaxation",\n      "places": [\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "Scenic desert landscapes with hiking trails, rock climbing, and a 13-mile scenic drive.",\n          "placeImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/11/7c/7f/79/red-rock-canyon-national.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1333,\n            "longitude": -115.4167\n          },\n          "ticketPricing": "$15 per vehicle entry",\n          "timeToTravel": "Ride-sharing or rental car (allow 30-45 minutes from the Strip).",\n           "bestTimeToVisit": "Morning"\n        },\n        {\n          "placeName": "Hotel Pool Time",\n          "placeDetails": "Relax and enjoy the pool at your hotel. Many Vegas hotels have pools open to guests.",\n          "placeImageUrl": "https://www.wynnlasvegas.com/img/amenities/pool/wlv-pool-intro-1440x600.jpg",\n          "geoCoordinates": "Varies depending on hotel",\n          "ticketPricing": "Free for hotel guests",\n          "timeToTravel": "On-site at your hotel.",\n          "bestTimeToVisit": "Afternoon"\n        },\n        {\n          "placeName": "Free Shows/Attractions on the Strip (Revisit)",\n          "placeDetails": "Revisit any free attractions you enjoyed earlier in the trip, or explore others like the volcano show at the Mirage or the water show at the Fountains of Bellagio.",\n          "placeImageUrl": "https://vegasguide.com/wp-content/uploads/2019/08/mirage-volcano.jpg",\n          "geoCoordinates": "Varies depending on attraction.",\n          "ticketPricing": "Free",\n          "timeToTravel": "Varies depending on attraction",\n          "bestTimeToVisit": "Evening"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Important Notes & Tips for a Budget Trip:**\n\n*   **Hotel Deals:**  Check for deals on hotel booking websites like Expedia, Booking.com, or directly on the hotel\'s website.  Consider staying mid-week (Tuesday-Thursday) for lower rates.\n*   **Transportation:**  The Deuce bus is a cost-effective way to get around the Strip and downtown.  Ride-sharing can be convenient, but costs can add up. Walking is free!\n*   **Food & Drink:**  Avoid eating at fancy restaurants on the Strip.  Look for cheaper options like fast food, food courts, or off-Strip restaurants.  Happy hour deals can save money on drinks.  Consider bringing snacks and drinks to avoid buying them on the Strip.\n*   **Gambling:** Set a strict budget for gambling and stick to it.  Consider playing lower-limit games.\n*   **Free Activities:** Las Vegas has many free attractions, so take advantage of them!\n*   **Show Tickets:** If you want to see a show, look for discount tickets at Tix4Tonight booths on the Strip.  Be flexible with your show choices to get the best deals.\n*   **Book in Advance:** Booking hotels, rental cars, and some attractions in advance can often save you money.\n\n**Disclaimer:**\n\n*   Prices are estimates and can vary widely depending on the time of year, availability, and promotions.  Always check current pricing before booking.\n*   Opening hours and show schedules can change. Confirm before you go.\n*   Transportation times are estimates and can be affected by traffic.\n\nEnjoy your budget-friendly Las Vegas adventure!\n',
        },
      ],
    },
  ],
});
