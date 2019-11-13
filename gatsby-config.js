module.exports = {
	siteMetadata: {
		bio: 'Software Engineer @ Amazon',
		title: `Abhishek Dey Das`,
		author: `Abhishek Dey Das`,
		description: `Personal blog of Abhishek Dey Das`,
		siteUrl: `https://deydas.com`,
		social: {
			github: 'https://github.com/adeydas',
			instagram: 'https://instagram.com/adeydas',
			stackoverflow: 'https://stackoverflow.com/users/1394972/abhishek-dey-das',
			linkedin: 'https://www.linkedin.com/in/adeydas/',
		},
	},
	plugins: [
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Abhishek's blog`,
				short_name: `Abhishek`,
				start_url: `/`,
				background_color: `#000000`,
				theme_color: `#fa8072`,
				display: `minimal-ui`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `salmon`,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
	],
};
