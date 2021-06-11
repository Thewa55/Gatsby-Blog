import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from 'styled-components'
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue
`

export default ({ data }) => {

  console.log(data)

return(
<Layout>
  <Seo title="Home" />
  <div>
    <h1>My blog page</h1>
    <h4>{data.allMarkdownRemark.totalCount}</h4>
    {
      data.allMarkdownRemark.edges.map(({node})=> (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p><strong>{node.frontmatter.desc}</strong></p>
          <p>{node.excerpt}</p>
        </div>))
    }
  </div>
</Layout>
)}

//the sort will sort the field specifiec and by what order.
export const query = graphql`
query MyQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date],order: DESC}) {
    edges {
      node {
        id
        fields{
          slug
        }
        frontmatter {
          date
          title
          desc
        }
        excerpt
      }
    }
    totalCount
  }
}
`