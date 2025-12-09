export function esVideo(url) {
  return url.endsWith(".mp4") || 
         url.endsWith(".mov") || 
         url.endsWith(".webm") || 
         url.includes("raw.githubusercontent.com");
}
