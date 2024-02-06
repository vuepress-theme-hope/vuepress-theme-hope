export class Store {
  store: string[];

  constructor() {
    this.store = [];
  }

  addItem(item: string): number {
    const index = this.store.indexOf(item);

    if (index === -1) {
      this.store.push(item);

      return this.store.length - 1;
    }

    return index;
  }

  addItems(items: string[]): number[] {
    return items.map((item) => this.addItem(item));
  }

  clearItem(item: string): void {
    const index = this.store.indexOf(item);

    if (index !== -1) this.store[index] = "";
  }

  toJSON(): string {
    return JSON.stringify(this.store);
  }
}
