const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(amount) {
  return priceFormatter.format(amount);
}

const CATEGORY_EMOJI = {
  Grocery: "🥑",
  Electronics: "🎧",
  Fashion: "👕",
  Home: "🪴",
};

export function categoryEmoji(category) {
  return CATEGORY_EMOJI[category] ?? "🛍️";
}
