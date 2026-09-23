import Navbar from './components/Navbar';
import LiveChat from './components/LiveChat';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import StatsBand from './sections/StatsBand';
import Services from './sections/Services';
import Freedom from './sections/Freedom';
import PeopleTogether from './sections/PeopleTogether';
import BookingToArrival from './sections/BookingToArrival';
import SmartDriver from './sections/SmartDriver';
import Newsroom from './sections/Newsroom';
import PassengerStories from './sections/PassengerStories';
import Blogs from './sections/Blogs';
import DownloadApp from './sections/DownloadApp';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <Services />
        <Freedom />
        <PeopleTogether />
        <BookingToArrival />
        <SmartDriver />
        <Newsroom />
        <PassengerStories />
        <Blogs />
        <DownloadApp />
      </main>
      <Footer />
      <ScrollToTop />
      <LiveChat />
    </>
  );
}
