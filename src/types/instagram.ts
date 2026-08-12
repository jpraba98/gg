export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  likeCount?: number;
  permalink: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}
