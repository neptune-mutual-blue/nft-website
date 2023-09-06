import { AppConstants } from '@/constants/AppConstants'

const npmURL = AppConstants.neptunemutualOrigin

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
          href: `${npmURL}/marketplace`,
          text: 'Marketplace',
          isExternal: false,
          badge: 'New!',
          badgeColor: 'success'
        },
        {
          href: 'https://community.neptunemutual.com/',
          text: 'Community Forums',
          isExternal: true
        },
        {
          href: `${npmURL}/ecosystem/`,
          text: 'Ecosystem',
          isExternal: false
        },
        {
          href: `${npmURL}/docs/`,
          text: 'Documentation',
          isExternal: false
        },
        {
          href: `${npmURL}/web3-tools/`,
          text: 'Web3 Tools',
          isExternal: false
        },
        {
          href: '/',
          text: 'NFT Portal',
          isExternal: false
        },
        {
          href: 'https://explorer.neptunemutual.net',
          text: 'Explorer',
          isExternal: false
        }
      ]
    },
    {
      title: 'Company',
      links: [
        {
          href: `${npmURL}/about/`,
          text: 'About us',
          isExternal: false
        },
        {
          href: `${npmURL}/blog/`,
          text: 'Blog',
          isExternal: false
        },
        {
          href: `${npmURL}/pressroom/`,
          text: 'Press Room',
          isExternal: false
        },
        {
          href: `${npmURL}/grants-and-bounties/`,
          text: 'Grants and Bounties',
          isExternal: false
        },
        {
          href: `${npmURL}/careers/`,
          text: 'Careers',
          isExternal: false,
          badge: "We're Hiring!"
        },
        {
          href: `${npmURL}/security/`,
          text: 'Security',
          isExternal: false
        },
        {
          href: `${npmURL}/contact/`,
          text: 'Contact',
          isExternal: false
        }
      ]
    },
    {
      title: 'Policies',
      links: [
        {
          href: `${npmURL}/policies/risk-factors/`,
          text: 'Risk Factors',
          isExternal: false
        },
        {
          href: `${npmURL}/policies/terms-of-use/`,
          text: 'Terms of Use',
          isExternal: false
        },
        {
          href: `${npmURL}/policies/privacy-policy/`,
          text: 'Privacy Policy',
          isExternal: false
        },
        {
          href: `${npmURL}/policies/standard-terms-and-conditions/`,
          text: 'Standard Terms and Conditions',
          isExternal: false
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
