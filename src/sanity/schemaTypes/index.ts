import { contactMessage, page, siteSettings } from "./documents";
import { objectTypes } from "./objects";
import { post } from "./post";
import { sectionTypes } from "./sections";

export const schemaTypes = [siteSettings, page, post, contactMessage, ...objectTypes, ...sectionTypes];
