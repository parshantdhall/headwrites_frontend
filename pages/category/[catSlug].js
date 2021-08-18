import gFetch from "../../lib/gFetch";
import MainPageComponents from "../../components/MainPageComponents";

const SpecificCatPage = ({ artData, catData }) => {
  return <MainPageComponents artData={artData} catData={catData} />;
};

// Getting all paths

export async function getStaticPaths() {
  const slugQuery = `
  {
  categories {
    slug
  }
}`;

  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.categories
      ? data["categories"].map((cat) => ({
          params: { catSlug: cat.slug },
        }))
      : "";
  return {
    paths: slugs,
    fallback: false,
  };
}

// Fetching data
export async function getStaticProps(context) {
  const getSpecificArticleByCatQuery = `
{
  posts(orderBy: date_DESC, where:{category: {categoryName_contains: "${context.params.catSlug}"}}) {
    id
    title

    slug
    date
    category{
      categoryName
    }
    featuredImage{
      url
      altText
    }
    featuredPost
    author{
      name
      picture{
        url
      }
    }
    postTags{
      tagName
    }
content {
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
  const data = await gFetch(getSpecificArticleByCatQuery);
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

export default SpecificCatPage;
