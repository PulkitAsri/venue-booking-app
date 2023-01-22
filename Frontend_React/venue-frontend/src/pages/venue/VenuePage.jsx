import "./venuePage.css";
import moment from "moment";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

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
import { useQuery } from "@apollo/client";
import { DateRange } from "react-date-range";
// import { TextField } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

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
  }
`;
const VenuePage = () => {
  const { orgPk, venuePk } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, error, loading } = useQuery(QUERY, {
    variables: { venuePk, orgPk },
  });

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const photos = [
    { src: "https://thumbs.dreamstime.com/b/auditorium-13235668.jpg" },
    {
      src: "https://thumbs.dreamstime.com/b/red-seats-rows-people-vienna-state-opera-auditorium-wonderful-view-theatre-concert-hall-austria-empty-parterre-191882936.jpg",
    },

    {
      src: "https://static01.nyt.com/images/2022/01/17/arts/17broadway1/merlin_200324061_4c97c271-82ef-4aa6-8bf7-6d91851ea0de-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    },
  ];
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
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
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle"> {data.venueForPk.venueName}</h1>
              <p className="hotelDesc">
                {data.venueForPk.description || `<DESCRIPTION>`}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <DateRange
                editableDateInputs={true}
                // onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                // ranges={date}
                // className="date"
                minDate={new Date()}
              />
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                // required
              />
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                // required
              />
              <button>Reserve or Book Now!</button>
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
