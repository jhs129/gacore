import { figmaMapping, type BaseFigmaProps } from "@builder.io/dev-tools/figma";
import GeorgiaCancerCardComponent  from "@/components/ui/GeorgiaCancerCardComponent";

// ❖ Stacked card
interface FigmaStackedCardProps extends BaseFigmaProps {}

// Read more at https://www.builder.io/c/docs/mapping-functions
figmaMapping({
  componentKey: "a79bb6c8ccfee2be2b9d5cefcb81fc2d88c62fff",
  mapper(figma: FigmaStackedCardProps): JSX.Element {
    // Header section
    const headerNode = figma.$findOneByName("header");
    const headerTitle = headerNode?.$findOneByName("title")?.$textContent;
    const headerSubtitle = headerNode?.$findOneByName("subtitle")?.$textContent;

    // Image section
    const imageNode = figma.$findOneByName("image");
    const imageSrc = imageNode?.$imageUrl;
    const imageAlt = imageNode?.$name ?? "Card image";

    // Content section
    const contentNode = figma.$findOneByName("content");
    const contentTitle = contentNode?.$findOneByName("title")?.$textContent;
    const contentSubtitle =
      contentNode?.$findOneByName("subtitle")?.$textContent;
    const contentDescription =
      contentNode?.$findOneByName("description")?.$textContent;

    // Button section
    const buttonText = figma.$findOneByName("button")?.$textContent;

    return (
      <GeorgiaCancerCardComponent
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        contentTitle={contentTitle}
        contentSubtitle={contentSubtitle}
        contentDescription={contentDescription}
        buttonText={buttonText}
      />
    );
  },
});
