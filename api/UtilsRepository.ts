import axios from "axios";

// export default () => {
//   return {
// async function UrlToFile(url: string, fileName: string, fileType: string) {
//   try {
//     const { data } = await axios.get(url, { responseType: "blob" });
//     return new File([data], fileName, {
//       type: fileType,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// }}

export default () => {
  return {
    async UrlToFile(url: string, fileName?: string, fileType?: string) {
      try {
        const { data } = await axios.get(url, { responseType: "blob" });
        return new File([data], fileName ?? "download.jpeg", {
          type: fileType ?? "image/jpeg",
        });
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    },
  };
};
