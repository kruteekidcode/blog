@echo off
cd /d "%~dp0"
if exist ".git\index.lock" del /f ".git\index.lock"
echo ===== GIT ADD =====
git add -A
echo ===== GIT COMMIT =====
git commit -m "feat: Pink & Blue theme v2, Thai font, search, RSS, drafts, SEO improvements"
echo ===== GIT PUSH =====
git push origin main
echo ===== LATEST COMMITS =====
git log --oneline -3
echo ===== DONE =====
pause
