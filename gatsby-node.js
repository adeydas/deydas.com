const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve(`./src/templates/BlogPost.jsx`);
	const tagTemplate = path.resolve(`./src/templates/Tags.jsx`);
	return graphql(
		`
		{
			postsRemark: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 2000) {
			  edges {
				node {
				  fields {
					slug
				  }
				  frontmatter {
					tags
				  }
				}
			  }
			}
			tagsGroup: allMarkdownRemark(limit: 2000) {
			  group(field: frontmatter___tags) {
				fieldValue
			  }
			}
		  }		  
		`,
	).then(result => {
		if (result.errors) {
			throw result.errors;
		}

		// Create blog posts pages.
		const posts = result.data.postsRemark.edges;

		posts.forEach((post, index) => {
			const previous = index === posts.length - 1 ? null : posts[index + 1].node;
			const next = index === 0 ? null : posts[index - 1].node;

			createPage({
				path: post.node.fields.slug,
				component: blogPost,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
				},
			});
		});

		// Create tag page
		const tags = result.data.tagsGroup.group;

		// Make tag pages
		tags.forEach(tag => {
			createPage({
			  path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
			  component: tagTemplate,
			  context: {
				tag: tag.fieldValue,
			  },
			})
		  })

		return null;
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const relativePath = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value: `/blog${relativePath}`,
		});
	}
};
