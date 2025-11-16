import Parser from "rss-parser";
const parser = new Parser();

export async function getNews(feedURL) {
  try {
    const feed = await parser.parseURL(feedURL);

    return feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate
    }));
  } catch (error) {
    console.error("Error leyendo RSS:", error);
    return [];
  }
}
