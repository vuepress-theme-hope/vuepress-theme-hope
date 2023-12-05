import type { ShareServiceConfig } from "../../../shared/index.js";

export const telegram: ShareServiceConfig = {
  link: "https://t.me/share/url?url=[url]&text=[title]%0D%0A[description|summary]",
  color: "#158cc7",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m410.965 814.649 12.743-192.512L773.234 307.2c15.474-14.108-3.186-20.935-23.666-8.647L318.123 571.164 131.527 512c-40.05-11.378-40.505-39.14 9.102-59.164l726.813-280.349c33.223-15.019 65.08 8.192 52.338 59.165L795.99 814.649c-8.648 41.415-33.679 51.427-68.267 32.313L539.307 707.698l-90.567 87.836c-10.468 10.468-19.115 19.115-37.775 19.115z"/></svg>',
};
