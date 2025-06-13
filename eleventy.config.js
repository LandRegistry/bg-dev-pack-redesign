import { govukEleventyPlugin } from '@x-govuk/govuk-eleventy-plugin'

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'images': 'assets/images'
  })

  eleventyConfig.addPlugin(govukEleventyPlugin, {
    icons: {
      mask: "hmlrassets/images/mask-icon.svg",
      shortcut: "hmlrassets/images/favicon.ico",
      touch: "hmlrassets/images/apple-touch-icon.png"
    },
    opengraphImageUrl: "hmlrassets/images/hmlr-opengraph-image.png",
    themeColor: '#789904',
    // rebrand: true,
    stylesheets: ['/assets/styles.css'],
    titleSuffix: "HM Land Registry Developer Pack",
    header: {
      logotype: {
        text: " HM Land Registry "
      },
      productName: "- Developer Pack"
    },
    // serviceNavigation: {
    //   serviceName: "Business Gateway",
    //   serviceUrl: "#",
    //   navigation: [
    //     {
    //       href: "#",
    //       text: "Navigation item 1",
    //     },
    //     {
    //       href: "#",
    //       text: "Navigation item 2",
    //       active: true,
    //     },
    //     {
    //       href: "#",
    //       text: "Navigation item 3",
    //     },
    //   ],
    // },
    footer: {
      logo: false,
      // copyright: {
      //     text: "&copy; HM Land Registry"
      // }
    }
  })

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      // The folder where all your content will live:
      input: 'app',
      includes: '../_includes',
      data: '../_data',
      output: '_site'
    }
  }
};