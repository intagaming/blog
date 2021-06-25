// This file works with Strapi API

export const getStrapiURL = (path = ""): string => `
    ${process.env.STRAPI_URL || "http://localhost:1337"}${path}
  `;

export async function fetchAPI<T>(path: string): Promise<T | null> {
  const url = getStrapiURL(path);
  const response = await fetch(url);
  if (!response.ok) return null;
  const json = await response.json();
  return json;
}
