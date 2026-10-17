import { contactMessage, page, siteSettings } from "./documents";
import { objectTypes } from "./objects";
import { sectionTypes } from "./sections";

export const schemaTypes = [siteSettings, page, contactMessage, ...objectTypes, ...sectionTypes];
