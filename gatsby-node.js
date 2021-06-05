/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

//we are creating a slug. A slug is essentially just a navigation path inside the app that allows us to route to it 
const { createFilePath } = require(`gatsby-source-filesystem`)

//the arguments are the actual nodes, such as images, markdowns like this app. getNode is the method to grab the nodes. Actions are a list of built in action in Gatsby
exports.onCreateNode = ({node, getNode, actions}) => {
    //this is to build a path dynamically. 
    const { createNodeField } = actions
    //on start up on app we can see the types of files that are being built up
    console.log(node.internal.type)
    if(node.internal.type === `MarkdownRemark`){
        //creating the route here
        const slug = createFilePath({ node, getNode })
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}