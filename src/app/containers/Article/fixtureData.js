import { blockContainingText, singleTextBlock } from '../../models/blocks';

const articleDataBuilder = (
  id,
  passportLanguage,
  home,
  headlineText,
  paragraphText,
  seoHeadline,
  promoHeadline,
  summary,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    type: 'article',
    createdBy: '',
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514811600000,
    passport: {
      language: passportLanguage,
      home,
      category: 'news',
      genre: null,
    },
    tags: {},
  },
  content: {
    model: {
      blocks: [
        blockContainingText('headline', headlineText),
        singleTextBlock(paragraphText),
      ],
    },
  },
  promo: {
    id: `urn:bbc:ares::article:${id}`,
    headlines: {
      seoHeadline,
      promoHeadline,
    },
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    summary,
    timestamp: 1514811600000,
  },
});

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  'Article Headline',
  'A paragraph.',
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
);

export const articleDataPersian = articleDataBuilder(
  'cwv2xv848j5o',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  'سرصفحه مقاله',
  'یک پاراگراف.',
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
);
