/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static build
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  trailingSlash: true, // required for AWS S3/CloudFront hosting
  images: {
    unoptimized: true, // required when using <Image /> with static export
  },
  async redirects() {
    return [
      {
        source: "/blogs/bandicootrobot/",
        destination: "https://sanitation.genrobotics.com/bandicoot/",
        permanent: true,
      },
      {
        source: "/ProductPages/bandicoot",
        destination: "https://sanitation.genrobotics.com/bandicoot/",
        permanent: true,
      },
      {
        source: "/ProductPages/bandicoot-mobility-plus",
        destination: "https://sanitation.genrobotics.com/mobility+/",
        permanent: true,
      },
      {
        source: "/ProductPages/g-crow-new",
        destination: "https://sanitation.genrobotics.com/gcrow/",
        permanent: true,
      },
      {
        source: "/Genrobotic",
        destination: "https://genrobotics.com/",
        permanent: true,
      },
      {
        source: "/career",
        destination: "https://genrobotics.com/careers/",
        permanent: true,
      },

    ];
  },

  //   headers: async () => [
  //   {
  //     source: '/(.*)',
  //     headers: [
  //       {
  //         key: 'Content-Security-Policy',
  //         value: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;",
  //       },
  //     ],
  //   },
  // ]
};

// // Content Security Policy - adjust sources as needed for third-party services
// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
//   style-src 'self' 'unsafe-inline' https:;
//   img-src 'self' data: blob: https:;
//   font-src 'self' data: https:;
//   connect-src 'self' https: ws: wss:;
//   frame-ancestors 'none';
//   base-uri 'self';
//   form-action 'self';
//   object-src 'none';
//   upgrade-insecure-requests;
// `;

// // Add common security headers for all routes
// nextConfig.headers = async () => {
//   return [
//     {
//       // Apply these headers to all routes in the application.
//       source: '/(.*)',
//       headers: [
//         {
//           key: 'Content-Security-Policy',
//           // Next.js requires a single-line header value — remove newlines
//           value: ContentSecurityPolicy.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim(),
//         },
//         {
//           key: 'X-Frame-Options',
//           value: 'DENY',
//         },
//         {
//           key: 'X-Content-Type-Options',
//           value: 'nosniff',
//         },
//         {
//           key: 'Referrer-Policy',
//           value: 'strict-origin-when-cross-origin',
//         },
//         {
//           key: 'Permissions-Policy',
//           value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
//         },
//         {
//           key: 'Strict-Transport-Security',
//           // 2 years, include subdomains, preload — only set when serving over HTTPS
//           value: 'max-age=63072000; includeSubDomains; preload',
//         },
//       ],
//     },
//   ];
// };

export default nextConfig;