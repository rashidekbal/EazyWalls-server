function escapeRegex(text:string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


function isValidEmail(email: string): boolean {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailRegex.test(email);
}



function buildFuzzyRegex(text:string) {
  return escapeRegex(text).split("").join(".*");
}
export{escapeRegex,buildFuzzyRegex,isValidEmail}