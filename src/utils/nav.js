import { AppConstants } from '@/constants/AppConstants'

const npmURL = AppConstants.neptunemutualOrigin

const data = [
  {
    title: 'Blog',
    href: `${npmURL}/blog/`
  },
  {
    title: 'Careers',
    href: `${npmURL}/careers/`
  },
  {
    title: 'About Us',
    href: `${npmURL}/about/`
  },
  {
    title: 'Resources',
    children: [
      {
        type: 'section',
        title: 'Resources',
        links: [
          {
            title: 'Explore Marketplace',
            href: `${npmURL}/marketplace/`,
            text: 'Explore the marketplace, purchase policies, and pool liquidity',
            icon: 'bank',
            isExternal: true
          },
          {
            title: 'Blog ',
            href: `${npmURL}/blog/`,
            text: 'Visit our blog',
            icon: 'edit-03',
            isExternal: true
          },
          {
            title: 'Press Room',
            href: `${npmURL}/pressroom/`,
            text: 'The source for news about Neptune Mutual',
            icon: 'annotation-dots',
            isExternal: true
          },
          {
            title: 'Ecosystem',
            href: `${npmURL}/ecosystem/`,
            text: 'Learn how you can participate in our marketplace',
            icon: 'database-01',
            isExternal: true
          },
          {
            title: 'Documentation',
            href: `${npmURL}/docs/`,
            text: 'Learn more about decentralized insurance and Neptune Mutual protocol',
            icon: 'file-code-01',
            isExternal: true
          },
          {
            title: 'Web3 Tools',
            href: `${npmURL}/web3-tools/`,
            text: 'Free and easy to use web3 online tools',
            icon: 'tool-01',
            isExternal: true
          },
          {
            title: 'NFT Portal',
            href: '/',
            text: 'Participate in our cover pools and mint NFTs for free.',
            icon: 'clapperboard',
            isExternal: false
          }
        ]
      },
      {
        type: 'section',
        title: 'Company',
        links: [
          {
            title: 'About Us',
            href: `${npmURL}/about/`,
            text: 'Learn about our story and our mission statement',
            icon: 'flag-06',
            isExternal: true
          },
          {
            title: 'Grants and Bounties',
            href: `${npmURL}/grants-and-bounties/`,
            text: 'Learn about our programs, promotions, grants, and bounties',
            icon: 'stars-02',
            isExternal: true
          },
          {
            title: 'Careers',
            href: `${npmURL}/careers/`,
            text: 'We’re always looking for talented people. Join our team!',
            icon: 'users-01',
            badge: "We're Hiring!",
            isExternal: true
          },
          {
            title: 'Security',
            href: `${npmURL}/security/`,
            text: 'View our platform audit reports. Learn about our bug bounty program.',
            icon: 'glasses-02',
            isExternal: true
          },
          {
            title: 'Policy',
            href: `${npmURL}/policies/`,
            text: 'View our disclaimer, terms of service, and privacy policy',
            icon: 'folder',
            isExternal: true
          },
          {
            title: 'Contact',
            href: `${npmURL}/contact/`,
            text: 'Reach out to us via email or our community channels',
            icon: 'book-closed',
            isExternal: true
          }
        ]
      },
      {
        type: 'videos-section',
        title: 'From Our Youtube Channel',
        more: {
          title: 'All Video Tutorials',
          href: 'https://www.youtube.com/neptune-mutual'
        }
      }
    ]
  }
]

export { data }
