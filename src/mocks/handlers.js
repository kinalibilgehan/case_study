import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/airports", ({ request, params, cookies }) => {
    return HttpResponse.json({
      airportsAvailable: [
        { code: "IST", city: "Istanbul", country: "Türkiye" },
        { code: "SAW", city: "Istanbul", country: "Türkiye" },
        { code: "ESB", city: "Ankara", country: "Türkiye" },
        { code: "DLM", city: "Dalaman", country: "Türkiye" },
        { code: "ADB", city: "İzmir", country: "Türkiye" },
        { code: "ADA", city: "Adana", country: "Türkiye" },
      ],
    });
  }),
  http.get("/api/flights", ({ request, params, cookies }) => {
    return HttpResponse.json({
      flightsAvailable: [
        {
          id: 1,
          from: "IST",
          to: "ESB",
          fromCity: "İstanbul",
          toCity: "Ankara",
          flightDate: "01/29/2024",
          flightTime: "11.30",
          price: 300,
          duration: 70,
        },
        {
          id: 2,
          from: "IST",
          to: "ESB",
          fromCity: "İstanbul",
          toCity: "Ankara",
          flightDate: "01/29/2024",
          flightTime: "11.30",
          price: 250,
          duration: 100,
        },
        {
          id: 3,
          from: "IST",
          to: "ESB",
          fromCity: "İstanbul",
          toCity: "Ankara",
          flightDate: "01/29/2024",
          flightTime: "11.30",
          price: 400,
          duration: 60,
        },
        {
          id: 4,
          from: "IST",
          to: "ESB",
          fromCity: "İstanbul",
          toCity: "Ankara",
          flightDate: "01/30/2024",
          flightTime: "11.30",
          price: 300,
          duration: 70,
        },
        {
          id: 5,
          from: "IST",
          to: "ESB",
          fromCity: "İstanbul",
          toCity: "Ankara",
          flightDate: "01/30/2024",
          flightTime: "11.30",
          price: 300,
          duration: 70,
        },
      ],
    });
  }),
];
