# Publish script for McMetSolArt.sitoWEB
# Usage: run from PowerShell in repo root: ./publish.ps1 -RepoName mcmetsolart-site
param(
    [string]$RepoName = "mcmetsolart-site",
    [string]$RemoteUrl = "",
    [switch]$CreateRemoteWithGH
    [switch]$FlattenBackend  # if set, remove nested .git in McMetSolArtBackend to integrate it into root repo
)

Write-Host "== McMetSolArt Publish Script =="

# 1. Basic checks
if (-not (Test-Path "./McMetSolArtBackend/app.py")) {
    Write-Error "Cannot find McMetSolArtBackend/app.py. Run this script from repo root."
    exit 1
}
if (-not (Test-Path "./index.html")) {
    Write-Warning "index.html not found in root. Ensure frontend files are present before publishing."
}

# 2. Initialize git if needed
if (-not (Test-Path .git)) {
    git init
    git branch -M main
    Write-Host "Initialized new git repo and created branch 'main'"
}

# 3. Optionally create GitHub repo using gh CLI
$hasGh = (& gh --version > $null 2>&1) -eq $true 2>$null
if ($CreateRemoteWithGH) {
    if (-not $hasGh) {
        Write-Warning "GitHub CLI 'gh' is not available. Install it or create the repo manually on GitHub."
    } else {
        Write-Host "Creating GitHub repo '$RepoName' (public) via gh..."
        gh repo create $RepoName --public --source=. --remote=origin --push
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "gh repo create failed. You can create the repo manually and set remote URL."
        } else {
            Write-Host "Repository created and pushed via gh. Remote 'origin' configured."
        }
    }
}

# 4. If user supplied RemoteUrl, set it
if ($RemoteUrl -ne "") {
    git remote remove origin -ErrorAction SilentlyContinue
    git remote add origin $RemoteUrl
    Write-Host "Set remote origin to $RemoteUrl"
}

# 5. Optionally flatten backend (remove nested .git) so backend is tracked by root repo
if ($FlattenBackend) {
    $backendGitPath = "./McMetSolArtBackend/.git"
    if (Test-Path $backendGitPath) {
        Write-Host "Flattening backend: removing nested git metadata at $backendGitPath"
        Remove-Item $backendGitPath -Recurse -Force
        Write-Host "Removed nested .git in McMetSolArtBackend. Backend will now be tracked by root repo."
    } else {
        Write-Host "No nested .git found in McMetSolArtBackend."
    }
}

# Stage, commit and push
git add .
if ((git status --porcelain) -ne "") {
    git commit -m "Prepare for Render: package backend, relative imports, SPA fallback, debug routes"
} else {
    Write-Host "No changes to commit"
}

# Ensure remote exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($remote)) {
    Write-Warning "Remote 'origin' not set. Please add remote with: git remote add origin https://github.com/USERNAME/$RepoName.git"
    Write-Host "After adding remote, run: git push -u origin main"
    exit 0
}

Write-Host "Pushing to origin main..."
git push -u origin main

Write-Host "\nDone. Next steps (Render):"
Write-Host "1) Create a new Web Service on https://render.com and connect your GitHub repo."
Write-Host "2) Use these values:"
Write-Host "   Build Command: pip install -r McMetSolArtBackend/requirements.txt"
Write-Host "   Start Command: gunicorn -w 2 -b 0.0.0.0:\$PORT McMetSolArtBackend.app:app"
Write-Host "   Static Publish Path: ./"
Write-Host "3) Add environment variables: DATABASE=/tmp/mc_metsolart.db, FLASK_DEBUG=False, EMAIL_ENABLED=False, PORT=8000, HOST=0.0.0.0"
Write-Host "4) After deploy, check: /debug, /debug/list and /api/health endpoints on the Render URL."

# optional quick checks (if public URL known user can curl)
Write-Host "\nIf you want, run these after deploy (replace <URL>):"
Write-Host "  curl https://<YOUR_RENDER_URL>/debug"
Write-Host "  curl https://<YOUR_RENDER_URL>/debug/list"
Write-Host "  curl https://<YOUR_RENDER_URL>/api/health"
