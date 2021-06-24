import moment from "moment";

const parseDate = (dateString) => {
  // Parsing the dATE
  const publishedDate = dateString.split("T")[0];
  const parsedDate = String(moment(publishedDate)._d).split(" ");
  const finalDateString = `${parsedDate[1]} ${parsedDate[2]}, ${parsedDate[3]}`;
  return finalDateString;
};

export default parseDate;
