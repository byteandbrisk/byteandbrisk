import { HeroTypedWaterline } from '@components/sections/HeroTypedWaterline';
// import { HeroKinetic } from '@components/sections/HeroKinetic';
import { Capabilities2x2 } from '@components/sections/Capabilities2x2';
import { TrackRecord } from '@components/sections/TrackRecord';
import { ShowcaseRefined } from '@components/sections/ShowcaseRefined';
import { ProcessTimeline } from '@components/sections/ProcessTimeline';
import { CTABandEnhanced } from '@components/sections/CTABandEnhanced';
import { FooterEnhanced } from '@components/sections/FooterEnhanced';
import { BackgroundOrbs } from '@components/common/BackgroundOrbs';

export function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Dynamic Background for Glass Effect */}
      <BackgroundOrbs />
      
      <div className="relative z-10">
        {/* New typed + waterline hero */}
        <HeroTypedWaterline />
        
        {/* Original hero - commented out for comparison */}
        {/* <HeroKinetic /> */}
        
        <Capabilities2x2 />
        <TrackRecord />
        <ShowcaseRefined />
        <ProcessTimeline />
        <CTABandEnhanced />
        <FooterEnhanced />
      </div>
    </div>
  );
}

