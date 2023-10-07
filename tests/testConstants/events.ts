import { Event } from "@/backend/service/event/types";

export const testEvents: Event[] = [
  {
    uid: "event-001",
    title: "Public Lecture on IP & TT",
    slug: "public-lecture-on-ip-tt",
    description:
      "Providing basis information on IP & TT. How IP & IPR protection started. Where Namibia stands in IP & IPR creation, registration, protection, management, commercialization, & enforcement. NCRST's role in IP & IPR management in general. Effective IP management benefits. Setback of IP & IPR infringement at national, regional & international levels. Basic information on the concept of Open Science.",
    start_date: new Date("2023-11-07T10:00:00").getTime(),
    end_date: new Date("2023-11-07T11:30:00").getTime(),
    categories: ["Public Lecture"],
    time: "10:00am-11:30am",
    contact: {
      name: "Moses M.M.",
      phone: "081 261 0211",
      institution: "NCRST",
      designation: "Event Organizer",
    },
    target_audience: [
      "Educators",
      "Students",
      "Innovators/Entrepreneurs",
      "The Public",
      "Out of School Youth",
    ],
    participant_count: 0, // Dependent on venue capacity and interest, so initializing to 0
    preregistration_required: false,
    organizer: "NCRST",
    resources_invested:
      "ICT equipments suitable for a normal PowerPoint presentation",
    budgeted: true, // Assuming it's budgeted as S&T would be required for a venue outside the Capital
    funding: "NCRST",
    primary_image: {
      url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F500530979%2F303960266345%2F1%2Foriginal.20230425-152142?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=ea5cac756f206393d865d8ffaaad1302",
      alt: "Public Lecture on IP & TT",
    },
    images: [
      {
        url: "https://example.com/images/sample-event1.jpg",
        alt: "Public Lecture on IP & TT",
      },
      {
        url: "https://example.com/images/sample-event2.jpg",
        alt: "Public Lecture on IP & TT",
      },
    ],
    location: {
      address: "123 Sample St, Example City, EX 12345",
      lat: -22.6789,
      lng: 14.5354,
    },
    ticket_info: {
      price: 0, // Assuming it's free
      availability: 0, // Dependent on venue capacity, so initializing to 0
      sale_start_date: new Date("2023-10-01T00:00:00").getTime(), // Assuming ticket sales (if any) start a month prior
      sale_end_date: new Date("2023-11-07T10:00:00").getTime(), // Ending at the start of the event
    },
    tags: ["IP", "TT", "Public Lecture", "NCRST", "Open Science"],
  },
  {
    uid: "event-002",
    title: "Public Lecture on Biosafety: GMOs",
    slug: "public-lecture-on-biosafety-gmos",
    description:
      "To provide raise public knowledge of the Biosafety Act, 2006, and its regulations. The Biosafety Act, 2006, and its regulations awareness is crucial to ensure effective implementation. Namibia's status in terms Biosafety law adminstration, implementation and enforcement. NCRST's role in Biosafety act, 2006 implementation. The Namibian Biosafety Council. GMO application process and the National GMO Laboratory. Benefits and Drawbacks of Biotechnology (GMOs). The Namibia Biosafety Clearing-House. Challenges in Biosafety implementation.",
    start_date: new Date("2023-11-08T10:00:00").getTime(),
    end_date: new Date("2023-11-08T12:00:00").getTime(),
    categories: ["Public lecture and competition"],
    time: "10:00 am- 12:00 pm",
    contact: {
      name: "Mr. Paulus Mungeyi",
      email: "pmungeyi@ncrst.na",
      phone: "061 431 7008",
      institution: "NCRST",
      designation: "Manager: Biotechnology",
    },
    target_audience: [
      "Leaners",
      "Educators",
      "Students",
      "Innovators",
      "The Scientific Community",
      "Stakeholders in S & T",
      "The Public",
      "Youth",
    ],
    participant_count: 0, // Dependent on venue capacity and interest, so initializing to 0
    preregistration_required: false,
    organizer: "NCRST",
    resources_invested:
      "A sound system, Speakers and other ICT equipment suitable for a normal PowerPoint presentation",
    budgeted: true, // Assuming it's budgeted as S&T would be required for speakers outside the Capital
    funding: "NCRST",
    primary_image: {
      url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F570189999%2F1341630519723%2F1%2Foriginal.20230807-154734?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=80adf2116be3cf42d5a5587226f4bcb8",
      alt: "Public Lecture on Biosafety: GMOs",
    },
    images: [
      {
        url: "/assets/images/banner-one.png",
        alt: "Public Lecture on Biosafety: GMOs",
      },
      {
        url: "/assets/images/banner-two.png",
        alt: "Public Lecture on Biosafety: GMOs",
      },
    ],
    location: {
      address: "123 Sample St, Example City, EX 12345",
      lat: -22.9575,
      lng: 14.5053,
    },
    ticket_info: {
      price: 0, // Assuming it's free
      availability: 0, // Dependent on venue capacity, so initializing to 0
      sale_start_date: new Date("2023-10-02T00:00:00").getTime(), // Assuming ticket sales (if any) start a month prior
      sale_end_date: new Date("2023-11-08T10:00:00").getTime(), // Ending at the start of the event
    },
    tags: ["Biosafety", "GMOs", "Public Lecture", "NCRST", "Biotechnology"],
  },
  {
    uid: "event-003",
    title:
      "Public Lecture (NUST 2023 Institutional Research Week Opening Ceremony)",
    slug: "nust-2023-research-week-opening-ceremony",
    description:
      "Lecture to be delivered by Prof Kelly Chibbale, Professor of Organic Chemistry, University of Cape Town.",
    start_date: new Date("2023-11-07T07:30:00").getTime(),
    end_date: new Date("2023-11-07T13:00:00").getTime(),
    categories: ["Public Lecture"],
    time: "07:30 to 13:00",
    contact: {
      name: "Prof Edosa Omoregie",
      email: "eomoregie@nust.na",
      phone: "061 207 2240 / 081 373 2311",
      institution: "NUST",
      designation: "Event Organizer", // Assumed designation
    },
    target_audience: [
      "General Public",
      "The Scientific Community",
      "Stakeholders in Science & Technology",
      "The Public",
    ],
    participant_count: 0, // Assuming NUST will handle participant arrangements, so initializing to 0
    preregistration_required: false,
    organizer: "NUST",
    resources_invested: "NUST handling all arrangements for this activity.", // As per the provided info
    budgeted: false, // Budget details not provided
    funding: "NUST",
    primary_image: {
      url: "https://media.licdn.com/dms/image/D4D22AQFEx1vUDGd9-g/feedshare-shrink_800/0/1685362702732?e=2147483647&v=beta&t=iIe7CeFc9BRqbIz7IAVpSocFhewuwhjyknbzfVOJ8Ok",
      alt: "NUST 2023 Research Week Opening Ceremony",
    },
    images: [
      {
        url: "/assets/images/banner-one.png",
        alt: "NUST 2023 Research Week Opening Ceremony",
      },
      {
        url: "/assets/images/banner-two.png",
        alt: "NUST 2023 Research Week Opening Ceremony",
      },
    ],
    location: {
      address: "Auditorium 1, NUST Lower Campus, Brahms Street",
      lat: -22.559722, // Coordinates for NUST (assumed)
      lng: 17.083611, // Coordinates for NUST (assumed)
    },
    ticket_info: {
      price: 0, // Assuming it's free
      availability: 0, // Assuming NUST will handle participant arrangements, so initializing to 0
      sale_start_date: new Date("2023-10-01T00:00:00").getTime(), // Assuming a general ticket availability date
      sale_end_date: new Date("2023-11-07T07:30:00").getTime(), // Ending at the start of the event
    },
    tags: [
      "NUST",
      "Public Lecture",
      "Research Week",
      "Organic Chemistry",
      "University of Cape Town",
    ],
  },
  {
    uid: "event-004",
    title: "Inaugural Lectures",
    slug: "inaugural-lectures",
    description: "Professorial lectures by NUST professors.",
    start_date: new Date("2023-11-09T07:30:00").getTime(),
    end_date: new Date("2023-11-09T16:30:00").getTime(),
    categories: ["Public Lectures"], // Corrected category from "Pubic lectures" to "Public Lectures"
    time: "07:30 -- 16:30",
    contact: {
      name: "Prof Edosa Omoregie",
      email: "eomoregie@nust.na",
      phone: "061 207 2240 / 081 373 2311",
      institution: "NUST",
      designation: "Event Organizer", // Assumed designation
    },
    target_audience: [
      "General Public",
      "The Scientific Community",
      "Stakeholders in Science & Technology",
      "The Public",
    ],
    participant_count: 0, // Assuming NUST will handle participant arrangements, so initializing to 0
    preregistration_required: false,
    organizer: "NUST",
    resources_invested: "NUST handling all arrangements for this activity.", // As per the provided info
    budgeted: false, // Budget details not provided
    funding: "NUST",
    primary_image: {
      url: "https://i.ytimg.com/vi/YHkFe1iLVPw/maxresdefault.jpg",
      alt: "Inaugural Lectures at NUST",
    },
    images: [], // No additional images provided
    location: {
      address: "Auditorium 1, NUST Lower Campus, Brahms Street",
      lat: -22.559722, // Coordinates for NUST (assumed)
      lng: 17.083611, // Coordinates for NUST (assumed)
    },
    ticket_info: {
      price: 0, // Assuming it's free
      availability: 0, // Assuming NUST will handle participant arrangements, so initializing to 0
      sale_start_date: new Date("2023-10-01T00:00:00").getTime(), // Assuming a general ticket availability date
      sale_end_date: new Date("2023-11-09T07:30:00").getTime(), // Ending at the start of the event
    },
    tags: [
      "NUST",
      "Inaugural Lectures",
      "Professorial Lectures",
      "Public Lectures",
    ],
  },
  {
    uid: "event-005",
    title: "General Data Protection Session",
    slug: "general-data-protection-session",
    description:
      "Know personal data and your right: The session is intended to educate high school learners on their personal data protection and also to know and note their rights in events of personal data breach.",
    start_date: new Date("2023-11-10T09:00:00").getTime(),
    end_date: new Date("2023-11-10T10:30:00").getTime(),
    categories: ["Public Lecture"],
    time: "09:00 - 10:30",
    contact: {
      name: "Ruusa Ipinge",
      institution: "NUST",
      designation: "Event Organizer", // Assumed designation
    },
    target_audience: ["Everyone"],
    participant_count: 50,
    preregistration_required: true,
    organizer: "NUST",
    resources_invested: "Projector and microphone at the venue",
    budgeted: true, // Budget provided for lunch
    funding: "3000 (lunch)", // Assuming the funding is for lunch
    primary_image: {
      url: "https://cdn.slidesharecdn.com/ss_thumbnails/gdpr-learninglabsessiongartner-jonathan-etdesign-finalforslideshare-170308180715-thumbnail.jpg?width=640&height=640&fit=bounds",
      alt: "General Data Protection Session",
    },
    images: [], // No additional images provided
    location: {
      address: "TBD",
    },
    ticket_info: {
      price: 0, // Assuming it's free
      availability: 50, // Matching the participant count
      sale_start_date: new Date("2023-10-01T00:00:00").getTime(), // Assuming a general ticket availability date
      sale_end_date: new Date("2023-11-10T09:00:00").getTime(), // Ending at the start of the event
    },
    tags: [
      "Data Protection",
      "Personal Data",
      "Public Lecture",
      "NUST",
      "High School Learners",
    ],
  },
];

