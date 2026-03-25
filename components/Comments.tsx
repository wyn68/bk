import React, { useEffect, useRef, useState } from 'react';

interface CommentsProps {
  theme: 'light' | 'dark';
  postId?: string;
}

export const Comments: React.FC<CommentsProps> = ({ theme, postId }) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const [currentIdentifier, setCurrentIdentifier] = useState(postId || window.location.hash);

  useEffect(() => {
    setCurrentIdentifier(postId || window.location.hash);
  }, [postId]);

  useEffect(() => {
    if (!commentsRef.current) return;

    // 清除旧的 script，防止重复加载
    commentsRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "wyn68/bk");
    script.setAttribute("data-repo-id", "R_kgDOQvKQHQ");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOQvKQHC4C0RkX");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [currentIdentifier]); // 当标识符变化时重新加载评论

  return (
    <div className="mt-12 w-full animate-fade-in">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            💬 评论区
        </h3>
        <div className="bg-glass backdrop-blur-md border border-glassBorder rounded-3xl p-4 md:p-8 min-h-[200px]">
             {/* 如果未配置，显示提示 */}
            <div ref={commentsRef} className="w-full" />
            <p className="text-xs text-center text-slate-400 mt-4">
                Powered by Giscus
            </p>
        </div>
    </div>
  );
};