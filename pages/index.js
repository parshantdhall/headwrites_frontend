import { useContext } from "react";
import MainPageComponents from "../components/MainPageComponents";
import gFetch from "../lib/gFetch";
import { menuLinkContext } from "../lib/global state/context";

export default function Home({ artData, catData }) {
  return <MainPageComponents artData={artData} catData={catData} />;
}

export async function getStaticProps() {
  const articleQuery = `
     {
  posts(orderBy: date_DESC) {
    id
    title
    slug
    date
    category{
      categoryName
    }
    featuredImage{
      url
    }
    featuredPost
    author{
      name
    }
    postTags{
      tagName
    }
    content{
        text
      }
  }
  categories{
    id
    categoryName
    slug
  }

}
   `;
  const data = await gFetch(articleQuery);
  if (!data) {
    return {
      notFound: true,
    };
  }

  const artData = data.data && data.data.posts ? data.data.posts : [];
  const catData = data.data && data.data.categories ? data.data.categories : [];

  return {
    props: {
      artData,
      catData,
    },
  };
}
