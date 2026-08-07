import { Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";

export function ETransferModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>E-Transfer Instructions</DialogTitle>
          <DialogDescription>
            Prefer to pay by Interac e-Transfer? Send your membership payment to the email
            below and include your name + tier in the memo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
          <span className="text-sm font-medium text-white">{siteConfig.eTransferEmail}</span>
          <button
            onClick={() => navigator.clipboard.writeText(siteConfig.eTransferEmail)}
            className="text-text-secondary hover:text-drip-500"
            aria-label="Copy email"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-text-secondary">
          Once received, we&apos;ll activate your membership within 24 hours and follow up by
          email to confirm.
        </p>
      </DialogContent>
    </Dialog>
  );
}
