/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata : {
    title: 'The New Site'
  },
  plugins: [ {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: `2ecehfn5iq5j`,
      // Learn about environment variables: https://gatsby.dev/env-vars
      accessToken: 'N9ytIjNy1-IDZMD7_L6CJB4o56JhKQV8npkPMgC1ysE',
    },
  },
  `gatsby-transformer-sharp`, 
  `gatsby-plugin-sharp`
  ],
}
