@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ===== Git Add =====
git add -A
echo ===== Git Commit =====
git commit -m "feat: Pink & Blue theme v2, Thai font, search, RSS, drafts, SEO improvements" -m "- Theme v2: bold pink/blue hero and footer, light readable content zones (WCAG AA)" -m "- Hero: larger avatar (360px) grouped closer to welcome text" -m "- Thai font Noto Sans Thai Looped via next/font, remove render-blocking @import" -m "- Enable rehype-highlight syntax colors, JSON-LD Article schema, OG images" -m "- Replace img with next/image, add RSS feed, draft system, blog search and tag filter" -m "- Related posts by shared tags, course badges, Thai 404, date validation, new:post script" -m "- Update README and WRITING_GUIDE documentation"
echo ===== Git Push =====
git push origin main
echo.
echo ===== เสร็จแล้ว! ตรวจผลด้านบน ถ้ามี error จะแสดงไว้ =====
pause
