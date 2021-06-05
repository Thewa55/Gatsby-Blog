/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
//This file allows us to hook up to the node build process
//we are creating a slug. A slug is essentially just a navigation path inside the app that allows us to route to it 
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
//the arguments are the actual nodes, such as images, markdowns in this app. getNode is the method to grab the nodes. Actions are a list of built in methods in Gatsby
exports.onCreateNode = ({node, getNode, actions}) => {
    //this is to build a path dynamically. 
    const { createNodeField } = actions
    //on start up on app we can see the types of files that are being built up
    console.log(node.internal.type)
    if(node.internal.type === `MarkdownRemark`){
        //creating the route here
        const slug = createFilePath({ node, getNode })

        //this creates a new field in graphQl, where the name is slug and the value is based off the node and getNode
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

//This will create a page on load, we are passing graphql and actions into it
exports.createPages = ({ graphql, actions }) => {
    //we are grabbing createpage from actions
    const { createPage } = actions
    //we dont have ES6 access in node so we need paranthesis instead of just graphql``
    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then( res => {
        res.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/template/blog-post.js`),
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}