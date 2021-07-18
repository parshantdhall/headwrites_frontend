// This is the file for the images with blur placeholder
export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

// Shimmer effect for loading images
export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#dddddd" offset="20%" />
      <stop stop-color="#ffff" offset="50%" />
      <stop stop-color="#dddddd" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#dddddd" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
