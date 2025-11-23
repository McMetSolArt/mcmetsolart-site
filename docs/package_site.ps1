# package_site.ps1
# Creează folderul `mc_sito_web` și copiază fișierele esențiale pentru publicare

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$dest = Join-Path $root 'mc_sito_web'

# Preserve paths to any templates/README that may live in repo before we remove/create the dest folder
$configTemplate = Join-Path $root 'mc_sito_web\config.js.template'
$readmeSource = Join-Path $root 'mc_sito_web\README.md'

Write-Host "Building package in: $dest"

if (Test-Path $dest) {
    Write-Host "Removing existing package folder..."
    Remove-Item -Recurse -Force $dest
}

# Recreate structure
New-Item -ItemType Directory -Path $dest | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest 'css') | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest 'js') | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest 'images') | Out-Null
New-Item -ItemType Directory -Path (Join-Path $dest 'backend') | Out-Null

# Files to copy
$filesToCopy = @(
    'index.html'
)

$cssSrc = Join-Path $root 'css'
$jsSrc = Join-Path $root 'js'
$imagesSrc = Join-Path $root 'images'
$backendSrc = Join-Path $root 'McMetSolArtBackend'

# Copy listed files
foreach ($f in $filesToCopy) {
    $src = Join-Path $root $f
    if (Test-Path $src) {
        Copy-Item $src -Destination $dest
        Write-Host "Copied $f"
    } else {
        Write-Warning "Missing: $src"
    }
}

# Copy directories if exist
if (Test-Path $cssSrc) {
    Copy-Item $cssSrc\* -Destination (Join-Path $dest 'css') -Recurse
    Write-Host "Copied css/"
} else { Write-Warning "css/ not found" }

if (Test-Path $jsSrc) {
    # Copy only selected JS files (adjust list if needed)
    $jsFiles = @(
        'api-client.js', 'api-client-extended.js', 'script.js', 'device-detection.js', 'window-controller.js',
        'translations-global-complete.js', 'translations-assistant.js', 'translations-modals.js', 'translations-account-panel.js', 'translations-account-extended.js',
        'hamburger-menu.js', 'page-transitions.js', 'footer-modals.js', 'assistant-professional.js', 'auth-professional.js', 'account-panel.js', 'session-manager.js'
    )
    foreach ($jf in $jsFiles) {
        $s = Join-Path $jsSrc $jf
        if (Test-Path $s) { Copy-Item $s -Destination (Join-Path $dest 'js') }
        else { Write-Warning "JS missing: $jf" }
    }
    Write-Host "Copied selected js/ files"
} else { Write-Warning "js/ not found" }

if (Test-Path $imagesSrc) {
    Copy-Item $imagesSrc\* -Destination (Join-Path $dest 'images') -Recurse
    Write-Host "Copied images/"
} else { Write-Warning "images/ not found" }

# Backend files to copy
$backendFiles = @('app.py','migrate_add_api_token.py','requirements.txt','.env.example','DEPLOYMENT.md','test_api.py')
foreach ($bf in $backendFiles) {
    $s = Join-Path $backendSrc $bf
    if (Test-Path $s) { Copy-Item $s -Destination (Join-Path $dest 'backend') }
    else { Write-Warning "Backend missing: $bf" }
}

# Copy config template (if it existed in repo)
if ($configTemplate -and (Test-Path $configTemplate)) { Copy-Item $configTemplate -Destination $dest }

# Copy README for package
if ($readmeSource -and (Test-Path $readmeSource)) { Copy-Item $readmeSource -Destination $dest }

Write-Host "Package build finished. Check $dest"
