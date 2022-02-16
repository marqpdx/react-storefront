import { ApolloQueryResult } from "@apollo/client";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React, { ReactElement } from "react";
import { useIntl } from "react-intl";

import { HomepageBlock, Layout } from "@/components";
import BaseSeo from "@/components/seo/BaseSeo";
import apolloClient from "@/lib/graphql";
import { contextToRegionQuery } from "@/lib/regions";
import { homepagePaths } from "@/lib/ssr/homepage";
import {
  HomepageBlocksQuery,
  HomepageBlocksQueryDocument,
  HomepageBlocksQueryVariables,
} from "@/saleor/api";

const Home = ({ menuData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const t = useIntl();
  console.log('menuData', menuData);
  return (
    <>
      <BaseSeo />
      <div className="py-10">

        <header className="mb-4">
          <div className="max-w-7xl mx-auto px-8 text-3xl">Welcome to the Freedom Harvest Newmarket @ Unfurl</div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex">
              <div>Left</div>
              <div>Right</div>
            </div>
            {menuData?.menu?.items?.map((m) => {
              if (!!m) return <HomepageBlock key={m.id} menuItem={m} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = homepagePaths();
  console.log('paths', paths);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const result: ApolloQueryResult<HomepageBlocksQuery> =

    await apolloClient.query<HomepageBlocksQuery, HomepageBlocksQueryVariables>(
      {
        query: HomepageBlocksQueryDocument,
        variables: { slug: "homepage", ...contextToRegionQuery(context) },
      }
    );
    console.log('HomepageBlocksQuery: context', context)
  return {
    props: {
      menuData: result?.data,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
