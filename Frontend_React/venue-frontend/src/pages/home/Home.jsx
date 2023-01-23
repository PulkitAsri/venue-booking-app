import OrgContainer from "../../components/orgContainer/OrgContainer";
import VenueContainer from "../../components/venuesContainer/VenuesContainer";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
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
        <h1 className="homeTitle">Homes guests love</h1>
        <VenueContainer />
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
