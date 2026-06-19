import SidebarNav from "../components/SidebarNav";
import TopNavbar from "../components/TopNavbar";
import HeroCarousel from "../components/HeroCarousel";
import VisaSearchWidget from "../components/VisaSearchWidget";
import DestinationCarousel from "../components/DestinationCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#131122]">
      <SidebarNav />
      <TopNavbar />
      <main className="lg:pl-0">
        <HeroCarousel />
        <VisaSearchWidget />
        <DestinationCarousel />
       
      </main>
    </div>
  );
}