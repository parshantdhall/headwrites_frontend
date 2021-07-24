import { useState, useEffect } from "react";
import gFetch from "../gFetch";
import { menuLinkContext } from "./context";
const MenuLinkProvider = ({ children }) => {
  const [menuLinkData, setMenuLinkData] = useState([]);

  const updateLinkData = (dataArr) => {
    setMenuLinkData(dataArr);
  };
  // fetching all the links
  useEffect(() => {
    (async () => {
      const pageLinksDataQuery = `{
      pages{
        id
        title
        slug
      }
    }
    `;
      try {
        const { data } = await gFetch(pageLinksDataQuery);
        setMenuLinkData(data?.pages);
      } catch (e) {
        console.dir(e);
      }
    })();
  }, []);
  return (
    <menuLinkContext.Provider value={{ menuLinkData, updateLinkData }}>
      {children}
    </menuLinkContext.Provider>
  );
};

export default MenuLinkProvider;
