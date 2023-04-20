import { AppConstants } from '@/constants/AppConstants'

const npmURL = AppConstants.neptunemutualOrigin

const data = [
  {
    title: 'Blog',
    href: `${npmURL}/blog/`,
    includeTheme: true
  },
  {
    title: 'Careers',
    href: `${npmURL}/careers/`,
    includeTheme: true
  },
  {
    title: 'About Us',
    href: `${npmURL}/about/`,
    includeTheme: true
  },
  {
    title: 'Resources',
    children: [
      {
        type: 'section',
        title: 'Resources',
        links: [
          { title: 'Explore Marketplace', href: `${npmURL}/marketplace/`, text: 'Explore the marketplace, purchase policies, and pool liquidity', icon: 'bank', includeTheme: true, isExternal: true },
          { title: 'Blog ', href: `${npmURL}/blog/`, text: 'Visit our blog', icon: 'edit-03', includeTheme: true, isExternal: true },
          { title: 'Press Room', href: `${npmURL}/pressroom/`, text: 'The source for news about Neptune Mutual', icon: 'annotation-dots', includeTheme: true, isExternal: true },
          { title: 'Ecosystem', href: `${npmURL}/ecosystem/`, text: 'Learn how you can participate in our marketplace', icon: 'database-01', includeTheme: true, isExternal: true },
          { title: 'Documentation', href: `${npmURL}/docs/`, text: 'Learn more about decentralized insurance and Neptune Mutual protocol', icon: 'file-code-01', includeTheme: true, isExternal: true },
          { title: 'Web3 Tools', href: `${npmURL}/web3-tools/`, text: 'Free and easy to use web3 online tools', icon: 'tool-01', includeTheme: true, isExternal: true },
          { title: 'NFT Portal', href: '/', text: 'Participate in our cover pools and mint NFTs for free.', icon: 'clapperboard', isExternal: false }
        ]
      },
      {
        type: 'section',
        title: 'Company',
        links: [
          { title: 'About Us', href: `${npmURL}/about/`, text: 'Learn about our story and our mission statement', icon: 'flag-06', includeTheme: true, isExternal: true },
          { title: 'Grants and Bounties', href: `${npmURL}/grants-and-bounties/`, text: 'Learn about our programs, promotions, grants, and bounties', icon: 'stars-02', includeTheme: true, isExternal: true },
          { title: 'Careers', href: `${npmURL}/careers/`, text: 'We’re always looking for talented people. Join our team!', icon: 'users-01', badge: "We're Hiring!", includeTheme: true, isExternal: true },
          { title: 'Security', href: `${npmURL}/security/`, text: 'View our platform audit reports. Learn about our bug bounty program.', icon: 'glasses-02', includeTheme: true, isExternal: true },
          { title: 'Policy', href: `${npmURL}/policies/`, text: 'View our disclaimer, terms of service, and privacy policy', icon: 'folder', includeTheme: true, isExternal: true },
          { title: 'Contact', href: `${npmURL}/contact/`, text: 'Reach out to us via email or our community channels', icon: 'book-closed', includeTheme: true, isExternal: true }
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
