import { Feed } from "../src/node/feed";
import { lastUpdated, pubDate, sampleFeed } from "./setup";

describe("RSS 2.0", () => {
  it("should generate a valid feed", () => {
    const actual = sampleFeed.rss();

    expect(actual).toMatchSnapshot();
  });

  it("should generate a valid feed with image properties", () => {
    sampleFeed.addItem({
      title: "Hello World",
      guid: "419c523a-28f4-489c-877e-9604be64c001",
      link: "https://example.com/hello-world2",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          url: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          url: "https://example.com/joesmith",
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
      enclosure: {
        url: "https://example.com/hello-world.jpg",
        length: 12665,
        type: "image/jpeg",
      },
      pubDate,
    });

    const actual = sampleFeed.rss();

    expect(actual).toMatchSnapshot();
  });

  it("should generate a valid feed with enclosure", () => {
    sampleFeed.addItem({
      title: "Hello World",
      guid: "419c523a-28f4-489c-877e-9604be64c001",
      link: "https://example.com/hello-world2",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          url: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          url: "https://example.com/joesmith",
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
      enclosure: {
        url: "https://example.com/hello-world.jpg",
        length: 12665,
        type: "image/jpeg",
      },
      pubDate,
    });

    const actual = sampleFeed.rss();

    expect(actual).toMatchSnapshot();
  });

  it("should generate a valid feed with audio", () => {
    sampleFeed.addItem({
      title: "Hello World",
      link: "https://example.com/hello-world3",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          url: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          url: "https://example.com/joesmith",
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
      enclosure: {
        url: "https://example.com/hello-world.mp3",
        length: 12665,
        type: "audio/mpeg",
      },
      pubDate,
    });

    const actual = sampleFeed.rss();

    expect(actual).toMatchSnapshot();
  });

  it("should generate a valid feed with video", () => {
    const sampleFeed = new Feed({
      channel: {
        title: "Feed Title",
        description: "This is my personnal feed!",
        link: "http://example.com/",
        language: "en",
        ttl: 60,
        image: "http://example.com/image.png",
        copyright: "All rights reserved 2013, John Doe",
        hub: "wss://example.com/",
        pubDate,
        lastUpdated, // optional, default = today

        author: {
          name: "John Doe",
          email: "johndoe@example.com",
          url: "https://example.com/johndoe",
        },
      },
      links: {
        atom: "http://example.com/atom.xml",
        json: "http://example.com/sampleFeed.json",
        rss: "http://example.com/rss.xml",
      },
    });

    sampleFeed.addItem({
      title: "Hello World",
      guid: "419c523a-28f4-489c-877e-9604be64c005",
      link: "https://example.com/hello-world4",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          url: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          url: "https://example.com/joesmith",
        },
      ],
      category: [
        { name: "Grateful Dead" },
        { name: "MSFT", domain: "http://www.fool.com/cusips" },
      ],
      lastUpdated,
      enclosure: {
        url: "https://example.com/hello-world.mp4",
        type: "video/mp4",
      },
      pubDate,
    });

    const actual = sampleFeed.rss();

    expect(actual).toMatchSnapshot();
  });
});
