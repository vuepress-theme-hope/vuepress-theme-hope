import { Feed } from "../src/node/feed";

export const pubDate = new Date("Sat, 10 Jul 2013 23:00:00 GMT");
export const lastUpdated = new Date("Sat, 13 Jul 2013 23:00:00 GMT");

export const sampleFeed = new Feed({
  channel: {
    title: "Feed Title",
    description: "This is my personnal feed!",
    link: "http://example.com/",
    language: "en",
    ttl: 60,
    image: "http://example.com/image.png",
    icon: "http://example.com/image.ico",
    copyright: "All rights reserved 2013, John Doe",
    hub: "wss://example.com/",
    pubDate,
    lastUpdated, // optional, default = today

    author: {
      name: "John Doe",
      email: "johndoe@example.com",
      url: "https://example.com/johndoe?link=sanitized&value=2",
    },
  },
  links: {
    atom: "http://example.com/atom.xml",
    json: "http://example.com/sampleFeed.json",
    rss: "http://example.com/rss.xml",
  },
});

sampleFeed.addCategory("Technology");

sampleFeed.addContributor({
  name: "Johan Cruyff",
  email: "johancruyff@example.com",
  url: "https://example.com/johancruyff",
});

sampleFeed.addItem({
  title: "Hello World",
  guid: "https://example.com/hello-world?id=this&that=true",
  link: "https://example.com/hello-world?link=sanitized&value=2",
  description: "This is an article about Hello World.",
  content: "Content of my item",
  author: [
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      url: "https://example.com/janedoe?link=sanitized&value=2",
    },
    {
      name: "Joe Smith",
      email: "joesmith@example.com",
      url: "https://example.com/joesmith",
    },
    {
      name: "Joe Smith, Name Only",
    },
  ],
  contributor: [
    {
      name: "Shawn Kemp",
      email: "shawnkemp@example.com",
      url: "https://example.com/shawnkemp",
    },
    {
      name: "Reggie Miller",
      email: "reggiemiller@example.com",
      url: "https://example.com/reggiemiller",
    },
  ],
  category: [
    { name: "Grateful Dead" },
    {
      name: "MSFT",
      domain: "http://www.fool.com/cusips",
    },
  ],
  lastUpdated,
  image: "https://example.com/hello-world.jpg",
  enclosure: {
    url: "https://example.com/hello-world.jpg",
    length: 12665,
    type: "image/jpeg",
  },
  pubDate,
});
