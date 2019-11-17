import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FiLinkedin, FiMail, FiTwitter, FiFacebook } from 'react-icons/fi';

import { mediaMax } from '@divyanshu013/media';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
				childImageSharp {
					fixed(width: 64, height: 64) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author
					longDescription
					social {
						linkedin
						email
						twitter
						facebook
					}
				}
			}
		}
	`);

	const { author, social, longDescription } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { color, secondary } = getTheme(theme);
	return (
		<div
			css={{
				display: `grid`,
				gridTemplateColumns: 'auto auto',
				alignItems: 'start',
				a: {
					borderBottomColor: color,
					'&:hover, &:focus': {
						borderBottomStyle: 'solid',
						borderBottomColor: color,
					},
				},
				[mediaMax.small]: {
					gridTemplateColumns: 'auto',
				},
			}}
		>
			<Image
				fixed={data.avatar.childImageSharp.fixed}
				alt={author}
				css={{
					marginTop: 8,
					marginRight: rhythm(1),
					borderRadius: `100%`,
					opacity: 0.87,
					[mediaMax.small]: {
						marginBottom: 8,
					},
				}}
				imgStyle={{
					borderRadius: `50%`,
				}}
			/>
			<div css={{ fontSize: 16, color: secondary }}>
				<p>
					{longDescription}
				</p>
				<p>
					If you'd like to chat, drop me a line:					
				</p>
				<p>
					<a href={social.linkedin}><FiLinkedin /></a> &nbsp; &nbsp;
					<a href={social.email}><FiMail /></a> &nbsp; &nbsp;
					<a href={social.twitter}><FiTwitter /></a> &nbsp; &nbsp;
					<a href={social.facebook}><FiFacebook /></a> &nbsp; &nbsp;
				</p>
			</div>
		</div>
	);
};

export default Bio;
