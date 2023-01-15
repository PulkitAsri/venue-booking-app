const users = [
  {
    pk: "12345",
    name: "Gene Kranz",
    email: "gene@nasa.gov",
    password: "password123!",
    isAdmin: true,
  },
  {
    pk: "67890",
    name: "Neil Armstrong",
    email: "neil@nasa.gov",
    password: "password890!",
    isAdmin: false,
  },
  {
    pk: "10000",
    name: "Pulkit Asri",
    email: "pulkit@sprinto.com",
    password: "pulkit123!",
    isAdmin: true,
  },
  {
    pk: "10001",
    name: "Shubham Rawal",
    email: "shubham@usict.com",
    password: "shubham123!",
    isAdmin: true,
  },
];

const orgs = [
  {
    pk: "092674",
    orgName: "USICT",
    email: "ggsipu.pr@rediffmail.com",
    website: "http://ipu.ac.in/",
    address: "",
    ownerPk: "10000",
  },
];

const venues = [
  {
    pk: "726783",
    venueName: "E-Block Auditorium",
    venueOpensAt: "",
    venueClosesAt: "",
    address: "",
    description: "",
    images: ["", ""],
    orgPk: "092674",
  },
  {
    pk: "726783",
    venueName: "E-109 TNP-Hall",
    venueOpensAt: "",
    venueClosesAt: "",
    address: "",
    description: "",
    images: ["", ""],
    orgPk: "092674",
  },
];

const bookings = [
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d4",
    timeSlotStart: "2022-05-15T10:00:00",
    timeSlotEnd: "2022-05-15T12:00:00",
    venuePk: 2,
    bookedAt: "2022-05-14T12:00:00",
    description: "Birthday Party",
    bookedByPk: "John Smith",
    approvedStatus: "pending",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d5",
    timeSlotStart: "2022-07-22T11:00:00",
    timeSlotEnd: "2022-07-22T14:00:00",
    venuePk: 5,
    bookedAt: "2022-07-21T13:00:00",
    description: "Wedding",
    bookedByPk: "Jane Doe",
    approvedStatus: "approved",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d6",
    timeSlotStart: "2022-09-01T10:00:00",
    timeSlotEnd: "2022-09-01T12:00:00",
    venuePk: 1,
    bookedAt: "2022-08-31T12:00:00",
    description: "Business Meeting",
    bookedByPk: "Michael Johnson",
    approvedStatus: "rejected",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d7",
    timeSlotStart: "2022-11-05T14:00:00",
    timeSlotEnd: "2022-11-05T16:00:00",
    venuePk: 3,
    bookedAt: "2022-11-04T16:00:00",
    description: "Charity Event",
    bookedByPk: "Emily Davis",
    approvedStatus: "pending",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d8",
    timeSlotStart: "2023-02-01T15:00:00",
    timeSlotEnd: "2023-02-01T17:00:00",
    venuePk: 4,
    bookedAt: "2023-01-31T17:00:00",
    description: "Concert",
    bookedByPk: "David Brown",
    approvedStatus: "approved",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d9",
    timeSlotStart: "2022-08-03T10:00:00",
    timeSlotEnd: "2022-08-03T12:00:00",
    venuePk: 1,
    bookedAt: "2022-08-01T12:00:00",
    description: "Conference",
    bookedByPk: "Julia Smith",
    approvedStatus: "pending",
  },
  {
    bookingPk: "a1b2c3d4-e5f6-a1b2-c3d4-e5f6a1b2c3d10",
    timeSlotStart: "2022-06-22T14:00:00",
    timeSlotEnd: "2022-06-22T18:00:00",
    venuePk: 2,
    bookedAt: "2022-06-21T18:00:00",
    description: "Graduation Ceremony",
    bookedByPk: "Mark Johnson",
    approvedStatus: "approved",
  },
];

module.exports = { users };
