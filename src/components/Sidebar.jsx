import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaStackOverflow } from 'react-icons/fa';
import { mediaMax } from '@divyanshu013/media';
import kebabCase from "lodash/kebabCase"

import Button from './Button';
import TagButton from './TagButton';
import MenuButton from './MenuButton';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 128, height: 128) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
				bio
				social {
					github
					instagram
					stackoverflow
					linkedin
				}
			}
		}
		allMarkdownRemark(limit: 2000) {
			group(field: frontmatter___tags) {
			  fieldValue
			  totalCount
			}
		}
	}
`;

const Sidebar = () => {
	const data = useStaticQuery(SIDEBAR_QUERY);
	const tags = data.allMarkdownRemark.group;
	const { avatar } = data;
	const { author, bio, social } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	const borderStartingColor = theme === 'light' ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.1)';
	return (
		<nav
			css={{
				borderRight: '1px solid',
				margin: '24px 0',
				padding: '16px 64px',
				alignSelf: 'start',
				borderImage: `linear-gradient(to bottom, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
				[mediaMax.large]: {
					borderBottom: '1px solid',
					borderImage: `linear-gradient(to right, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
					borderImageSlice: 1,
					padding: `16px 0 ${rhythm(2)} 0`,
					margin: '24px 32px',
				},
			}}
		>
			<div
				css={{
					[mediaMax.small]: {
						display: 'grid',
						gridTemplateColumns: 'auto auto',
						gridGap: 16,
						alignItems: 'center',
						justifyContent: 'start',
					},
				}}
			>
				<Image
					alt={author}
					fixed={avatar.childImageSharp.fixed}
					imgStyle={{ borderRadius: '50%' }}
					css={{
						marginBottom: rhythm(0.8),
						opacity: 0.87,
						[mediaMax.small]: {
							width: '64px !important',
							height: '64px !important',
							order: 1,
						},
					}}
				/>
				<h3>{author}</h3>
			</div>
			<p className="muted" css={{ color: muted }}>
				{bio}
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>
				<Button
					aria-label="Link to my LinkedIn profile"
					as="a"
					circular
					href={social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiLinkedin />
				</Button>
				<Button
					aria-label="Link to my GitHub"
					as="a"
					circular
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiGithub />
				</Button>
				<Button
					aria-label="Link to my Stackoverflow"
					as="a"
					circular
					href={social.stackoverflow}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaStackOverflow />
				</Button>
				<Button
					aria-label="Link to my Instagram"
					as="a"
					circular
					href={social.instagram}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiInstagram />
				</Button>
			</div>
			<p css={{
				marginTop: '16px'
			}}>
				<h2>Tags</h2>
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>	
				{tags.map(tag => (
				<TagButton
					aria-label="{tag.fieldValue} ({tag.totalCount})"
					as="a"
					circular
					href={`/tags/${kebabCase(tag.fieldValue)}/`}
					target=""
					rel="noopener noreferrer"
				>
					{tag.fieldValue} ({tag.totalCount})
				</TagButton>
				))}
			</div>
			<p css={{
				marginTop: '16px'
			}}>
				<h2>Side links</h2>
			</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>	
				<MenuButton
					aria-label="blog-source-code"
					as="a"
					circular
					href={`https://github.com/adeydas/deydas.com`}
					target=""
					rel="noopener noreferrer"
				>
					Blog source code
				</MenuButton>
				<MenuButton
					aria-label="blog-infra-code"
					as="a"
					circular
					href={`https://github.com/adeydas/deydas.com-Infrastructure`}
					target=""
					rel="noopener noreferrer"
				>
					Blog infrastructure code
				</MenuButton>
			</div>
		</nav>
	);
};

export default Sidebar;
