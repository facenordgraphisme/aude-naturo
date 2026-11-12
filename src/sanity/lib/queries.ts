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

const POST_CARD = `_id, title, "slug": slug.current, publishedAt, excerpt, cover, tags,
  "readingTime": round(length(pt::text(body)) / 6 / 220)`;

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  ${POST_CARD}
}`);

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "readingTime": round(length(pt::text(body)) / 6 / 220),
  "related": *[_type == "post" && slug.current != $slug && defined(slug.current)] | order(publishedAt desc)[0...2]{
    ${POST_CARD}
  }
}`);
