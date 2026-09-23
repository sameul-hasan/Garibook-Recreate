/**
 * Language-independent homepage data: media, links and numbers.
 *
 * Everything here mirrors what garibook.com serves from
 * `api.garibookadmin.com` (`/web/get/newsrooms`, `/web/get/passenger-speaks`,
 * `/web/get/blogs`). The images were downloaded from that CMS and are served
 * locally, so the page makes no third-party requests.
 *
 * Translatable strings live in `src/i18n/{en,bn}.js`.
 */

export const APP_DOWNLOAD_URL =
  'https://onelink.to/gbweb?utm_source=Website&utm_medium=Webpage&utm_campaign=Homepage';
export const DRIVER_APP_URL =
  'https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps';

/** Nav entries pair a dictionary key with its href. */
export const navLinks = [
  { key: 'about', href: '/about-us' },
  { key: 'earn', href: '/earn-with-garibook' },
  { key: 'business', href: '/business' },
  { key: 'club', href: '/club' },
  { key: 'campaign', href: '/campaign' },
  { key: 'blogs', href: '/blogs' },
];

export const carTypes = [
  'Sedan',
  'Premium Sedan',
  'SUV',
  'Premium SUV',
  'Microbus',
  'Chander Gari',
];

export const airports = [
  'Hazrat Shahjalal International Airport, Dhaka',
  'Shah Amanat International Airport, Chattogram',
  'Osmani International Airport, Sylhet',
  "Cox's Bazar Airport",
  'Jashore Airport',
];

/** The counters as published on the live homepage. */
export const stats = [
  { value: 300000, suffix: '+' },
  { value: 850000, suffix: '+' },
  { value: 35000, suffix: '+' },
  { value: 64, suffix: '' },
];

export const rideIcons = [
  '/assets/images/cars/intercity_car_rental.svg',
  '/assets/images/cars/rideshare.svg',
  '/assets/images/cars/airport_rental.svg',
  '/assets/images/cars/hourly_rental.svg',
];

export const serviceTabIds = ['rides', 'business', 'club', 'vms'];

/**
 * The Business / Club / VMS panels. The reference site leaves this copy in
 * English in both languages, so it is not part of the dictionaries.
 */
export const serviceFeatures = {
  business: {
    title: 'Modern Car Rentals\nfor Business',
    description:
      'Simplify your corporate transportation, ensure on-time team mobility, and gain control with our VMS.',
    href: '/business',
    image: '/assets/images/services/busines.jpeg',
  },
  club: {
    title: 'Turn Your Car into Earnings with Garibook Club',
    description:
      'Garibook Club is more than just a community. Join a vibrant network of car enthusiasts, all fueled by the same passion: the open road and the thrill of making money doing what they love.',
    href: '/club',
    image: '/assets/images/services/garibook_club.jpg',
  },
  vms: {
    title: 'Vehicle Management System - VMS',
    description:
      'Just like Garibook Business makes traveling easy for your team, our Vehicle Management System (VMS) helps you take care of your own cars. VMS is a great tool that works with Garibook Business to make sure your vehicles are used the best way possible.',
    href: '/vehicle-management-system',
    image: '/assets/images/vms/Frame_1000001473.png',
  },
};

export const freedomIcons = [
  '/assets/icon/car.svg',
  '/assets/icon/drive.svg',
  '/assets/icon/price.svg',
];

export const togetherImages = [
  '/assets/images/services/Airport Rental_Webp.webp',
  '/assets/images/services/family_trips.webp',
  '/assets/images/services/Group Tour_Webp.webp',
];

export const arrivalGallery = [
  { image: '/assets/images/services/explore.jpeg', alt: 'Explore various ride services', span: 'wide' },
  { image: '/assets/images/services/freedom.jpg', alt: 'Freedom on the road' },
  { image: '/assets/images/services/safe_travel.svg', alt: 'Safe travel' },
  { image: '/assets/images/services/prefarred_car.jpg', alt: 'Choose your preferred car' },
  { image: '/assets/images/services/smooth.jpg', alt: 'A smooth experience' },
];

