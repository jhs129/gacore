import { figmaMapping, type BaseFigmaProps } from '@builder.io/dev-tools/figma';;
import Logo from "@/components/ui/logo";

// ❖ ga-core
interface FigmaGaCoreProps extends BaseFigmaProps {

}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "8200df95553c68c3a97d2d315c51b4080cf8c8de",
  mapper(figma: FigmaGaCoreProps) {
  return ( 
    <Logo
      image=""
      alt=""
    />
  );
}

});
