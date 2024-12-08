import { onMounted } from "vue";

export interface SnowflakeOptions {
  /**
   * Min size of snowflake in pixels
   *
   * 雪花的最小大小 (像素)
   *
   * @default 5
   */
  minSize: number;

  /**
   * Max size of snowflake in pixels
   *
   * 雪花的最大大小 (像素)
   *
   * @default 10
   */
  maxSize: number;

  /**
   * Speed of snowflake
   *
   * 雪花的下落速度
   *
   * @default 1
   */
  speed: number;
}

class Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;

  constructor(
    public image: HTMLImageElement,
    public context: CanvasRenderingContext2D,
    { maxSize, minSize, speed }: SnowflakeOptions,
  ) {
    this.x = Math.random() * context.canvas.width;
    this.y = Math.random() * context.canvas.height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speed = speed;
  }

  move(): void {
    this.y += this.speed;
    if (this.y > this.context.canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * this.context.canvas.width;
    }
  }

  draw(): void {
    this.context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export interface SnowFallOptions extends Partial<SnowflakeOptions> {
  /**
   * Image of snowflake
   *
   * 雪花的图片文件
   */
  image?: string;

  /**
   * Count of snowflakes
   *
   * 雪花数量
   *
   * @default 25
   */
  count?: number;
}

export const setupSnowFall = ({
  speed = 1,
  image = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='4' d='M24 4v40M6.725 14l34.64 20M6.72 33.977l34.56-19.954M12 10l3 9-9 2m0 6 9 2-3 9m24-28-3 9 9 2m0 6-9 2 3 9M18 7l6 6 6-6M18 41l6-6 6 6'/%3E%3C/svg%3E",
  count = 10,
  minSize = 5,
  maxSize = 10,
}: SnowFallOptions = {}): void => {
  onMounted(() => {
    const canvas = document.createElement("canvas");

    document.body.appendChild(canvas);

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context = canvas.getContext("2d")!;

    const snowflakeImage = new Image();

    snowflakeImage.onload = (): void => {
      const snowflakes: Snowflake[] = [];

      for (let i = 0; i < count; i++)
        snowflakes.push(
          new Snowflake(snowflakeImage, context, { maxSize, minSize, speed }),
        );

      const drawSnowflakes = (): void => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const snowflake of snowflakes) {
          snowflake.move();
          snowflake.draw();
        }
        requestAnimationFrame(drawSnowflakes);
      };

      drawSnowflakes();
    };

    snowflakeImage.src = image;
  });
};
