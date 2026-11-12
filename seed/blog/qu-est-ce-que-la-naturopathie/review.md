## Quality Review: Qu'est-ce que la naturopathie ? Définition, consultation et limites

### Overall Score: 92/100 - Exceptional
| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| Content Quality | 25 | 30 | Covers the reader's question fully, in clean French. Details from the author's own practice are there (durations, prices, the 8 tools, her background). There is still no concrete example or case, by design. A few sentences run 40-55 words (lines 53, 79, 91, 108) |
| SEO Optimization | 25 | 25 | Clean H1 > 9 H2 > 4 H3 with unique, descriptive headings. Meta title is 51 chars and the meta description about 147 chars, both accurate. 5 descriptive internal links, all to routes seeded in `seed/content.mjs`. 3 Tier 1 outbound sources |
| E-E-A-T Signals | 14 | 15 | Named author with linked byline and bio box (Euronature, hospital pharmacy). Santé.fr, Anses and JO quotes match the verified excerpts. The site has contact and about pages but no editorial or health-information policy page |
| Technical Elements | 14 | 15 | Production page.tsx emits BlogPosting + Person (jobTitle, url) + Organization + BreadcrumbList, twitter:card, OG 1200x630, and a next/image `priority` hero. The source hero is a soft, upscaled-looking JPEG of about 1780x1000, requested at width 2200 |
| AI Citation Readiness | 14 | 15 | Answer-first intro, takeaways box, ordered steps, self-contained FAQ, one entity, consistent naming. No table (by design). robots.ts allows `/`, and content is server-rendered |

### Rating: Exceptional (90-100; clears the 90 delivery gate)

N/A items: none. As in earlier iterations, site-level items were scored from repo code the orchestrator says will render this post:
- `src/app/(site)/blog/[slug]/page.tsx`: schema, byline, author box, twitter card, LCP hero rendered visible on the server.
- `src/app/robots.ts`
- `next.config.ts`
- `seed/blog.mjs`: uses `meta_title` and maps takeaways.
- `seed/content.mjs`: the /naturopathie, /qui-suis-je, /tarifs, /contact and /prestations pages exist.

Subscores:
- Content: coverage 6/7, readability 6/7, originality 3/5, structure 4/4, engagement 3/4, grammar 3/3.
- E-E-A-T: author 4, sources 4, trust 3, evidence 3.
- Technical: schema 4, image 2, structured elements 2, speed 2, mobile 2, OG 2.
- AI citation: citability 4, purpose 3, entity 3, extraction 2, crawler 2.

### Editorial Style Diagnostics
- Sentence-length variation: about 0.56. I counted 53 prose sentences by hand, leaving out list items, headings and the takeaways box. Mean is about 18.5 words, SD about 10.3, range 5 to about 55 words. Descriptive only.
- Readability estimate (French Kandel-Moles adaptation of Flesch): about 63-68. This suits a general audience. The 40+ word sentences at lines 53, 79, 91 and 108 are the densest spots.
- Configured style phrases: 0. There is no VOICE.md and none of the listed English phrases appear. One mild French equivalent: "Dans cet article, je vous explique" (line 16).
- Vocabulary diversity sample: about 0.78 (opening paragraph, line 16, roughly 99 tokens, hand count). Descriptive only.
- Second-order observations (advisory):
  - Opening-word repetition: the top three sentence openers ("La" 7, "Les" 6, "Vous" 5) cover 18 of 53 sentences (about 34%).
  - Stacked triplets: "trois idées" (32), "trois piliers" / "trois bases" (38), "trois temps" (57), "trois choses" (81).
  - Question cadence: 5 of 9 H2s are questions, plus 4 question H3s in the FAQ. This fits the definitional intent and is not a defect.
  - Local repetition at line 26: "un symptôme isolé. Au-delà du symptôme".
- These observations do not infer authorship and do not affect the score.

