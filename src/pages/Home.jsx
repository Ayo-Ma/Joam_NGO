import Hero            from "../components/sections/Hero";
import Ticker          from "../components/ui/Ticker";
// import MissionStatement from "../components/sections/MissionStatement";
// import ImpactNumbers   from "../components/sections/ImpactNumbers";
import ProgramsOverview from "../components/sections/ProgramsOverview";
// import ImpactStory     from "../components/sections/ImpactStory";
import DonationCTA     from "../components/sections/DonationCTA";
// import PartnersStrip   from "../components/sections/PartnersStrip";
import LatestNews      from "../components/sections/LatestNews";
import VolunteerCTA    from "../components/sections/VolunteerCTA";


export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      {/* <MissionStatement /> */}
      {/* <ImpactNumbers /> */}
      <ProgramsOverview />
      {/* <ImpactStory /> */}
      <DonationCTA />
      {/* <PartnersStrip /> */}
      <LatestNews />
      <VolunteerCTA />
  
    </main>
  );
}
