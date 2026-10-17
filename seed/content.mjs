// Contenu repris à l'identique de https://www.aude-naturo.fr (octobre 2026)
import { readFileSync } from "node:fs";
import { htmlToPt, key } from "./lib/html-to-pt.mjs";

const html = (s) => htmlToPt(s);
const htmlFile = (name) => htmlToPt(readFileSync(new URL(`./html/${name}`, import.meta.url), "utf8"));

export const PAGE_IDS = {
  home: "page-accueil",
  quiSuisJe: "page-qui-suis-je",
  naturopathie: "page-naturopathie",
  prestations: "page-prestations",
  tarifs: "page-tarifs",
  contact: "page-contact",
  mentions: "page-mentions-legales",
  politique: "page-politique-de-confidentialite",
};

/**
 * @param {{ img: (file: string) => object, file: (file: string) => object }} assets
 */
export function buildDocuments({ img, file }) {
  const fig = (name, alt = "", shape = "rect") => ({ _type: "figure", image: img(name), alt, shape });
  const k = (o) => ({ _key: key(), ...o });
  const internal = (id) => ({ _type: "link", type: "internal", internal: { _type: "reference", _ref: id } });
  const external = (href, openInNewTab = false) => ({ _type: "link", type: "external", href, openInNewTab });
  const btn = (label, link, variant = "outline") => ({ _type: "button", label, link, variant });
  const contactBtn = (label = "Me contacter", variant = "outline") => btn(label, internal(PAGE_IDS.contact), variant);
  const section = (type, fields) => ({ _type: type, _key: key(), ...fields });
  const page = (id, title, slug, seo, sections) => ({
    _id: id,
    _type: "page",
    title,
    slug: { _type: "slug", current: slug },
    seo: { _type: "seo", ...seo },
    sections,
  });
  const ogDefault = img("og-bivouac-cirque-du-morgon.jpg");

  // ---------- Accueil ----------
  const home = page(
    PAGE_IDS.home,
    "Accueil",
    "accueil",
    {
      metaTitle: "Naturopathie & Bien-être | Aude Naturo | Embrun",
      metaDescription:
        "Aude Naturo propose des consultations en naturopathie pour améliorer votre bien-être. Contactez-nous pour un accompagnement personnalisé.",
      ogImage: img("Logo-aude-escoffier-naturo.png"),
    },
    [
      section("heroSection", {
        title: "Il est grand temps\nde prendre soin de vous !",
        image: fig("aude-escoffier-naturo.png", "Fleurs et plantes médicinales dans un mortier"),
        titleColor: "white",
        titleSize: "xxl",
      }),
      section("textImageSection", {
        sectionTitle: "Qui suis-je ?",
        body: html(
          "<p>Je suis Aude Escoffier, conseillère en Naturopathie et avant tout éducatrice de santé.</p><p><br></p><p>Je suis installée à Embrun, dans les Hautes-Alpes, au cœur des montagnes. <br><br>Mon objectif : vous aidez à retrouver une vitalité pour un état de bien-être pérenne !<br></p>",
        ),
        buttons: [k(btn("Aude Escoffier Naturopathe", internal(PAGE_IDS.quiSuisJe)))],
        image: fig("aude-escoffier.png", "aude escoffier", "oval"),
        imagePosition: "right",
        justify: true,
        centerButtons: true,
        background: "beige",
        textTone: "dark",
        titleColor: "purple",
        titleSize: "md",
        titleLevel: "h2",
      }),
      section("textBandSection", {
        body: html(
          "<p>J’accompagne femmes, hommes et enfants de tout âge, pour tout type de problématique : bien-être digestif, sommeil, gestion du stress, état dépressif, douleurs articulaires, accompagnement de pathologies, problèmes de peau, déséquilibres hormonaux…</p><p><br></p><p>Êtes-vous prêt(e) à prendre soin de vous et à améliorer considérablement votre énergie et votre bien-être ?<br></p>",
        ),
        align: "left",
        spacing: "normal",
        background: "green",
        textTone: "light",
      }),
      section("featureCardsSection", {
        title: "Pourquoi venir me consulter ?",
        cardStyle: "green",
        background: "beige",
        titleColor: "purple",
        cards: [
          k({
            _type: "featureCard",
            icon: fig("accompagnement.png", ""),
            title: "Accompagnement",
            body: html(
              "<ul><li>Retrouver une santé physique</li><li>Retrouver une santé morale</li><li>Problèmes de peau</li><li>Désir d'enfant&nbsp;</li><li>Grossesse</li><li>Troubles du sommeil</li><li>Dérèglements hormonaux</li></ul>",
            ),
          }),
          k({
            _type: "featureCard",
            icon: fig("alimentation-1.png", ""),
            title: "Alimentation",
            body: html(
              "<ul><li>Réglage alimentaire individualisé</li><li>Problèmes digestifs et/ou intestinaux</li><li>Ballonnements</li><li>Alimentation de l'enfant</li><li>&nbsp;Surpoids</li></ul>",
            ),
          }),
          k({
            _type: "featureCard",
            icon: fig("stress-1.png", ""),
            title: "Gestion du stress",
            body: html(
              "<ul><li>Relaxation</li><li>Fatigue chronique</li><li>Burn out</li><li>Périodes d’examen</li><li>Techniques de respiration</li></ul>",
            ),
          }),
        ],
      }),
      section("imageRowSection", {
        images: [
          k(fig("naturo-preparation-05--282-29.png", "NATURO ALPES")),
          k(fig("naturo-preparation-05--283-29.png", "NATURO ALPES")),
          k(fig("naturo-preparation-05--281-29.png", "NATURO ALPES")),
        ],
        aspect: "square",
        fit: "contain",
        background: "beige",
      }),
      section("textImageSection", {
        title: "Découvrez\nMes Ateliers Naturo pour Tous !",
        body: html(
          "<p>Ce sont des temps pour prendre soin de soi.  </p><p><br></p><p>Des ateliers ludiques et participatifs pour sensibiliser et transmettre les clés de la naturopathie au sein d’un petit groupe de tout âge.</p>",
        ),
        buttons: [k(contactBtn())],
        image: fig("photos-ateliers-les-orres-05.png", "atelier-naturo", "rounded"),
        imagePosition: "right",
        narrow: true,
        justify: true,
        background: "beige",
        textTone: "dark",
        titleColor: "purple",
        titleSize: "sm",
        titleLevel: "h2",
      }),
      section("collageSection", {
        images: [
          k(fig("FLEURS.png", "Fleurs")),
          k(fig("photos-alimentation.png", "Photo alimentation")),
          k(fig("photos-energy-balls.png", "Energy balls")),
        ],
        title: "Des thématiques possibles",
        titleAlign: "center",
        body: html(
          "<p><g><strong>Adultes</strong></g></p><p><strong><br></strong></p> <ul><li><strong>Atelier Cuisine-Santé</strong>  : « Brunch-Naturo » « Jus de légumes » « Snack healthy »</li><li><strong>Atelier Remède médicinal</strong>  : baume aux plantes, roll’on aux huiles, fabrication de macérats huileux....</li><li><strong>Atelier Sa trousse naturelle</strong>  pour enfants, adultes, femmes enceintes, pour toute la famille....</li><li><strong>Atelier Thématique</strong>  : Immunité, Gestion du stress, Sommeil</li></ul> <p>&nbsp;</p><p><g><strong>Enfants</strong></g></p><p><strong><br></strong></p> <ul><li><strong>Atelier Sommeil</strong>  : création d’un spray anti-cauchemar</li><li><strong>Atelier Sucre</strong>  avec un goûter sain à la clé</li><li><strong>Atelier Cueillette et transformation de plantes médicinales</strong></li><li><strong>Atelier Remèdes médicinaux</strong>  : baumes, macérats, roll’on</li></ul> <p>&nbsp;</p><p><em><strong>Il existe d’autres ateliers suivant les envies.</strong></em></p>",
        ),
        buttons: [
          k(btn("Télécharger ma brochure", { _type: "link", type: "file", file: file("brochure.pdf"), openInNewTab: true })),
        ],
        background: "beige",
        textTone: "dark",
        titleColor: "purple",
        titleSize: "md",
        titleLevel: "h2",
      }),
    ],
  );

  // ---------- Qui suis-je ? ----------
  const quiSuisJe = page(
    PAGE_IDS.quiSuisJe,
    "Qui suis-je ?",
    "qui-suis-je",
    {
      metaTitle: "Naturopathie | Aude Naturo | Hautes-Alpes",
      metaDescription:
        "Aude Naturo propose des consultations en naturopathie pour optimiser votre santé. Contactez-nous pour améliorer votre bien-être.",
      ogImage: ogDefault,
    },
    [
      section("textImageSection", {
        title: "Aude Escoffier",
        subtitle: "Naturopathe à Embrun",
        body: html(
          "<p>Je m’appelle Aude Escoffier</p><p><br></p><p>Je suis passionnée par la nature humaine et par la capacité de la nature à nous fournir tous les remèdes dont nous avons besoin pour optimiser notre santé !</p><p>Depuis plusieurs années, la naturopathie fait partie de ma vie et j'aime le partager.</p><p><br></p><p>En naturopathie, on vient chercher et accompagner les causes profondes des dysfonctionnements de notre organisme, et c’est ce qui m’a convaincues : apprendre le fonctionnement du corps, réfléchir aux origines des maux et travailler main dans les main avec les personnes que j’accompagne pour augmenter leur niveau de bien-être, leur vitalité et leur permettre de se sentir mieux dans leur corps et dans leur tête !</p><p><br></p><p><br></p><p>Après avoir travailler pendant dix ans en tant que préparatrice en pharmacie hospitalière spécialisée en oncologie, je savais que ma place était au contact de l'humain.</p><p>J’ai décidé de travailler en magasin bio en tant que conseillère en naturopathie et très vite j'ai voulu allée plus loin auprès de l’école Euronature pour valider ma formation en Naturopathie.</p><p><br></p><p>Qu’il s’agisse d’une consultation individuelle ou d’un atelier de groupe, mon métier est avant tout humain. </p><p>Il est façonné par des rencontres, des échanges et des connexions !</p>",
        ),
        image: fig("aude-naturo.png", "Aude Escoffier", "oval"),
        imagePosition: "left",
        imageBleed: true,
        background: "beige",
        textTone: "dark",
        titleColor: "purple",
        titleSize: "xxl",
        titleLevel: "h1",
      }),
      section("partnersSection", {
        title: "Aude Escoffier naturopathe -\nparternariats et références",
        logo: fig("Logo-aude-escoffier-naturo-81b07984.png", "logo aude escoffier naturo Embrun"),
        button: contactBtn(),
        partners: [
          k({
            _type: "partner",
            logo: img("fena.png"),
            name: "Fédération française\nde Naturopathie",
            button: btn("FÉNA →", external("https://lafena.fr/", true)),
          }),
        ],
        background: "cream",
        titleColor: "black",
        titleSize: "lg",
      }),
    ],
  );

  // ---------- Naturopathie ----------
  const naturopathie = page(
    PAGE_IDS.naturopathie,
    "Naturopathie",
    "naturopathie",
    {
      metaTitle: "Naturopathie | Aude Naturo | Hautes Alpes",
      metaDescription:
        "Améliorez votre bien-être avec la naturopathie. Consultations personnalisées pour une approche naturelle et holistique de la santé.",
      ogImage: ogDefault,
    },
    [
      section("mosaicSection", {
        title: "La Naturopathie",
        body: html(
          "<p>La Naturopathie : une approche holistique de la santé au service du bien-être !</p><p><br></p><p>La naturopathie est une approche de santé holistique et complémentaire à la médecine allopathique, qui vient chercher les causes des déséquilibres physiques et émotionnels afin de les soulager durablement pour favoriser un état de bien-être stable et durable dans le temps.</p><p><br></p><p>L’objectif de la naturopathie est de venir renforcer les capacités d’auto guérison de l' organisme grâce à des outils et méthodes naturelles qui augmentent la vitalité et votre bien-être au quotidien.</p><p><br></p><p>La naturopathie prévient, soulage, revitalise et dynamise grâce à un large panel d’outils et de méthodes naturelles.</p>",
        ),
        buttons: [k(btn("Voir les prestations", internal(PAGE_IDS.tarifs)))],
        images: [
          k(fig("alimentation-6307fb47.png", "Image plante et préparations cosmétiques", "leafTR")),
          k(fig("huileessentielle-5bf9a855.png", "Plantes et huiles essentielles", "halfRight")),
          k(fig("28072024-BIVOUAC-ET-RANDO-CIRQUE-DU-MORGON-92.png", "Aude Escoffier en randonnée", "leafDiag")),
          k(fig("15092024-BAUMES-AUDE-ANNIV-TESS-17.png", "Atelier préparation cosmétiques", "oval")),
        ],
        background: "deepPurple",
        textTone: "light",
        titleColor: "white",
        titleSize: "xl",
        titleLevel: "h1",
      }),
      section("iconGridSection", {
        title: "La naturopathie par Aude Escoffier",
        labelStyle: "sans",
        iconSize: "small",
        background: "beige",
        titleColor: "purple",
        items: [
          ["icone-plantes-et-legumes.svg", "Nutrition"],
          ["icone-complements-alimentaires.svg", "Micronutrition"],
          ["icone-plantes.svg", "Phytothérapie"],
          ["icones-huiles-essentielles.svg", "Aromathérapie"],
          ["icones-pipette-huiles.svg", "Gemmothérapie"],
          ["icone-fleurs-de-bach.svg", "Fleurs de Bach"],
          ["icone-stress.svg", "Gestion du stress"],
          ["icone-sport.svg", "Exercices physiques"],
        ].map(([icon, label]) => k({ _type: "iconItem", icon: img(icon), label })),
      }),
      section("imageRowSection", {
        images: [k(fig("photos-fleurs-violettes.png", "naturopathie")), k(fig("photosateliers-sport-.png", "naturo Embrun"))],
        aspect: "landscape",
        fit: "cover",
        background: "beige",
      }),
      section("textBandSection", {
        title: "Rendez-vous pour une consultation en Naturopathie",
        buttons: [k(contactBtn("Me contacter", "solid"))],
        align: "center",
        spacing: "large",
        background: "darkGreen",
        textTone: "light",
        titleColor: "white",
        titleSize: "md",
        titleLevel: "h2",
      }),
    ],
  );

  // ---------- Ateliers naturo (prestations) ----------
  const prestations = page(
    PAGE_IDS.prestations,
    "Ateliers naturo",
    "prestations",
    {
      metaTitle: "Nos prestations | Aude Naturo | Hautes Alpes",
      metaDescription:
        "Profitez de consultations personnalisées & d'ateliers naturo. Apprenez à améliorer votre bien-être avec des conseils sur la nutrition & le stress.",
      ogImage: ogDefault,
    },
    [
      section("textBandSection", {
        title: "Les Ateliers Naturopathie",
        align: "center",
        spacing: "normal",
        background: "beige",
        titleColor: "purple",
        titleSize: "md",
        titleLevel: "h1",
      }),
      section("collageSection", {
        images: [
          k(fig("452942924_371369689325973_5202788016165544952_n.png", "Personnes dans des fauteuils écoutant Aude Escoffier")),
          k(fig("photos-jus-.png", "Atelier huiles essentielles")),
          k(fig("photos-atelier-naturo-aude-05.png", "Enfants tenant des flacons préparés en atelier")),
        ],
        title: "Les Ateliers Naturo\nPour Tous !",
        titleAlign: "left",
        body: html(
          "<p>J'anime des ateliers sous différentes formes avec toujours </p><p>un même objectif : prendre soin de sa santé en s'amusant !&nbsp;</p><p><br></p><p>Les Ateliers Naturo : ce sont des temps pour apprendre</p><p>à prendre soin de soi.</p><p><br></p><p>Des ateliers ludiques et participatifs pour sensibiliser et transmettre les clés de la naturopathie.</p><p><br></p><p>Des ateliers dans la nature, au cabinet ou dans un autre lieu précis au sein de petits groupes d'une dizaine de personnes pour un maximum de convivialité et de partage.</p>",
        ),
        buttons: [k(contactBtn())],
        background: "beige",
        textTone: "dark",
        titleColor: "purple",
        titleSize: "md",
        titleLevel: "h2",
      }),
      section("textBandSection", {
        title: "L'école de la nature",
        body: html(
          "<p>En collectivité, au sein d'un centre social, d'une école, d'une association ou même pour des anniversaires ou des EVJF. </p><p>J'anime aussi des ateliers dans des collectifs ou autres instituts.</p><p><br></p><p>Je suis profondément convaincue que les bonnes habitudes s'installent dans le plaisir, et non par la contrainte. </p><p> J’attache donc un point d’honneur à ce que les ateliers que je propose soient&nbsp; ludiques et créatifs.</p>",
        ),
        align: "center",
        spacing: "normal",
        background: "purple",
        textTone: "light",
        titleColor: "white",
        titleSize: "md",
        titleLevel: "h2",
      }),
      section("iconGridSection", {
        title: "Les Ateliers Naturo",
        labelStyle: "serif",
        iconSize: "large",
        background: "beige",
        titleColor: "purple",
        items: [
          ["icone-diy-produits-et-alimentation.svg", "Ateliers DIY"],
          ["icone-cuisine.svg", "Ateliers culinaires"],
          ["icone-plantes-et-personnes.svg", "Ateliers santé et bien-être"],
          ["icone-idees.svg", "Ateliers créatifs"],
        ].map(([icon, label]) => k({ _type: "iconItem", icon: img(icon), label })),
      }),
      section("featureCardsSection", {
        cardStyle: "white",
        background: "purple",
        titleColor: "purple",
        cards: [
          k({
            _type: "featureCard",
            image: fig("photos-alimentation-d1c1edda.png", "Atelier alimentation"),
            title: "Des thématiques inspirantes",
            body: html(
              "<p>Elles abordent les principaux piliers de la santé, du bien-être : alimentation, gestion du stress et des émotions, sommeil, respiration.<br></p>",
            ),
          }),
          k({
            _type: "featureCard",
            image: fig("15092024-BAUMES-AUDE-ANNIV-TESS-2.png", "Atelier alimentation et cosmetiques"),
            title: "Des formats pour tous les goûts",
            body: html(
              "<p>Atelier dégustation, atelier pratique, atelier culinaire, atelier zéro déchet. </p><p> Tous les formats sont possibles du plus théorique au plus pratique !<br></p>",
            ),
          }),
          k({
            _type: "featureCard",
            image: fig("28072024-BIVOUAC-ET-RANDO-CIRQUE-DU-MORGON-94.png", "Aude Escoffier en randonnée"),
            title: "Respirer pour s'inspirer",
            body: html(
              "<p>Des ateliers pour se relier à son intuition, </p><p> à sa créativité, à son potentiel au plus proche de la nature.<br></p>",
            ),
          }),
        ],
      }),
      section("imageRowSection", {
        images: [
          k(fig("28072024-BIVOUAC-ET-RANDO-CIRQUE-DU-MORGON-92-f415b1c3.png", "atelier naturo")),
          k(fig("photo-fleur-2.png", "atelier naturo pour tous")),
        ],
        aspect: "landscape",
        fit: "cover",
        background: "beige",
      }),
    ],
  );

  // ---------- Tarifs ----------
  const icon = (name, text) => k({ _type: "iconRow", icon: img(name), text });
  const text = (h) => k({ _type: "cardText", body: html(h) });
  const tarifs = page(
    PAGE_IDS.tarifs,
    "Tarifs",
    "tarifs",
    {
      metaTitle: "Tarifs Naturopathie | Aude Naturo | Hautes Alpes",
      metaDescription:
        "Découvrez nos tarifs pour consultations et ateliers en naturopathie. Première consultation 90 min à 65€, suivi 60 min à 50€. Contactez-nous!",
      ogImage: ogDefault,
    },
    [
      section("textBandSection", {
        eyebrow: "Tarifs",
        title: "Prix\nAude Escoffier Naturopathie",
        subtitle: "Accompagnement sur mesure me contacter.",
        align: "center",
        spacing: "large",
        background: "beige",
        textTone: "dark",
        titleColor: "black",
        titleSize: "xl",
        titleLevel: "h1",
      }),
      section("twoCardsSection", {
        cardBackground: "grey",
        background: "beige",
        titleColor: "purple",
        cards: [
          k({
            _type: "detailCard",
            title: "Déroulé d'une consultation",
            boldTitle: true,
            content: [
              text(
                "<p>Ensemble, nous cherchons les causes de vos maux et nous construisons un programme d’hygiène de vie adapté à vos besoins au regard de votre quotidien.</p><p><br></p><p>Je donne des conseils ciblés et individualisés sur :</p><p> </p> <ul><li>La nutrition</li><li>La micro-nutrition</li><li>La gestion du stress</li><li>L'aromathérapie</li><li>La phytothérapie</li><li>La gemmothérapie</li></ul>",
              ),
              k(contactBtn()),
            ],
          }),
          k({
            _type: "detailCard",
            title: "Première consultation",
            boldTitle: true,
            content: [
              k(fig("IMAGE-f894c9e4.png", "Image plantes holistiques")),
              icon("icone-sablier.svg", "1h30"),
              icon("icone-bulles-de-conversation.svg", "un temps d'écoute et d'anamnèse"),
              icon("icone-checklist.svg", "un bilan naturopathique"),
              icon("image-documents.svg", "un programme personnalisé en hygiène de vie établi ensemble adapté aux besoins."),
              icon("icone-euro.svg", "Tarif : 65€"),
            ],
          }),
        ],
      }),
      section("twoCardsSection", {
        title: "Consultation individuelle de suivi Naturopathie",
        cardBackground: "white",
        background: "green",
        titleColor: "white",
        cards: [
          k({
            _type: "detailCard",
            title: "Combien de séances nécessaires pour observer un mieux-être ?",
            boldTitle: false,
            content: [
              text(
                "<p>Chaque personne est unique, chaque consultation de suivi l’est aussi.</p><p><br></p><p>La naturopathie est avant tout une approche préventive.</p><p><br></p><p>S’il s’agit de renforcer votre immunité ou d’être guidé(e) pour mettre en place une hygiène de vie adaptée, une ou deux consultations peuvent suffire pour trouver votre équilibre.</p><p>Si vous avez des symptômes chroniques et que vous souhaitez y remédier pour retrouver toute votre vitalité, </p><p>un accompagnement sur plusieurs mois est recommandé.</p><p><br></p><p>Le corps est une machine formidable qui peut se réguler </p><p>très rapidement lorsque les bonnes pratiques sont </p><p> mises en place !</p>",
              ),
            ],
          }),
          k({
            _type: "detailCard",
            title: "Consultation de suivi",
            boldTitle: false,
            content: [
              k(fig("huileessentielle.png", "Plantes et huiles essentielles")),
              icon("icone-sablier.svg", "1h00"),
              text(
                "<p>Ensemble, nous affinons notre programme pour aller plus loin afin d'atteindre l'objectif de santé pour que votre bien-être soit stable et durable.<br></p>",
              ),
              icon("icone-euro.svg", "Tarif : 55€"),
              k(contactBtn()),
            ],
          }),
        ],
      }),
      section("pricingSection", {
        background: "beige",
        plans: [
          k({
            _type: "plan",
            name: "Première consultation",
            price: "65 €",
            features: ["90 minutes", "Découverte"],
            button: contactBtn("Contactez-moi", "solid"),
            highlighted: false,
          }),
          k({
            _type: "plan",
            badge: "Suivi",
            name: "Consultation de suivi",
            price: "55 €",
            features: ["60 minutes", "Suivi"],
            button: contactBtn("Contactez-moi", "white"),
            highlighted: true,
          }),
          k({
            _type: "plan",
            name: "Atelier pour tous",
            price: "prix sur mesure",
            features: ["Atelier naturopathie", "Évènements"],
            button: contactBtn("Contactez-moi", "solid"),
            highlighted: false,
          }),
        ],
      }),
    ],
  );

  // ---------- Contact ----------
  const contact = page(
    PAGE_IDS.contact,
    "Contact",
    "contact",
    {
      metaTitle: "Contact Naturopathe | Aude Naturo | Embrun",
      metaDescription:
        "Contactez Aude Naturo pour des ateliers & consultations en naturopathie. Discutons de vos projets et collaborations!",
      ogImage: ogDefault,
    },
    [
      section("contactSection", {
        title: "Contact",
        subtitle: "Aude Escoffier Naturopathe à Embrun dans les Hautes-Alpes",
        nameLabel: "Nom",
        phoneLabel: "Numéro de téléphone",
        messageLabel: "Votre demande",
        submitLabel: "Envoyer",
        successMessage: "Merci de nous avoir contactés. Nous reviendrons vers vous dès que possible.",
        errorMessage: "Oups ! Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        infoBody: html(
          "<p>Vous avez un projet, une suggestion de collaboration, une demande inédite ?</p><p>Surtout, contactez-moi.</p><p>Je serai heureuse d’en discuter, je suis ouverte aux nouveautés !<br></p>",
        ),
        infoPhoneTitle: "Téléphone",
        infoPhone: "06 76 38 74 45",
        infoEmailTitle: "E-mail",
        infoEmailText: "aude.escoffier@gmail.com",
        infoEmailHref: "contact@aude-naturo.fr",
        background: "beige",
      }),
      section("locationSection", {
        title: "Retrouvez-moi dans mon cabinet à Tera Naam à Embrun",
        subtitle: "Centre de yoga et espace thérapeutique",
        items: [
          k({ _type: "infoItem", icon: img("adresse.svg"), title: "Tera Naam", text: "15 rue des Meuniers\n05200 Embrun" }),
          k({
            _type: "infoItem",
            icon: img("tel.svg"),
            title: "Contactez-moi pour un rendez-vous\nà mon cabinet\nà Tera Naam",
            text: "06 76 38 74 45",
          }),
          k({ _type: "infoItem", icon: img("horaires.svg"), title: "Horaires", text: "Uniquement sur rendez-vous" }),
        ],
        image: fig("tera-naam.png", "Logo Tera Naam"),
        background: "beige",
      }),
      section("imageRowSection", {
        images: [
          k(fig("aude-intervention-naturo-05.png", "intervention naturo")),
          k(fig("atlier-naturo-cabinet-aude-05.png", "cabinet naturo aude escoffier")),
        ],
        aspect: "landscape",
        fit: "cover",
        background: "beige",
      }),
      section("mapSection", {
        address: "101 Impasse Du Serre, 05200 Puy-Sanières, France",
        lat: 44.557555,
        lng: 6.446203,
        zoom: 12,
      }),
    ],
  );

  // ---------- Pages légales ----------
  const mentions = page(
    PAGE_IDS.mentions,
    "Mentions légales",
    "mentions-légales",
    {
      metaTitle: "Mentions légales | Aude Naturo | Puy-Sanières",
      metaDescription:
        "Consultez les mentions légales d'Aude Naturo. Informations sur la propriété intellectuelle, la protection des données & plus.",
      ogImage: ogDefault,
    },
    [section("richTextSection", { body: htmlFile("mentions-legales.html"), background: "beige", textTone: "muted" })],
  );

  const politique = page(
    PAGE_IDS.politique,
    "Politique de confidentialité et cookies",
    "politique-de-confidentialite-et-de-cookies",
    { metaTitle: "Aude Escoffier naturopathe Embrun Hautes-Alpes", ogImage: ogDefault },
    [section("richTextSection", { body: htmlFile("politique.html"), background: "beige", textTone: "muted" })],
  );

  // ---------- Réglages ----------
  const nav = (label, id) => k({ _type: "navItem", label, link: internal(id) });
  const settings = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Aude Naturo",
    siteUrl: "https://www.aude-naturo.fr",
    homePage: { _type: "reference", _ref: PAGE_IDS.home },
    logo: img("Logo-aude-escoffier-naturo.png"),
    logoAlt: "logo aude escoffier naturopathe",
    phone: "06 76 38 74 45",
    email: "contact@aude-naturo.fr",
    facebookUrl: "https://www.facebook.com/aude.escoffier.5/",
    defaultOgImage: ogDefault,
    mainNav: [
      nav("Accueil", PAGE_IDS.home),
      nav("Qui suis-je ?", PAGE_IDS.quiSuisJe),
      nav("Naturopathie", PAGE_IDS.naturopathie),
      nav("Ateliers naturo", PAGE_IDS.prestations),
      nav("Tarifs", PAGE_IDS.tarifs),
      nav("Contact", PAGE_IDS.contact),
    ],
    legalNav: [nav("Mentions légales", PAGE_IDS.mentions), nav("Politique de confidentialite et cookies", PAGE_IDS.politique)],
    drawerTitle: "NOUS CONTACTER",
    footerBanner: img("BANDEAU-BAS-DE-PAGE-naturo-f1ded2b0.png"),
  };

  return [home, quiSuisJe, naturopathie, prestations, tarifs, contact, mentions, politique, settings];
}
