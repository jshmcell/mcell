import type { NextConfig } from "next";

const oldRoutes: [string, string][] = [
  ["/29", "/about"],
  ["/33", "/about"],
  ["/34", "/about/history"],
  ["/35", "/about/certifications"],
  ["/36", "/about/contact"],
  ["/30", "/mcell"],
  ["/31", "/mcell"],
  ["/32", "/mcell/oem-odm"],
  ["/37", "/shop"],
  ["/38", "/library/portfolio"],
  ["/39", "/library/portfolio"],
  ["/40", "/library/catalog"],
  ["/48", "/news/notices"],
  ["/45", "/news/notices"],
  ["/46", "/news/updates"],
  ["/44", "/partnership"],
  ["/site_join_pattern_choice", "/signup"],
  ["/site_join_agree", "/signup"],
  ["/site_join", "/signup"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return oldRoutes.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;