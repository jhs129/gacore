import { builder } from "@builder.io/sdk";

// Initialize Builder.io with your API key
const BUILDER_API_KEY =
  process.env.NEXT_PUBLIC_BUILDER_API_KEY || "7bf199de15724d268c1417f75ca31ce1";
console.log("BUILDER_API_KEY", BUILDER_API_KEY);
builder.apiVersion = "v3";


builder.init(BUILDER_API_KEY);

interface BuilderPage {
  id?: string;
  name?: string;
  data?: any;
  lastUpdated?: string | number;
  published?: "published" | "draft" | "archived";
}

export const resolvers = {
  Query: {
    pages: async () => {
      try {
        console.log("Fetching pages from Builder.io...");

        const pages = await builder.getAll("page", {
          // We only need the URL field
          fields: "id,name,data,lastUpdated,published",
          options: { noTargeting: true },
        });

        console.log("Fetched pages:", pages);

        if (!pages) {
          console.log("No pages found");
          return [];
        }

        return pages.map((page: BuilderPage) => ({
          id: page.id || "",
          name: page.name || "",
          data: page.data,
          lastUpdated: page.lastUpdated || "",
          published: page.published || "draft",
        }));
      } catch (error) {
        console.error("Error fetching pages:", error);
        throw new Error("Failed to fetch pages from Builder.io");
      }
    },
    page: async (_parent: unknown, { id }: { id: string }) => {
      try {
        console.log(`Fetching page with ID: ${id}`);
        const page = await builder.get("page", {
          options: {
            includeRefs: true,
          },
          query: {
            id,
          },
        });

        if (!page) {
          console.log("Page not found");
          return null;
        }

        return {
          id: page.id || "",
          name: page.name || "",
          data: page.data,
          lastUpdated: page.lastUpdated || "",
          published: page.published || "draft",
        };
      } catch (error) {
        console.error("Error fetching page:", error);
        throw new Error(`Failed to fetch page with ID: ${id}`);
      }
    },
  },
  JSON: {
    __serialize(value: any) {
      return value;
    },
  },
};