/**
 * Newsroom entries, verbatim from `/web/get/newsrooms`. `lang` is the CMS's
 * `language_type`: an item keeps its own language whichever way the page is
 * set, which is why each card carries its own font class.
 */
export const newsrooms = [
  {
    id: 28,
    lang: 'en',
    date: 'July 16, 2026',
    title: 'Replacing ride-hailing commissions with fixed subscriptions',
    text: 'Garibook charges drivers a flat subscription instead of a commission on every fare, letting them keep what they earn on each trip.',
    url: 'https://www.techinasia.com/replacing-ridehailing-commissions-fixed-subscriptions',
    image: '/assets/images/newsrooms/tech-in-asia.gif',
    brand: '/assets/images/newsrooms/tech-in-asia-logo.png',
    outlet: 'Tech in Asia',
  },
  {
    id: 27,
    lang: 'bn',
    date: 'January 29, 2025',
    title: 'গাড়িচালক ও তাদের পরিবারের স্বাস্থ্যসেবায় গাড়িবুক-সুখীর চুক্তি স্বাক্ষর',
    text: 'স্মার্ট চালক ও তাদের পরিবারের উন্নত স্বাস্থ্যসেবা নিশ্চিত করতে ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম ‘সুখী’-এর সঙ্গে চুক্তি স্বাক্ষর করেছে গাড়িবুক।',
    url: 'https://www.ittefaq.com.bd/717059/',
    image: '/assets/images/newsrooms/ittefaq.png',
    brand: '/assets/images/newsrooms/ittefaq-logo.png',
    outlet: 'The Daily Ittefaq',
  },
  {
    id: 22,
    lang: 'bn',
    date: 'January 29, 2025',
    title: 'গাড়িবুক ও সুখীর চুক্তি – স্মার্ট চালক ও পরিবারের জন্য উন্নত স্বাস্থ্যসেবা',
    text: 'দেশের শীর্ষস্থানীয় অ্যাপভিত্তিক প্ল্যাটফর্ম গাড়িবুক স্মার্ট চালক ও তাদের পরিবারের উন্নত স্বাস্থ্যসেবা নিশ্চিত করতে ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম ‘সুখী’-এর সঙ্গে একটি গুরুত্বপূর্ণ চুক্তি স্বাক্ষর করেছে।',
    url: 'https://www.kalerkantho.com/online/corporatecorner/2025/01/28/1473908',
    image: '/assets/images/newsrooms/kaler-kantho-sukhee.png',
    brand: '/assets/images/newsrooms/kaler-kantho-sukhee-logo.png',
    outlet: 'Kaler Kantho',
  },
  {
    id: 1,
    lang: 'bn',
    date: 'December 05, 2024',
    title: 'গাড়িবুক: বাংলাদেশের ইন্টারসিটি ভ্রমণে স্বাধীনতার নতুন পথচলা',
    text: 'বাংলাদেশে ইন্টারসিটি ভ্রমণ সহজ ও সাশ্রয়ী করার লক্ষ্যে একটি অনন্য উদ্যোগ নিয়ে এসেছে ‘গাড়িবুক’। কোনো কমিশন ছাড়াই ইন্টারসিটি কার রেন্টাল পরিষেবা দেওয়া গাড়িবুক দেশের প্রথম এবং একমাত্র অ্যাপ।',
    url: 'https://www.prothomalo.com/bangladesh/9657q54847',
    image: '/assets/images/newsrooms/prothom-alo.webp',
    brand: '/assets/images/newsrooms/prothom-alo-logo.png',
    outlet: 'Prothom Alo',
  },
  {
    id: 3,
    lang: 'bn',
    date: 'December 04, 2024',
    title: 'বাংলাদেশে প্রথমবার ‘চান্দের গাড়ি’ গাড়িবুক অ্যাপে',
    text: 'বাংলাদেশে পর্যটকদের জন্য জনপ্রিয় যানবাহন ‘চান্দের গাড়ি’ এবার যুক্ত হলো অনলাইন অ্যাপ ভিত্তিক প্ল্যাটফরমে। গাড়িবুক দেশের প্রথম অ্যাপ হিসেবে পর্যটকদের জন্য এই বিশেষ যানটি বুকিং সুবিধা নিয়ে এলো।',
    url: 'https://www.kalerkantho.com/online/corporatecorner/2024/11/18/1448094',
    image: '/assets/images/newsrooms/kaler-kantho.jpeg',
    brand: '/assets/images/newsrooms/kaler-kantho-logo.png',
    outlet: 'Kaler Kantho',
  },
  {
    id: 2,
    lang: 'en',
    date: 'December 04, 2024',
    title: 'Digital App to offer "Chander Gari"',
    text: 'For the first time in Bangladesh, tourists can now book the iconic Chander Gari through an online platform.',
    url: 'https://epaper.dhakatribune.com/epaper/details/115797',
    image: '/assets/images/newsrooms/dhaka-tribune.jpeg',
    brand: '/assets/images/newsrooms/dhaka-tribune-logo.png',
    outlet: 'Dhaka Tribune',
  },
];

