import { BRAND_LOCATION, BRAND_NAME, BRAND_TAGLINE, BRAND_BIO, BRAND_COLORS, METHODOLOGY_STEPS, TONE_OF_VOICE_GUIDELINES } from '../data/identityData';

export const brandConfig = {
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  bio: BRAND_BIO,
  location: BRAND_LOCATION,
  colors: BRAND_COLORS,
  methodology: METHODOLOGY_STEPS,
  toneOfVoice: TONE_OF_VOICE_GUIDELINES,
  baseUrl: 'https://esmail-alsaadi.com',
  publisher: {
    '@type': 'Organization',
    'name': 'منصة إسماعيل الساعدي للحلول التقنية',
    'url': 'https://esmail-alsaadi.com',
    'logo': 'https://esmail-alsaadi.com/icon.png',
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
    'name': BRAND_NAME,
    'jobTitle': 'مطور خبير ومستشار تقني',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': BRAND_LOCATION.city,
      'addressCountry': 'SA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': BRAND_LOCATION.coordinates.latitude,
      'longitude': BRAND_LOCATION.coordinates.longitude
    }
  }
};
