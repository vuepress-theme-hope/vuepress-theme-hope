export interface PortfolioHomeFrontmatter {
  name?: string;
  titles?: string[];
  avatar: string | null;
  avatarDark: string | null;
  avatarStyle: string | Record<string, string> | undefined;
  avatarAlt: string;
  bgImage?: string | false;
  bgImageDark?: string | false;
  bgImageStyle?: Record<string, string> | string;
  welcome?: string;
  medias?: {
    name?: string;
    icon: string;
    url: string;
  }[];
}
