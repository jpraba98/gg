export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
  category?: "Event Recaps" | "Music Videos" | "Interviews" | "Behind the Scenes";
}
