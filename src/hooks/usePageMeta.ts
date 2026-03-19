import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path relative to root, e.g. "/diagnostic". Defaults to current pathname. */
  canonicalPath?: string;
}

/** Sets document title, meta description and canonical link. Reverts on unmount. */
export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = metaDesc?.content ?? "";
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical link
    const path = canonicalPath ?? window.location.pathname;
    const canonicalUrl = `https://solarbox.ma${path === "/" ? "" : path}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = link?.href ?? "";
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDesc;
      if (link) link.href = prevCanonical;
    };
  }, [title, description, canonicalPath]);
}
