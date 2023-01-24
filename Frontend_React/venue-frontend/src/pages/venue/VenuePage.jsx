import "./venuePage.css";
import moment from "moment";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import Chip from "@mui/material/Chip";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";
import { DateRange } from "react-date-range";

import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  DayView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "../../constants/testData/appointments";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import SprialIamge from "../../constants/spiral1.png";

import {
  Alert,
  AlertTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { convertCalendarData } from "../../lib/convertCalendaeData";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { photos } from "../../constants/testData/photos";

const MUTATION = gql`
  mutation Mutation(
    $timeSlotStart: DateTime!
    $timeSlotEnd: DateTime!
    $venuePk: String!
    $bookedAt: DateTime!
    $bookedBy: String!
  ) {
    createBooking(
      timeSlotStart: $timeSlotStart
      timeSlotEnd: $timeSlotEnd
      venuePk: $venuePk
      bookedAt: $bookedAt
      bookedBy: $bookedBy
    ) {
      approvedStatus
      pk
      description
      timeSlotEnd
      timeSlotStart
    }
  }
`;

const QUERY = gql`
  query VenueForPk($venuePk: String!, $orgPk: String!) {
    venueForPk(venuePk: $venuePk) {
      address
      closingTime
      description
      images
      openingTime
      pk
      venueName
    }
    orgForPk(orgPk: $orgPk) {
      pk
      orgName
      email
      website
      address
    }
    getApprovedBookingsForVenuePk(venuePk: $venuePk) {
      approvedStatus
      bookedAt
      pk
      timeSlotEnd
      timeSlotStart
      venuePk {
        address
      }
    }
  }
`;
const VenuePage = () => {
  const { orgPk, venuePk } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [calendarMode, setCalendarMode] = useState("week");

  const {
    data,
    error,
    loading,
    refetch: refetchData,
  } = useQuery(QUERY, {
    variables: { venuePk, orgPk, date: "2023-01-21 10:00:00+05:30" },
  });

  const [
    createBooking,
    { data: bookingData, loading: bookingLoading, error: bookingError },
  ] = useMutation(MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const x = moment(date).format("DD-MM-YYYY");
    console.log("hehehehe", x);
    const start = moment(`${x} ${startTime}`, "DD-MM-YYYY HH:mm").toISOString();
    const end = moment(`${x} ${endTime}`, "DD-MM-YYYY HH:mm").toISOString();
    // console.log(start, end);
    // console.log(startTime, endTime);
    if (startTime && endTime) {
      await createBooking({
        variables: {
          timeSlotStart: start,
          timeSlotEnd: end,
          venuePk: venuePk,
          bookedAt: new Date(),
          bookedBy: "83fe8033-6991-424a-8804-fa491128fcac",
        },
      });
      await refetchData();
    }

    console.log(data);
  };

  const handleOpen = (i) => {
    setSlideNumber(i % photos.length);
    setOpen(true);
  };

  const handleMove = (direction) => {
    const newSlideNumber = (slideNumber + photos.length - 1) % photos.length;

    setSlideNumber(newSlideNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(
    convertCalendarData({ allBookings: data.getApprovedBookingsForVenuePk })
  );
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.venueForPk.venueName}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.venueForPk.address}</span>
          </div>
          <span className="hotelDistance">{data.orgForPk.orgName}</span>
          <span className="hotelPriceHighlight">{`OPEN at ${data.venueForPk.openingTime.slice(
            0,
            -1
          )}`}</span>
          <span className="hotelPriceHighlight">{`CLOSES at ${data.venueForPk.closingTime.slice(
            0,
            -1
          )}`}</span>
          <div className="hotelDetailsTexts">
            <h3> About Venue:</h3>
            <p className="hotelDesc">
              {data.venueForPk.description || `<DESCRIPTION>`}
            </p>
          </div>

          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <img className="spiral" src={SprialIamge} />
            <div className="hotelDetailsTexts">
              <div className="hotelDetailsTexts" style={{ marginTop: "30px" }}>
                <h1 className="hotelTitle" style={{ color: "white" }}>
                  Reserve your slot
                </h1>
                {/* <h3 style={{ color: "white" }}>Reserve your slot</h3> */}
                {/* <div className="selectCalendarType">
                  <ToggleButtonGroup
                    color="standard"
                    value={calendarMode}
                    exclusive
                    onChange={(e, val) => setCalendarMode(val)}
                  >
                    <ToggleButton value="week">Week View</ToggleButton>
                    <ToggleButton value="today">Today</ToggleButton>
                  </ToggleButtonGroup>
                </div> */}

                {/* {data.getApprovedBookingsOnDate.map((booking) => (
                  <Chip
                    label={`${moment(booking.timeSlotStart).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )} - ${moment(booking.timeSlotEnd).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}`}
                    color="error"
                    variant="outlined"
                  ></Chip>
                ))} */}
              </div>
              <Paper>
                <Scheduler
                  data={convertCalendarData({
                    allBookings: data.getApprovedBookingsForVenuePk,
                  })}
                  height={660}
                >
                  <ViewState
                    defaultCurrentDate={new Date()}
                    defaultCurrentViewName="Week"
                  />
                  <WeekView startDayHour={10} endDayHour={17} />
                  <DayView startDayHour={10} endDayHour={17} />
                  <Toolbar />
                  <DateNavigator />
                  <TodayButton />
                  <ViewSwitcher />
                  <Appointments />
                </Scheduler>
              </Paper>
            </div>
            <div className="hotelDetailsPrice">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={date}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <form onSubmit={handleSubmit}>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  min="09:00"
                  max="17:00"
                  value={startTime}
                  onChange={(e) => {
                    let hour = e.target.value.split(":")[0];
                    setStartTime(`${hour}:00`);
                  }}
                  // required
                />
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  min={startTime ? startTime : "09:00"}
                  max="17:00"
                  // required
                  value={endTime}
                  onChange={(e) => {
                    let hour = e.target.value.split(":")[0];
                    setEndTime(`${hour}:00`);
                  }}
                />
                <button className="finalButton" type="submit">
                  Reserve or Book Now!
                </button>
                {bookingData && (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Successfully created a request for the slot. —{" "}
                    <strong>check it out!</strong>
                  </Alert>
                )}
                {bookingError && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Couldn't request booking. — <strong>check it out!</strong>
                  </Alert>
                )}
              </form>
            </div>
          </div>
        </div>
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default VenuePage;
