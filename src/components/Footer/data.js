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
          isExternal: true,
          badge: 'New!',
          badgeColor: 'success'
        },
        {
          href: 'https://community.neptunemutual.com/',
          text: 'Community Forums',
          isExternal: true
        },
        {
          href: `${npmURL}/blog/`,
          text: 'Blog',
          isExternal: true
        },
        {
          href: `${npmURL}/pressroom/`,
          text: 'Press Room',
          isExternal: true
        },
        {
          href: `${npmURL}/ecosystem/`,
          text: 'Ecosystem',
          isExternal: true
        },
        {
          href: `${npmURL}/docs/`,
          text: 'Documentation',
          isExternal: true
        },
        {
          href: `${npmURL}/web3-tools/`,
          text: 'Web3 Tools',
          isExternal: true
        },
        {
          href: '/',
          text: 'NFT Portal',
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
          isExternal: true
        },
        {
          href: `${npmURL}/grants-and-bounties/`,
          text: 'Grants and Bounties',
          isExternal: true
        },
        {
          href: `${npmURL}/careers/`,
          text: 'Careers',
          isExternal: true,
          badge: "We're Hiring!"
        },
        {
          href: `${npmURL}/security/`,
          text: 'Security',
          isExternal: true
        },
        {
          href: `${npmURL}/contact/`,
          text: 'Contact',
          isExternal: true
        }
      ]
    },
    {
      title: 'Policies',
      links: [
        {
          href: `${npmURL}/policies/risk-factors/`,
          text: 'Risk Factors',
          isExternal: true
        },
        {
          href: `${npmURL}/policies/terms-of-use/`,
          text: 'Terms of Use',
          isExternal: true
        },
        {
          href: `${npmURL}/policies/privacy-policy/`,
          text: 'Privacy Policy',
          isExternal: true
        },
        {
          href: `${npmURL}/policies/standard-terms-and-conditions/`,
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
