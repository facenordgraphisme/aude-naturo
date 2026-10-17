import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  ...,
  "homeId": homePage._ref
}`);

export const ROUTES_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)]{
  _id,
  "slug": slug.current
}`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]`);

export const PAGE_BY_ID_QUERY = defineQuery(`*[_type == "page" && _id == $id][0]`);