### Source-fidelity check on the edited passages
- Line 20: "complétés" is the correct agreement. The antecedents are mixed-gender (alimentation, activité, équilibre), so masculine plural is right.
- Line 53 (Anses): "déconseillées aux enfants et aux femmes enceintes" is quoted correctly. "avant tout usage, demander conseil à un professionnel de santé" is a faithful paraphrase. The added clause after the colon ("votre médecin ou votre pharmacien est le bon interlocuteur") is still in the same sentence. A reader could take it as Anses's wording. It is accurate and safe, but not separated from the attributed part (Low).
- Line 91 (JO, 20 March 2018): the ministry's name for that date is correct. "ne bénéficient que rarement d'études cliniques" paraphrases "études de recherches impliquant la personne humaine". This is acceptable, because the same reply speaks of "études cliniques validées". The closing quote is verbatim. The phrase "dont la naturopathie" sits in the author's own sentence, and the PSNC status is supported by Santé.fr at line 79. Readers may still infer that the 2018 reply names naturopathy, which the verified excerpt does not show (Low).
- Line 79 (Santé.fr) and line 94 ("si l'on vous demande d'arrêter votre traitement") match the verified source.

### Issues Found

#### Critical (must fix before publishing)
- None.

#### High (should fix)
- None.

#### Medium (recommended)
- **Hero image (hero.jpg, hero-credit.txt)**: the image looks like commercial stock reused from the client's Tarifs page. No licence is documented. The file is about 1780x1000 and visibly soft, yet page.tsx requests `width(2200)` for a 100vw cover, so it will look blurry on large screens. Fix: confirm the licence with the client (tracked separately) and use a higher-resolution original or a licensed replacement. Flag only, per brief.
- **Line 91, logic of "donc"**: the paragraph moves from "not recognised in the French health system" to "Quelques repères vous aideront donc à faire votre choix", but never states the step between them. Fix: add a short bridge in the author's voice, for example "Il vous revient donc de vérifier vous-même le sérieux du praticien". Do not add an unsourced claim about diplomas.
- **Originality/engagement**: there is no concrete illustration. This is a deliberate choice, so it is not a defect. One short, client-confirmed, anonymised example would raise originality. Do not invent one.
- **Trust indicators**: the site has no editorial or health-information policy page, for example "Les informations de ce blog ne remplacent pas un avis médical…" plus a review policy. Fix: add one site-wide page and link it from the footer or the author box.

#### Low (nice to have)
- **Line 53**: move the author's addition into its own sentence so it is clearly not attributed to Anses, for example: "… demander conseil à un professionnel de santé. Votre médecin ou votre pharmacien est le bon interlocuteur."
- **Line 91**: to avoid implying that the 2018 reply names naturopathy, move "dont la naturopathie" or write "Les pratiques non conventionnelles, catégorie dont relève la naturopathie selon Santé.fr, …".
- **Line 26**: avoid "symptôme isolé. Au-delà du symptôme". For example, "Au-delà de ce signe, le naturopathe s'intéresse à ce qui…".
- **Lines 104 and 108**: the reimbursement statement and "de nombreuses plantes … sont à éviter" are unsourced. Both are low-stakes and point the cautious way. A verified ameli.fr or ANSM link would complete them. Add one only after the researcher verifies it.
- **Long sentences (lines 53, 91, 108)**: split each in two to improve readability.
- **/tarifs meta price consistency**: tracked separately with the client (flag only). Make sure 65 € / 55 € (line 112) match the live /tarifs page at publication.
- **French typography**: use non-breaking spaces before ":", ";", "?", "!" and inside « ».
- **Preview-only artefacts (HTML/PDF, not production)**:
  - The takeaways blockquote renders as one paragraph with literal "- " characters (HTML lines 86-90).
  - The byline is in English ("By … min read").
  - JSON-LD `keywords` is a stringified array.
  - The 16:9 hero is declared 1200x630.
  - Production (seed/blog.mjs plus page.tsx) handles all of these. Fix them only if the PDF will be shared.

### Prioritized Fix List
1. Resolve the hero licence with the client and replace the soft JPEG with a higher-resolution original.
2. Split the Anses sentence (line 53) so the doctor/pharmacist advice is clearly the author's own. Detach "dont la naturopathie" from the 2018 ministerial attribution (line 91).
3. Add the missing bridge before "Quelques repères vous aideront donc" (line 91).
4. Add a site-wide editorial or health-information policy page and link it.
5. Optional: add one client-confirmed, anonymised example. Split the three longest sentences. Fix the "symptôme" repetition at line 26.

zero P0 issues found

Nonce: 8575809454fa0c074fcc411b408e13cb
BLOCKING: false (cleared all gates; 92/100 overall, no P0)
