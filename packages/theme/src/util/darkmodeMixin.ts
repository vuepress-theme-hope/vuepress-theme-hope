/* global COLOR_OPTION */
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DarkmodeMixin extends Vue {
  protected mounted(): void {
    this.setMode();
  }

  /** 设置颜色 */
  protected setColor(mode: 'light' | 'dark'): void {
    const rootElement = document.querySelector<HTMLElement>(':root');
    const config = COLOR_OPTION[mode];

    if (rootElement) {
      for (const key in config)
        if (Object.prototype.hasOwnProperty.call(config, key))
          rootElement.style.setProperty(key, config[key]);

      if (COLOR_OPTION['--accent-color'])
        rootElement.style.setProperty(
          '--accent-color',
          COLOR_OPTION['--accent-color']
        );
    }
  }

  /** 设置颜色模式 */
  protected setMode(): void {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)')
      .matches;

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener((e) => e.matches && this.setColor('dark'));
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addListener((e) => e.matches && this.setColor('light'));

    if (isDarkMode) this.setColor('dark');
    else if (isLightMode) this.setColor('light');
    else {
      const timeHour = new Date().getHours();
      this.setColor(timeHour < 5 || timeHour >= 20 ? 'dark' : 'light');
    }
  }
}
