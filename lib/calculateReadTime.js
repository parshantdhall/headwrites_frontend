const calculateReadTime = (articleText) => {
  const wordLength = +articleText.split(" ").length;
  const wpm = 200;
  const readTime = wordLength / wpm;
  const timeSplit = String(readTime).split(".");
  const min = timeSplit[0];
  const sec = Math.ceil(timeSplit[1] * 0.1 * 0.6);

  return { min, sec };
};

export default calculateReadTime;
