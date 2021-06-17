// This file works with Strapi API

export const getStrapiURL = (path = "") => {
  return `
    ${process.env.STRAPI_URL || "http://localhost:1337"}${path}
  `;
};

export const fetchAPI = async (path) => {
  const url = getStrapiURL(path);
  const response = await fetch(url);
  // I doubt I ever have to check response.ok here.
  const json = await response.json();
  return json;
};
