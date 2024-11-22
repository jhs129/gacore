import { figmaMapping, type BaseFigmaProps } from '@builder.io/dev-tools/figma';;
import Hero from "@/components/ui/hero";

// ❖ hero
interface FigmaHeroProps extends BaseFigmaProps {
  name?: 'hero';
  layout?: 'desktop';
}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "acf0265923cf7e3ecaa56cbc896a51f0c1b93856",
  mapper(figma: FigmaHeroProps) {

  let title = figma.$findOne((node) => { return node.$name === "title" })?.$textContent || "Default Title";
  let subtitle = figma.$findOne((node) => { return node.$name === "description" })?.$textContent || "Default Subtitle";  

  title = "[Title]";
  subtitle = "[Subtitle]";

  return ( 
    <Hero title={title} subtitle={subtitle}/>
  );
}

});
