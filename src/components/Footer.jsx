import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const FOOTER_QUERY = graphql `
{
    site {
        siteMetadata {
            footer
        }
    }
}
`;

const Footer = () => {
    const data = useStaticQuery(FOOTER_QUERY);
    const { footer } = data.site.siteMetadata;
    return (
        <div>
            <footer css={{
                fontSize: `12px`
			}}>{footer}</footer>
        </div>
    );
}

export default Footer;
