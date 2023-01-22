import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const ORG_DATA = gql`
  query Query {
    org {
      pk
      orgName
      email
      website
      address
      ownerPk {
        pk
        name
        email
        isAdmin
      }
    }
  }
`;

const ALL_ORGS = gql`
  query Query {
    allOrgs {
      pk
      orgName
      email
      website
      address
      ownerPk {
        pk
        name
        email
        isAdmin
      }
    }
  }
`;

const VenueList = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery(ORG_DATA);

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
            {data.ALL_ORGS.map((org) => (
              <SearchItem org={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueList;
