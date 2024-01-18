export function randomName(length) {
  const result = ['x'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length - 1; i++) {
      result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }

    return `${result.join('')}`;
}