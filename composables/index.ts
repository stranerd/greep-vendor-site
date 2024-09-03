export const gpHelpers = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + " ...";
    else return words.slice(0, slice);
  },

  capitalizeWords(word: string) {
    return word.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  },

  generateUniqueHexCode() {
    const characters = "0123456789ABCDEF";
    let hexCode = "#";

    for (let i = 0; i < 6; i++) {
      hexCode += characters[Math.floor(Math.random() * 16)];
    }
    return hexCode;
  },

  removeDuplicates(arr?: any[]) {
    const seen = new Map();

    if (arr)
      return arr.filter((item) => {
        const { _id, ...rest } = item; // Destructure to separate _id from the rest of the properties
        const key = JSON.stringify(rest); // Create a unique key based on the properties other than _id

        if (!seen.has(key)) {
          seen.set(key, true);
          return true;
        }
        return false;
      });
  },

  formatWebsiteName(url: string) {
    return url.replace(/^(https?:\/\/)/, "");
  },
};
