import { nanoid } from '../../utils/nanoid';

describe('nanoid', () => {
  it('should generate an ID of the default size (21)', () => {
    const id = nanoid();
    expect(id).toHaveLength(21);
  });

  it('should generate an ID of the specified size', () => {
    const size = 10;
    const id = nanoid(size);
    expect(id).toHaveLength(size);
  });

  it('should generate different IDs on subsequent calls', () => {
    const id1 = nanoid();
    const id2 = nanoid();
    expect(id1).not.toBe(id2);
  });

  it('should only use characters from urlAlphabet', () => {
    const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    const id = nanoid();

    for (const char of id) {
      expect(urlAlphabet).toContain(char);
    }
  });
});
