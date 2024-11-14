import { figmaMapping, type BaseFigmaProps } from '@builder.io/dev-tools/figma';
import Hero from '@/components/ui/hero';

// ❖ media
interface FigmaMediaProps extends BaseFigmaProps {
  version?: 'image' | 'video';
}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "5aa911136dc7052d92cf821f836e942cc82144bf",
  mapper(figma: FigmaMediaProps) {
  return ( 
    <Hero />
  );
}

});
