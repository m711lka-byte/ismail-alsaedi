import { BRAND_LOCATION, BRAND_NAME, BRAND_TAGLINE, BRAND_BIO, BRAND_COLORS, METHODOLOGY_STEPS, TONE_OF_VOICE_GUIDELINES, ISMAIL_PROFILE_DATA } from '../data/identityData';

export const brandConfig = {
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  bio: BRAND_BIO,
  location: BRAND_LOCATION,
  colors: BRAND_COLORS,
  methodology: METHODOLOGY_STEPS,
  toneOfVoice: TONE_OF_VOICE_GUIDELINES,
  profile: ISMAIL_PROFILE_DATA,
  baseUrl: 'https://ismail-alsaedi.vercel.app',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://ismail-alsaedi.vercel.app/#organization',
    'name': 'منصة إسماعيل الساعدي للحلول التقنية',
    'url': 'https://ismail-alsaedi.vercel.app',
    'logo': 'https://ismail-alsaedi.vercel.app/icon.png',
    'founder': {
      '@type': 'Person',
      '@id': 'https://ismail-alsaedi.vercel.app/#person'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': BRAND_LOCATION.city,
      'addressRegion': 'منطقة مكة المكرمة',
      'addressCountry': 'SA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': BRAND_LOCATION.coordinates.latitude,
      'longitude': BRAND_LOCATION.coordinates.longitude
    }
  },
  author: {
    '@type': 'Person',
    '@id': 'https://ismail-alsaedi.vercel.app/#person',
    'name': BRAND_NAME,
    'alternateName': ISMAIL_PROFILE_DATA.englishName,
    'jobTitle': ISMAIL_PROFILE_DATA.jobTitle,
    'description': ISMAIL_PROFILE_DATA.bio,
    'email': ISMAIL_PROFILE_DATA.email,
    'telephone': ISMAIL_PROFILE_DATA.phone,
    'url': ISMAIL_PROFILE_DATA.website,
    'sameAs': [
      ISMAIL_PROFILE_DATA.whatsappUrl,
      ISMAIL_PROFILE_DATA.harajUrl,
      ISMAIL_PROFILE_DATA.twitterUrl,
      ISMAIL_PROFILE_DATA.tiktokUrl,
      ISMAIL_PROFILE_DATA.instagramUrl,
      ISMAIL_PROFILE_DATA.linkedinUrl,
      ISMAIL_PROFILE_DATA.githubUrl,
      ISMAIL_PROFILE_DATA.youtubeUrl,
      ISMAIL_PROFILE_DATA.website
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': BRAND_LOCATION.city,
      'addressRegion': 'منطقة مكة المكرمة',
      'addressCountry': 'SA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': BRAND_LOCATION.coordinates.latitude,
      'longitude': BRAND_LOCATION.coordinates.longitude
    }
  }
};
