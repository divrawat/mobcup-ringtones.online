/*
import { SongsSitemap } from '../actions/songs';
import { DOMAIN } from "../config";
import fs from 'fs';
import path from 'path';

const CHAPTERS_PER_SITEMAP = 20000;

const generateXmlSitemap = (blogs) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  blogs.forEach((blog) => {
    xml += `
    <url>
      <loc>${`${DOMAIN}/${blog.slug}`}</loc>
    </url>`;
  });

  xml += '</urlset>';
  return xml;
};

export async function getServerSideProps() {
  const data = await SongsSitemap();

  const totalSitemaps = Math.ceil(data.totalsongs / CHAPTERS_PER_SITEMAP);

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  for (let i = 0; i < totalSitemaps; i++) {
    const start = i * CHAPTERS_PER_SITEMAP;
    const end = start + CHAPTERS_PER_SITEMAP;
    const chunk = data.data.slice(start, end);

    const sitemapContent = generateXmlSitemap(chunk);
    const sitemapPath = path.join(publicDir, `test-songs-sitemap.xml`);

    // Write the sitemap to the public directory
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  }

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
*/



export default function Sitemap() { return null; }


