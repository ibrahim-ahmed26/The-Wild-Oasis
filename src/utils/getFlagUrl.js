export default function getFlagUrl(emoji) {
  if (!emoji) return null;
  const codePoints = [...emoji]
    .map((c) => c.codePointAt(0) - 127397)
    .map((c) => String.fromCharCode(c))
    .join("")
    .toLowerCase();
  return `https://flagcdn.com/${codePoints}.svg`;
}
