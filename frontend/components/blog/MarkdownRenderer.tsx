"use client";

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const renderMarkdown = (markdown: string) => {
    // Convert markdown to HTML with Bootstrap styling
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="h4 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="h3 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="h2 mb-5">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Lists
      .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/g, '<ul class="list-unstyled mb-4">$1</ul>')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')
      
      // Line breaks
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags
    html = `<p class="mb-4">${html}</p>`;
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\/p>/g, '');
    
    return html;
  };

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;
