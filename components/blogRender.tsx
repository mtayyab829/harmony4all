'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import VideoPopup from "./VideoPopup";
import { isVideoUrl } from "../lib/video-utils";

interface BlogNode {
  type: string;
  id?: string;
  nodes?: BlogNode[];
  textData?: {
    text: string;
    decorations?: Array<{
      type: string;
      data?: {
        link?: {
          url: string;
        };
      };
    }>;
  };
  paragraphData?: {
    textStyle?: {
      textAlignment?: string;
    };
    indentation?: number;
  };
  headingData?: {
    level?: number;
  };
  imageData?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  codeData?: {
    text: string;
    language?: string;
  };
  quoteData?: {
    text: string;
    attribution?: string;
  };
  tableData?: {
    table: {
      rows: Array<{
        cells: Array<{
          content: BlogNode[];
        }>;
      }>;
    };
  };
  dividerData?: {
    style?: string;
  };
  videoData?: {
    src: string;
    title?: string;
  };
  audioData?: {
    src: string;
    title?: string;
  };
  embedData?: {
    url: string;
    title?: string;
  };
}

const proseStyles = {
  '--tw-prose-body': '#374151',
  '--tw-prose-headings': '#111827',
  '--tw-prose-lead': '#4b5563',
  '--tw-prose-links': '#2563eb',
  '--tw-prose-bold': '#111827',
  '--tw-prose-counters': '#6b7280',
  '--tw-prose-bullets': '#d1d5db',
  '--tw-prose-hr': '#e5e7eb',
  '--tw-prose-quotes': '#111827',
  '--tw-prose-quote-borders': '#e5e7eb',
  '--tw-prose-captions': '#6b7280',
  '--tw-prose-code': '#111827',
  '--tw-prose-pre-code': '#e5e7eb',
  '--tw-prose-pre-bg': '#1f2937',
  '--tw-prose-th-borders': '#d1d5db',
  '--tw-prose-td-borders': '#e5e7eb',
} as React.CSSProperties;

const contentStyles = `
  <style>
    .prose p {
      margin-bottom: 1.5rem !important;
      margin-top: 0.5rem !important;
      line-height: 1.7 !important;
    }
    .prose p:first-child {
      margin-top: 0 !important;
    }
    .prose p:last-child {
      margin-bottom: 0 !important;
    }
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
      margin-top: 2rem !important;
      margin-bottom: 1rem !important;
    }
    .prose h1:first-child, .prose h2:first-child, .prose h3:first-child, 
    .prose h4:first-child, .prose h5:first-child, .prose h6:first-child {
      margin-top: 0 !important;
    }
    .prose img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
    }
    .prose video, .prose .custom-video-wrapper {
      max-width: 100%;
      border-radius: 8px;
      margin: 1.5rem 0;
      cursor: pointer;
    }
    .prose .video-popup-trigger {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
    .prose .video-popup-trigger::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .prose .video-popup-trigger:hover::after {
      opacity: 1;
    }
    .prose .resizable-image-wrapper {
      margin: 1.5rem 0;
    }
  </style>
`;

