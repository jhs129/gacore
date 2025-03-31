// pages/[...page].tsx
import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import { GetStaticProps, GetStaticPaths } from "next";

// TO DO: Add your Public API Key 
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all announcement bar entries
  const announcements = await builder.getAll('announcement-bar', {
    options: { noTargeting: true }
  });

  // Generate paths for each announcement
  const paths = announcements.map((announcement) => ({
    params: { name: announcement.data?.name || 'default' }
  }));

  return {
    paths,
    fallback: true // Enable fallback for new paths that aren't built at build time
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlPath = '/' + (Array.isArray(params?.page) ? params.page.join('/') : params?.name || '');

  // Fetch the content for the specific section using its model name
  const announce = await builder
    .get("announcement-bar", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  return {
    props: {
      announce: announce || null,
    },
  };
};


export default function Page({ announce }: { announce: any }) {
  return (
    <>
      {announce && (
        <div className="bg-red-500 text-white align-center">
        <BuilderComponent 
          model="announcement-bar" 
          content={announce} 
        />
        </div>
      )}
    </>
  );
}
