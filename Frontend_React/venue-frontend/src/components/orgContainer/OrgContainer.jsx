import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import "./orgContainer.css";
import OrgItem from "./OrgItem";

const QUERY = gql`
  query Query {
    allOrgs {
      pk
      address
      email
      orgName
      website
    }
  }
`;

const OrgContainer = () => {
  const { data, loading, error } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="featured">
      {data.allOrgs.map((org) => (
        <OrgItem org={org} key={org.pk} />
      ))}
    </div>
  );
};

export default OrgContainer;
