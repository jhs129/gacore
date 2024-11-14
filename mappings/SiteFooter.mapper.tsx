import { figmaMapping, type BaseFigmaProps } from '@builder.io/dev-tools/figma';;
import Footer "@/components/layout/footer";

// ❖ site-footer
interface FigmaSiteFooterProps extends BaseFigmaProps {
  name?: 'site-footer';
  version?: 'minimized' | 'full';
}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "03feeac018b53e94fefa9705b0ac1e2b3275aa3d",
  mapper(figma: FigmaSiteFooterProps) {
  return ( 
    <Footer />
  );
}

});
