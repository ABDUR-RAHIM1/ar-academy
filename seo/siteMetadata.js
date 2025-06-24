

export const siteMetadata = {
  metadataBase: new URL('https://onushilon-academy.vercel.app/'),
  title: 'Onushilon Academy - Learn & Grow',
  description: 'Onushilon Academy is a learning platform to enhance your skills.',
  keywords: ['Onushilon', 'Academy', 'Learning', 'Education'],
  authors: [{ name: 'Onushilon Academy Team' }],
  openGraph: {
    title: 'Onushilon Academy',
    description: 'A place to learn and grow together.',
    // url: 'http://localhost:3000/',
    url: 'https://onushilon-academy.vercel.app/',
    siteName: 'Onushilon Academy',
    images: [
      {
        url: '/images/og-image.png', // OpenGraph image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onushilon Academy',
    description: 'Learn and grow with Onushilon Academy.',
    creator: '@onushilon',
    images: ['/images/og-image.png'],
  },
};