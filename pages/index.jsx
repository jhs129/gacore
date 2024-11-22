import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";

import Footer from "@/components/layout/footer2";
import Header from "@/components/layout/header";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
builder.apiVersion = "v3";

// Define the Page component
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      <Header />
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page || undefined} />
      <Footer />
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page

  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
      options: {
        vercelPreview: true,
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};
