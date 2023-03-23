const socials = [
  {
    icon: 'twitter',
    text: 'twitter',
    href: 'https://twitter.com/neptunemutual',
    isExternal: true
  },
  {
    icon: 'reddit',
    text: 'reddit',
    href: 'https://www.reddit.com/r/NeptuneMutual/',
    isExternal: true
  },
  {
    icon: 'telegram',
    text: 'telegram',
    href: 'https://t.me/neptunemutual',
    isExternal: true
  },
  {
    icon: 'github',
    text: 'github',
    href: 'https://github.com/neptune-mutual-blue',
    isExternal: true
  },
  {
    icon: 'linkedin',
    text: 'linkedin',
    href: 'https://www.linkedin.com/company/neptune-mutual',
    isExternal: true
  },
  {
    icon: 'youtube',
    text: 'youtube',
    href: 'https://www.youtube.com/c/NeptuneMutual',
    isExternal: true
  },
  {
    icon: 'discord',
    text: 'discord',
    href: 'https://discord.com/invite/2qMGTtJtnW',
    isExternal: true
  }
]

const getFooterData = () => {
  const lists = [
    {
      title: 'Resources',
      links: [
        {
          href: '/marketplace',
          text: 'Marketplace',
          isExternal: true,
          badge: 'New!',
          badgeColor: 'success'
        },
        { href: '/blog/', text: 'Blog', isExternal: true },
        { href: '/pressroom/', text: 'Press Room', isExternal: true },
        { href: '/ecosystem/', text: 'Ecosystem', isExternal: true },
        { href: '/docs/', text: 'Documentation', isExternal: true },
        { href: '/web3-tools/', text: 'Web3 Tools', isExternal: true },
        {
          href: '/hack-database/',
          text: 'Blockchain Hack Database',
          isExternal: true
        }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about/', text: 'About us', isExternal: true },
        {
          href: '/grants-and-bounties/',
          text: 'Grants and Bounties',
          isExternal: true
        },
        {
          href: '/careers/',
          text: 'Careers',
          isExternal: true,
          badge: "We're Hiring!"
        },
        { href: '/security/', text: 'Security', isExternal: true },
        { href: '/contact/', text: 'Contact', isExternal: true }
      ]
    },
    {
      title: 'Policies',
      links: [
        {
          href: '/policies/risk-factors/',
          text: 'Risk Factors',
          isExternal: true
        },
        {
          href: '/policies/terms-of-use/',
          text: 'Terms of Use',
          isExternal: true
        },
        {
          href: '/policies/privacy-policy/',
          text: 'Privacy Policy',
          isExternal: true
        },
        {
          href: '/policies/standard-terms-and-conditions/',
          text: 'Standard Terms and Conditions',
          isExternal: true
        }
      ]
    }
  ]

  return {
    lists,
    socials
  }
}

export { getFooterData }
