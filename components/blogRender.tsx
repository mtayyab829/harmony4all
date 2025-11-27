import React from "react";

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

function WixBlogRenderer({ content }: { content: string | BlogNode }) {
  // Check if content is HTML string
  const isHtmlContent = (content: string | BlogNode): boolean => {
    if (typeof content === "string") {
      // Check if it contains HTML tags
      const htmlRegex = /<[^>]*>/;
      return htmlRegex.test(content);
    }
    return false;
  };

  // If content is HTML, render with dangerouslySetInnerHTML
  if (isHtmlContent(content)) {
    const htmlContent = content as string;
    
    // Remove video and image tags from HTML content
    const cleanHtml = htmlContent
      .replace(/<img[^>]*>/gi, '') // Remove img tags
      .replace(/<video[^>]*>[\s\S]*?<\/video>/gi, '') // Remove video tags and content
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '') // Remove iframe tags and content
      .replace(/<embed[^>]*>/gi, '') // Remove embed tags
      .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '') // Remove object tags and content
      .replace(/<a[^>]*href="[^"]*(?:youtube\.com|youtu\.be|vimeo\.com|\.mp4|\.mov|\.avi|\.webm)[^"]*"[^>]*>.*?<\/a>/gi, '') // Remove video links
      .replace(/\s+/g, ' ') // Clean up extra whitespace
      .trim();

    // Add custom CSS for better paragraph spacing
    const htmlWithStyles = `
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
      </style>
      ${cleanHtml}
    `;

    return (
      <article 
        className="prose prose-lg max-w-none"
        style={{
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
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: htmlWithStyles }}
      />
    );
  }

  // Parse node-based content
  const data = typeof content === "string" ? JSON.parse(content) : content;

  const renderNode = (node: BlogNode, index: number) => {
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
              renderNode(childNode, childIndex)
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
              renderNode(childNode, childIndex)
            )}
          </Tag>
        );
      }

      case "TEXT": {
        let text = node.textData?.text || "";
        let el: React.ReactNode = text;

        // Apply decorations in order
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
              case "LINK":
                const url = dec.data?.link?.url || "";
                // Check if it's a YouTube or video link
                const isVideoLink = url.includes('youtube.com') || 
                                  url.includes('youtu.be') || 
                                  url.includes('vimeo.com') || 
                                  url.includes('.mp4') || 
                                  url.includes('.mov') || 
                                  url.includes('.avi') || 
                                  url.includes('.webm');
                
                if (isVideoLink) {
                  // Skip video links, just show the text without link
                  el = <span key={key}>{el}</span>;
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
              case "CODE":
                el = <code key={key} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{el}</code>;
                break;
            }
          });
        }
        
        return el;
      }

      case "IMAGE": {
        // Skip rendering images
        return null;
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
                          renderNode(contentNode, contentIndex)
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
        // Skip rendering videos
        return null;
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
        // Skip rendering embeds
        return null;
      }

      case "ORDERED_LIST": {
        return (
          <ol key={node.id || index} className="list-decimal list-inside my-4 space-y-2">
            {node.nodes?.map((childNode, childIndex) => 
              renderNode(childNode, childIndex)
            )}
          </ol>
        );
      }

      case "UNORDERED_LIST": {
        return (
          <ul key={node.id || index} className="list-disc list-inside my-4 space-y-2">
            {node.nodes?.map((childNode, childIndex) => 
              renderNode(childNode, childIndex)
            )}
          </ul>
        );
      }

      case "LIST_ITEM": {
        return (
          <li key={node.id || index} className="ml-4">
            {node.nodes?.map((childNode, childIndex) => 
              renderNode(childNode, childIndex)
            )}
          </li>
        );
      }

      case "SPACER": {
        return <div key={node.id || index} className="my-4" />;
      }

      default: {
        // Handle unknown node types gracefully
        console.warn(`Unknown node type: ${node.type}`, node);
        return node.nodes ? (
          <div key={node.id || index}>
            {node.nodes.map((childNode, childIndex) => 
              renderNode(childNode, childIndex)
            )}
          </div>
        ) : null;
      }
    }
  };

  // Error boundary for JSON parsing
  if (!data || !data.nodes) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: Invalid content format</p>
      </div>
    );
  }

  return (
    <article 
      className="prose prose-lg max-w-none"
      style={{
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
      } as React.CSSProperties}
    >
      {data.nodes.map((node: BlogNode, index: number) => 
        renderNode(node, index)
      )}
    </article>
  );
}

export default WixBlogRenderer;
