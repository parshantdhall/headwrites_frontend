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
    Slug
  }
}`;

  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.categories
      ? data["categories"].map((cat) => ({
          params: { catSlug: cat.Slug },
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
  articles(sort: "published_at:desc",where: {category: {
    category_name_containss: "${context.params.catSlug}"
  } }) {
    id
    Title
    Body
    Slug,
    Featured_image{
      formats
      alternativeText
      caption
    }
    category{
      category_name
    }
    author {
      author_name
      author_avatar {
        url
      }
    }
    Is_guest_post
    published_at
    article_tags {
    id
    tag_name
  }
}
categories {
    id
    category_name
    Slug
  }

}
  `;
  const data = await gFetch(getSpecificArticleByCatQuery);
  if (!data) {
    return {
      notFound: true,
    };
  }

  const artData = data.data && data.data.articles ? data.data.articles : [];
  const catData = data.data && data.data.categories ? data.data.categories : [];

  return {
    props: {
      artData,
      catData,
    },
  };
}

export default SpecificCatPage;