function WixBlogRenderer({ content }: { content: string | BlogNode }) {
  const articleRef = useRef<HTMLElement>(null);
  const [popupVideo, setPopupVideo] = useState<string | null>(null);

  const openVideoPopup = useCallback((src: string) => {
    setPopupVideo(src);
  }, []);

  const isHtmlContent = (value: string | BlogNode): boolean => {
    if (typeof value === "string") {
      const htmlRegex = /<[^>]*>/;
      return htmlRegex.test(value);
    }
    return false;
  };

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const cleanups: Array<() => void> = [];

    const attachVideoTrigger = (element: Element, src: string) => {
      element.classList.add('video-popup-trigger');
      const handler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        openVideoPopup(src);
      };
      element.addEventListener('click', handler);
      cleanups.push(() => element.removeEventListener('click', handler));
    };

    article.querySelectorAll('video[src]').forEach((video) => {
      const src = video.getAttribute('src');
      if (src) attachVideoTrigger(video, src);
    });

    article.querySelectorAll('iframe[src*="youtube"], iframe[src*="youtu.be"], iframe[src*="vimeo"]').forEach((iframe) => {
      const src = iframe.getAttribute('src');
      if (src) attachVideoTrigger(iframe, src);
    });

    article.querySelectorAll('.custom-video-wrapper').forEach((wrapper) => {
      const video = wrapper.querySelector('video[src]');
      const iframe = wrapper.querySelector('iframe[src]');
      const src = video?.getAttribute('src') || iframe?.getAttribute('src');
      if (src) attachVideoTrigger(wrapper, src);
    });

    article.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || !isVideoUrl(href)) return;
      if (!anchor.querySelector('img')) return;

      const handler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        openVideoPopup(href);
      };
      anchor.addEventListener('click', handler);
      (anchor as HTMLElement).style.cursor = 'pointer';
      cleanups.push(() => anchor.removeEventListener('click', handler));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [content, openVideoPopup]);

  if (isHtmlContent(content)) {
    const htmlContent = content as string;

    return (
      <>
        <article
          ref={articleRef}
          className="prose prose-lg max-w-none"
          style={proseStyles}
          dangerouslySetInnerHTML={{ __html: contentStyles + htmlContent }}
        />
        <VideoPopup videoUrl={popupVideo} onClose={() => setPopupVideo(null)} />
      </>
    );
  }

  const data = typeof content === "string" ? JSON.parse(content) : content;

  const renderNode = (node: BlogNode, index: number, onVideoClick?: (src: string) => void) => {
    if (!node || !node.type) return null;

    switch (node.type) {
      case "PARAGRAPH": {
        const alignment =
          node.paragraphData?.textStyle?.textAlignment?.toLowerCase() || "left";
        const indentation = node.paragraphData?.indentation || 0;

        return (
          <p
            key={node.id || index}
            style={{
              textAlign: alignment as "left" | "center" | "right" | "justify",
              marginBottom: "1.5rem",
              marginTop: "0.5rem",
              paddingLeft: indentation > 0 ? `${indentation * 2}em` : undefined
            }}
            className="leading-relaxed"
          >
            {node.nodes?.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </p>
        );
      }

      case "HEADING": {
        const level = node.headingData?.level || 2;
        const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        const headingStyles = {
          h1: "text-4xl font-bold mb-4 mt-6",
          h2: "text-3xl font-bold mb-3 mt-5",
          h3: "text-2xl font-semibold mb-2 mt-4",
          h4: "text-xl font-semibold mb-2 mt-3",
          h5: "text-lg font-medium mb-1 mt-2",
          h6: "text-base font-medium mb-1 mt-2"
        };

        return (
          <Tag
            key={node.id || index}
            className={headingStyles[`h${level}` as keyof typeof headingStyles] || headingStyles.h2}
          >
            {node.nodes?.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </Tag>
        );
      }

      case "TEXT": {
        let text = node.textData?.text || "";
        let el: React.ReactNode = text;

        if (node.textData?.decorations) {
          node.textData.decorations.forEach((dec, decIndex) => {
            const key = `${index}-${decIndex}`;

            switch (dec.type) {
              case "BOLD":
                el = <strong key={key} className="font-bold">{el}</strong>;
                break;
              case "ITALIC":
                el = <em key={key} className="italic">{el}</em>;
                break;
              case "UNDERLINE":
                el = <u key={key} className="underline">{el}</u>;
                break;
              case "STRIKETHROUGH":
                el = <del key={key} className="line-through">{el}</del>;
                break;
              case "SUBSCRIPT":
                el = <sub key={key}>{el}</sub>;
                break;
              case "SUPERSCRIPT":
                el = <sup key={key}>{el}</sup>;
                break;
              case "LINK": {
                const url = dec.data?.link?.url || "";
                if (isVideoUrl(url)) {
                  el = (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onVideoClick?.(url)}
                      className="text-blue-600 hover:text-blue-800 underline bg-transparent border-0 p-0 cursor-pointer"
                    >
                      {el}
                    </button>
                  );
                } else {
                  el = (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {el}
                    </a>
                  );
                }
                break;
              }
              case "CODE":
                el = <code key={key} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{el}</code>;
                break;
            }
          });
        }

        return el;
      }

      case "IMAGE": {
        const src = node.imageData?.src;
        if (!src) return null;

        return (
          <img
            key={node.id || index}
            src={src}
            alt={node.imageData?.alt || ""}
            width={node.imageData?.width}
            height={node.imageData?.height}
            className="my-6 rounded-lg max-w-full h-auto"
          />
        );
      }

      case "CODE_BLOCK": {
        const code = node.codeData?.text || "";
        const language = node.codeData?.language || "text";

        return (
          <div key={node.id || index} className="my-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className={`language-${language}`}>
                {code}
              </code>
            </pre>
          </div>
        );
      }

      case "BLOCKQUOTE": {
        const quote = node.quoteData?.text || "";
        const attribution = node.quoteData?.attribution;

        return (
          <blockquote key={node.id || index} className="my-6 pl-4 border-l-4 border-gray-300 italic">
            <p className="text-lg mb-2">{quote}</p>
            {attribution && (
              <footer className="text-sm text-gray-600">— {attribution}</footer>
            )}
          </blockquote>
        );
      }

      case "DIVIDER": {
        const style = node.dividerData?.style || "solid";
        const dividerStyles = {
          solid: "border-t border-gray-300",
          dashed: "border-t border-dashed border-gray-300",
          dotted: "border-t border-dotted border-gray-300"
        };

        return (
          <hr
            key={node.id || index}
            className={`my-6 ${dividerStyles[style as keyof typeof dividerStyles] || dividerStyles.solid}`}
          />
        );
      }

      case "TABLE": {
        const table = node.tableData?.table;

        if (!table?.rows?.length) return null;

        return (
          <div key={node.id || index} className="my-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-50" : ""}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 border border-gray-300 ${rowIndex === 0 ? "font-semibold" : ""}`}
                      >
                        {cell.content?.map((contentNode, contentIndex) =>
                          renderNode(contentNode, contentIndex, onVideoClick)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case "VIDEO": {
        const src = node.videoData?.src || "";
        const title = node.videoData?.title || "Video";

        if (!src) return null;

        return (
          <button
            key={node.id || index}
            type="button"
            onClick={() => onVideoClick?.(src)}
            className="my-6 block w-full max-w-full border-0 bg-transparent p-0 cursor-pointer group"
            title={`Play ${title}`}
          >
            <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
              <div className="rounded-full bg-white/90 p-4 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        );
      }

      case "AUDIO": {
        const src = node.audioData?.src || "";
        const title = node.audioData?.title || "Audio";

        if (!src) return null;

        return (
          <div key={node.id || index} className="my-6">
            <audio
              controls
              className="w-full"
              title={title}
            >
              <source src={src} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      }

      case "EMBED": {
        const embedUrl = node.embedData?.url || "";
        if (!embedUrl) return null;

        return (
          <button
            key={node.id || index}
            type="button"
            onClick={() => onVideoClick?.(embedUrl)}
            className="my-6 block w-full max-w-full border-0 bg-transparent p-0 cursor-pointer group"
            title="Play embedded video"
          >
            <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
              <div className="rounded-full bg-white/90 p-4 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        );
      }

      case "ORDERED_LIST": {
        return (
          <ol key={node.id || index} className="list-decimal list-inside my-4 space-y-2">
            {node.nodes?.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </ol>
        );
      }

      case "UNORDERED_LIST": {
        return (
          <ul key={node.id || index} className="list-disc list-inside my-4 space-y-2">
            {node.nodes?.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </ul>
        );
      }

      case "LIST_ITEM": {
        return (
          <li key={node.id || index} className="ml-4">
            {node.nodes?.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </li>
        );
      }

      case "SPACER": {
        return <div key={node.id || index} className="my-4" />;
      }

      default: {
        console.warn(`Unknown node type: ${node.type}`, node);
        return node.nodes ? (
          <div key={node.id || index}>
            {node.nodes.map((childNode, childIndex) =>
              renderNode(childNode, childIndex, onVideoClick)
            )}
          </div>
        ) : null;
      }
    }
  };

  if (!data || !data.nodes) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: Invalid content format</p>
      </div>
    );
  }

  return (
    <>
      <article
        ref={articleRef}
        className="prose prose-lg max-w-none"
        style={proseStyles}
      >
        {data.nodes.map((node: BlogNode, index: number) =>
          renderNode(node, index, openVideoPopup)
        )}
      </article>
      <VideoPopup videoUrl={popupVideo} onClose={() => setPopupVideo(null)} />
    </>
  );
}

export default WixBlogRenderer;
