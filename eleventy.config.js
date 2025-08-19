import process from 'node:process'

import { govukEleventyPlugin } from '@x-govuk/govuk-eleventy-plugin'

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'node_modules/@hmlr/frontend/hmlr/assets': 'hmlrassets',
    'app/assets': 'assets',
    'node_modules/@govuk-prototype-kit/step-by-step/javascripts': 'assets/js'
  })

  eleventyConfig.addPlugin(govukEleventyPlugin, {
    icons: {
      mask: "/hmlrassets/images/mask-icon.svg",
      shortcut: "/hmlrassets/images/favicon.ico",
      touch: "/hmlrassets/images/apple-touch-icon.png"
    },
    showBreadcrumbs: false,
    opengraphImageUrl: "/hmlrassets/images/hmlr-opengraph-image.png",
    themeColor: '#789904',
    // rebrand: true,
    stylesheets: ['/assets/application.css'],
    titleSuffix: "HM Land Registry Developer Pack",
    header: {
      logotype: {text: "HM Land Registry Developer Pack"},
      productType: "",
      search: {
        label: "Search developer pack",
        indexPath: "/search.json",
        sitemapPath: "/sitemap"
      }
    },
    serviceNavigation: true,
    footer: {
      logo: false,
      // copyright: {
      //     text: "&copy; HM Land Registry"
      // }
    }
  })

  eleventyConfig.addCollection('Explore APIs', collection => 
    collection.getFilteredByGlob([
      '/api/*.md'
    ]).sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  )

  eleventyConfig.addCollection('Support', collection => 
    collection.getFilteredByGlob([
      '/support/*.md'
    ]).sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  )

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      // The folder where all your content will live:
      input: 'app',
      includes: '_includes',
      output: '_site'
    },
    nunjucksEnvironmentOptions: {
      paths: [
        "./_includes",
        "../node_modules/@hmlr/frontend",
        "node_modules/govuk-frontend/dist",
        "node_modules/govuk-frontend/dist/govuk",
        "node_modules/govuk-frontend/dist/govuk/components"
      ],
    },
    pathPrefix: process.env.GITHUB_ACTIONS ? '/bg-dev-pack-redesign/' : '/',
  }
};