/**
 * Passenger stories, verbatim from `/web/get/passenger-speaks`. Each one is a
 * YouTube video; the poster frames are that video's own thumbnail.
 */
export const passengerStories = [
  {
    videoId: 'JsBwaJ_VIcA',
    name: 'Atif Haider',
    occupation: 'Banker',
    thumb: '/assets/images/passengers/atif-haider.jpg',
  },
  {
    videoId: 'CsxeEof1T3M',
    name: 'Mohammad Habibur Rahman',
    occupation: 'Banker',
    thumb: '/assets/images/passengers/mohammad-habibur-rahman.jpg',
  },
  {
    videoId: '8ma9XEGhi5s',
    name: 'Sadia Afrin',
    occupation: 'Service Holder',
    thumb: '/assets/images/passengers/sadia-afrin.jpg',
  },
];

/** The three most recent posts from `/web/get/blogs`. */
export const blogPosts = [
  {
    id: 18,
    lang: 'bn',
    date: 'September 20, 2026',
    category: 'Informative',
    title: 'নওগাঁর দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা',
    slug: 'নওগাঁর-দর্শনীয়-স্থান-সমূহ-খাবার-ও-থাকার-ব্যবস্থা',
    image: '/assets/images/blogs/naogaon-travel-guide.webp',
  },
  {
    id: 17,
    lang: 'bn',
    date: 'September 20, 2026',
    category: 'Destinations',
    title: 'সিলেটের দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা',
    slug: 'সিলেটের-দর্শনীয়-স্থান-সমূহ-খাবার-ও-থাকার-ব্যবস্থা',
    image: '/assets/images/blogs/sylhet-travel-guide.webp',
  },
  {
    id: 16,
    lang: 'bn',
    date: 'September 15, 2026',
    category: 'Lifestyle',
    title: 'রাইড শেয়ারিংয়ে বদলে যাচ্ছে বাংলাদেশের শহুরে পরিবহন ব্যবস্থা',
    slug: 'রাইড-শেয়ারিংয়ে-বদলে-যাচ্ছে-বাংলাদেশের-শহুরে-পরিবহন-ব্যবস্থা',
    image: '/assets/images/blogs/ride-sharing-urban-transport.webp',
  },
];

export const footerHrefs = [
  ['/about-us', '/passenger-speak', '/career', '/newsrooms', 'https://map.garibook.com/'],
  ['/', '/', '/', '/vehicle-management-system'],
  ['/earn-with-garibook', '/club', '/business'],
];

export const contactInfo = {
  email: 'support@garibook.com',
  phoneHref: 'tel:09678112233',
};

export const partners = [
  {
    key: 'productBy',
    name: 'NRB Solution Ltd.',
    logo: '/assets/images/nrb/nrb_no_background.svg',
    href: 'https://nrb-solutions.net/',
  },
  {
    key: 'poweredBy',
    name: 'Link 3 Technologies',
    logo: '/assets/images/clients/link3-two.png',
    href: 'https://link3.net/',
  },
];
