const excludedPaths = [
  "/api/*",
  "/account/*",
  "/orders/*",
  "/profile",
  "/checkout",
  "/cart",
  "/login",
  "/product/*/checkout",
  "/product/*/cart",
  "/_next/*",
  "/admin/*",
  "/[sitemap]",
];

module.exports = {
  siteUrl: "https://fitfusionayurveda.com",
  generateRobotsTxt: true,
  exclude: excludedPaths,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
  },
};
