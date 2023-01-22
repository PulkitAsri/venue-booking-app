import OrgContainer from "../../components/orgContainer/OrgContainer";
import FeaturedProperties from "../../components/venuesContainer/VenuesContainer";
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
        <OrgContainer />
        {/* <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList /> */}
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
