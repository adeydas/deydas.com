import React from "react"
import PropTypes from "prop-types"
import { mediaMax } from '@divyanshu013/media';

import ThemeProvider from '../components/ThemeProvider';
import ThemeContext from '../components/ThemeContext';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { rhythm } from '../utils/typography';

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  const siteTitle = data.site.siteMetadata.title;

  return (
    <ThemeProvider>
    <section css={{ height: '100%', minHeight: '100vh' }}>
        <ThemeContext.Consumer>
            {({ theme }) => (
                <Layout location={location} title={siteTitle}>
                    <Seo
                        title={tagHeader}
                        description={tagHeader}
                    />
                    <h1
                        style={{
                            marginTop: rhythm(1 / 4),
                            marginBottom: rhythm(1),
                        }}
                    >
                        {tagHeader}
                    </h1>
                    <ul>
                        {edges.map(({ node }) => {
                        const { slug } = node.fields
                        const { title } = node.frontmatter
                        return (
                            <li key={slug}>
                            <Link to={slug}>{title}</Link>
                            </li>
                        )
                        })}
                    </ul>
                </Layout>
            )}
        </ThemeContext.Consumer>
        </section>
        <section css={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignContent: 'start',
                height: '100%',
                minHeight: '1vh',
                maxWidth: 1200,
                margin: '0 auto',
                [mediaMax.large]: {
                    gridTemplateColumns: 'auto',
                    justifyItems: 'center',
                },
            }}><Footer /></section> 
    </ThemeProvider>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
    siteMetadata {
        title
        author
        siteUrl
    }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`