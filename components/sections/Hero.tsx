import type { CmsHero } from "@/lib/cms/types";
import { SplitTemplate } from "./hero/SplitTemplate";
import { FullTemplate } from "./hero/FullTemplate";
import { CenterTemplate } from "./hero/CenterTemplate";
import { TopTemplate } from "./hero/TopTemplate";

export function Hero({ content }: { content?: CmsHero }) {
  switch (content?.template) {
    case "full":
      return <FullTemplate content={content} />;
    case "center":
      return <CenterTemplate content={content} />;
    case "top":
      return <TopTemplate content={content} />;
    case "split":
    default:
      return <SplitTemplate content={content} />;
  }
}
