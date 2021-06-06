import * as React from "react"
import { graphql, Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default ({ data }) => {

  console.log(data)

return(
<Layout>
  <Seo title="Home" />
  <div>
    <h1>Kenny's Gatsby</h1>
    <h4>{data.allMarkdownRemark.totalCount}</h4>
    {
      data.allMarkdownRemark.edges.map(({node})=> (
        <div key={node.id}>
          <span>{node.frontmatter.title} - {node.frontmatter.date}</span>
          <p>{node.excerpt}</p>
        </div>))
    }
  </div>
</Layout>
)}

export const query = graphql`
query MyQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date],order: DES}) {
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        excerpt
      }
    }
    totalCount
  }
}
`