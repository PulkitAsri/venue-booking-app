import OrgContainer from "../../components/orgContainer/OrgContainer";
import VenueContainer from "../../components/venuesContainer/VenuesContainer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">All Organizations</h1>
        <OrgContainer />
        {/* <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList /> */}
        <h1 className="homeTitle">Venues guests love</h1>
        <VenueContainer />
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
