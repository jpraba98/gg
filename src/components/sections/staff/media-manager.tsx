import { Card } from "@/components/ui/card";
import { YouTubeIcon, InstagramIcon } from "@/components/shared/social-icons";

export function MediaManager() {
  return (
    <div>
      <h3 className="font-display text-xl text-white">Media Manager</h3>
      <p className="mt-1 text-sm text-text-secondary">
        The public /media page pulls live from YouTube and Instagram — there&apos;s no separate
        media library to curate here.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <YouTubeIcon className="h-6 w-6 text-drip-500" aria-hidden="true" />
          <p className="mt-3 font-semibold text-white">YouTube</p>
          <p className="mt-1 text-sm text-text-secondary">
            Videos come straight from the channel set by{" "}
            <code className="text-drip-500">YOUTUBE_CHANNEL_HANDLE</code>. Upload or reorder
            videos on YouTube directly and they&apos;ll appear here automatically.
          </p>
        </Card>
        <Card className="p-6">
          <InstagramIcon className="h-6 w-6 text-drip-500" aria-hidden="true" />
          <p className="mt-3 font-semibold text-white">Instagram</p>
          <p className="mt-1 text-sm text-text-secondary">
            Posts come from the Instagram Graph API for the account connected via{" "}
            <code className="text-drip-500">INSTAGRAM_ACCESS_TOKEN</code>. Post on Instagram
            directly and it&apos;ll appear here on the next refresh.
          </p>
        </Card>
      </div>
    </div>
  );
}
