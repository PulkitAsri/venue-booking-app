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

const bookings = [];

module.exports = { users };
