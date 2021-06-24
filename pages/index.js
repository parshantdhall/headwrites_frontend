import MainPageComponents from "../components/MainPageComponents";
import gFetch from "../lib/gFetch";
// import StorySection from "../components/StorySection";

export default function Home({ artData, catData }) {
  return <MainPageComponents artData={artData} catData={catData} />;
}

export async function getStaticProps() {
  const articleQuery = `
     {
      articles(sort: "published_at:desc") {
    id
    Title
    Slug
    category {
      category_name
    }
    author {
      author_name
      author_avatar {
        url
      }
    }
    Featured_image{
      formats
      alternativeText
      caption
    }
    Is_guest_post
    is_featured
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

  const data = await gFetch(articleQuery);
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
