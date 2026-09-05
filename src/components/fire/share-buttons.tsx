import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buildShareUrl, buildTweetText, tweetIntentUrl } from "@/lib/fire/share";
import { usePlanStore } from "@/store/plan-store";

export function ShareButtons() {
  const plan = usePlanStore((s) => s.plan);
  const result = usePlanStore((s) => s.result);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = buildShareUrl(plan);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("このリンクをコピー", url);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const shareX = () => {
    const url = buildShareUrl(plan);
    const intent = tweetIntentUrl(buildTweetText(plan, result, url));
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 text-xs" onClick={copyLink}>
        {copied ? "コピーした" : "リンク"}
      </Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 text-xs" onClick={shareX}>
        X
      </Button>
    </div>
  );
}
