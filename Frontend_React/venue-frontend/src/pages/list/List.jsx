import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import VenueItem from "../../components/venueItem/VenueItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query Query {
    allVenues {
      pk
      venueName
      openingTime
      closingTime
      address
      description
      images
    }
  }
`;
const List = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {console.log(data)}
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {data.allVenues.map((venue) => (
              <VenueItem venue={venue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