// export const testEventsOld: Event[] = [
//   {
//     uid: "e123456",
//     slug: "sample-event",
//     title: "Sample Event",
//     description: "This is a sample event for demonstration purposes.",
//     start_date: new Date("2023-11-25T20:00:00").getTime(),
//     end_date: new Date("2023-11-25T23:00:00").getTime(),
//     location: {
//       address: "123 Sample St, Example City, EX 12345",
//       lat: -22.6789,
//       lng: 14.5354,
//     },
//     organizer: "Sample Organizer",
//     ticket_info: {
//       price: 25.0,
//       availability: 100,
//       sale_start_date: new Date("2023-10-01T09:00:00").getTime(),
//       sale_end_date: new Date("2023-11-24T23:59:59").getTime(),
//     },
//     categories: ["Music", "Live Performance"],
//     tags: ["concert", "live music", "sample"],
//     primary_image: {
//       url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F500530979%2F303960266345%2F1%2Foriginal.20230425-152142?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=ea5cac756f206393d865d8ffaaad1302",
//       alt: "Sample Event Primary Image",
//     },
//     images: [
//       {
//         url: "https://example.com/images/sample-event1.jpg",
//         alt: "Sample Event Image 1",
//       },
//       {
//         url: "https://example.com/images/sample-event2.jpg",
//         alt: "Sample Event Image 2",
//       },
//     ],
//   },
//   {
//     uid: "e123456",
//     slug: "sample-event-1",
//     title: "Sample Event 1",
//     description: "This is the first sample event for demonstration purposes.",
//     start_date: new Date("2023-11-25T20:00:00").getTime(),
//     end_date: new Date("2023-11-25T23:00:00").getTime(),
//     location: {
//       address: "123 Sample St, Example City, EX 12345",
//       lat: -22.9575,
//       lng: 14.5053,
//     },
//     organizer: "Sample Organizer 1",
//     ticket_info: {
//       price: 0,
//       availability: 100,
//       sale_start_date: new Date("2023-10-01T09:00:00").getTime(),
//       sale_end_date: new Date("2023-11-24T23:59:59").getTime(),
//     },
//     categories: ["Music", "Live Performance"],
//     tags: ["concert", "live music", "sample"],
//     primary_image: {
//       url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F614126349%2F1821561805563%2F1%2Foriginal.png?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C940%2C470&s=a0cd7cee5e7c6f4b64aafbdf4efdbd41",
//       alt: "Sample Event 1 Primary Image",
//     },
//     images: [
//       {
//         url: "https://example.com/images/sample-event1-1.jpg",
//         alt: "Sample Event 1 Image 1",
//       },
//       {
//         url: "https://example.com/images/sample-event1-2.jpg",
//         alt: "Sample Event 1 Image 2",
//       },
//     ],
//   },
//   {
//     uid: "e654321",
//     slug: "sample-event-2",
//     title: "Sample Event 2",
//     description: "This is the second sample event for demonstration purposes.",
//     start_date: new Date("2023-12-01T18:00:00").getTime(),
//     end_date: new Date("2023-12-01T21:00:00").getTime(),
//     location: {
//       address: "456 Example Ave, Demo Town, DT 67890",
//       lat: -22.559722,
//       lng: 17.083611,
//     },
//     organizer: "Sample Organizer 2",
//     ticket_info: {
//       price: 30.0,
//       availability: 150,
//       sale_start_date: new Date("2023-10-15T10:00:00").getTime(),
//       sale_end_date: new Date("2023-11-30T23:59:59").getTime(),
//     },
//     categories: ["Theater", "Live Performance"],
//     tags: ["play", "live theater", "sample"],
//     primary_image: {
//       url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F570189999%2F1341630519723%2F1%2Foriginal.20230807-154734?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=80adf2116be3cf42d5a5587226f4bcb8",
//       alt: "Sample Event 2 Primary Image",
//     },
//     images: [
//       {
//         url: "/assets/images/banner-one.png",
//         alt: "Sample Event 2 Image 1",
//       },
//       {
//         url: "/assets/images/banner-two.png",
//         alt: "Sample Event 2 Image 2",
//       },
//     ],
//   },
// ];
