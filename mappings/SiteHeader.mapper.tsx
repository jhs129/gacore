import { figmaMapping, type BaseFigmaProps } from '@builder.io/dev-tools/figma';;
import Header from "@/components/layout/header";

// ❖ site-header
interface FigmaSiteHeaderProps extends BaseFigmaProps {

}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "d38bb6b35d58efbad92c7a481fe50830044b4bdb",
  mapper(figma: FigmaSiteHeaderProps) {
  return ( 
    <Header />
  );
}

});
