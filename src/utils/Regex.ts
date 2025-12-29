function escapeRegex(text:string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFuzzyRegex(text:string) {
  return escapeRegex(text).split("").join(".*");
}
export{escapeRegex,buildFuzzyRegex}