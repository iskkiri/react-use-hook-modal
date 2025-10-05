const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export const nanoid = (size = 21) => {
  let id = '';
  // Simple random generation that works everywhere
  for (let i = 0; i < size; i++) {
    id += urlAlphabet[Math.floor(Math.random() * 64)];
  }
  return id;
};
