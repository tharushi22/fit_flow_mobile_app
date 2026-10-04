Add-Type -AssemblyName System.Drawing

$srcPath = "d:\FitFlow\assets\images\raw-logo.jpg"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# 1. Full icon.png (1024x1024 with white background)
$icon = New-Object System.Drawing.Bitmap 1024, 1024, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($icon)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::White)
$g.DrawImage($src, 0, 0, 1024, 1024)
$g.Dispose()
$icon.Save("d:\FitFlow\assets\images\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon.Dispose()
Write-Host "Created icon.png (1024x1024)"

# 2. Cutout with transparent background
# First, create transparent version of the raw 1024x1024 logo
$transparentLogo = New-Object System.Drawing.Bitmap 1024, 1024, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$rect = New-Object System.Drawing.Rectangle 0, 0, 1024, 1024

$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $transparentLogo.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = 1024 * 1024 * 4
$srcBuffer = New-Object byte[] $bytes
$dstBuffer = New-Object byte[] $bytes

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBuffer, 0, $bytes)

for ($i = 0; $i -lt $bytes; $i += 4) {
    $b = [int]$srcBuffer[$i]
    $gVal = [int]$srcBuffer[$i + 1]
    $r = [int]$srcBuffer[$i + 2]
    
    # Calculate brightness (0 to 255)
    $lum = [math]::Round(0.299 * $r + 0.587 * $gVal + 0.114 * $b)
    
    if ($lum -ge 248) {
        # Transparent
        $dstBuffer[$i] = 0
        $dstBuffer[$i + 1] = 0
        $dstBuffer[$i + 2] = 0
        $dstBuffer[$i + 3] = 0
    } elseif ($lum -le 120) {
        # Fully opaque logo color
        $dstBuffer[$i] = [byte]$b
        $dstBuffer[$i + 1] = [byte]$gVal
        $dstBuffer[$i + 2] = [byte]$r
        $dstBuffer[$i + 3] = 255
    } else {
        # Smooth anti-aliased edge
        $alphaRatio = (248.0 - $lum) / (248.0 - 120.0)
        $alpha = [byte][math]::Round($alphaRatio * 255)
        $dstBuffer[$i] = [byte]$b
        $dstBuffer[$i + 1] = [byte]$gVal
        $dstBuffer[$i + 2] = [byte]$r
        $dstBuffer[$i + 3] = $alpha
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($dstBuffer, 0, $dstData.Scan0, $bytes)
$src.UnlockBits($srcData)
$transparentLogo.UnlockBits($dstData)

# Save logo.png (transparent background)
$transparentLogo.Save("d:\FitFlow\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created logo.png with transparent background"

# 3. android-icon-foreground.png (1024x1024 with logo centered at 68% scale for adaptive icon safe zone)
$adaptiveForeground = New-Object System.Drawing.Bitmap 1024, 1024, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gAdaptive = [System.Drawing.Graphics]::FromImage($adaptiveForeground)
$gAdaptive.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gAdaptive.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gAdaptive.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gAdaptive.Clear([System.Drawing.Color]::Transparent)

# Scale down to 680x680 and center in 1024x1024 (offset 172, 172)
$targetSize = 680
$offset = [math]::Round((1024 - $targetSize) / 2)
$gAdaptive.DrawImage($transparentLogo, $offset, $offset, $targetSize, $targetSize)
$gAdaptive.Dispose()

$adaptiveForeground.Save("d:\FitFlow\assets\images\android-icon-foreground.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created android-icon-foreground.png (centered, adaptive safe zone)"

# 4. android-icon-monochrome.png (for Android 13+ Material You themed icons)
$monoBmp = New-Object System.Drawing.Bitmap 1024, 1024, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$monoData = $monoBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$foreData = $adaptiveForeground.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$foreBuffer = New-Object byte[] $bytes
$monoBuffer = New-Object byte[] $bytes

[System.Runtime.InteropServices.Marshal]::Copy($foreData.Scan0, $foreBuffer, 0, $bytes)

for ($i = 0; $i -lt $bytes; $i += 4) {
    $alpha = $foreBuffer[$i + 3]
    # Monochrome requires white with alpha
    $monoBuffer[$i] = 255
    $monoBuffer[$i + 1] = 255
    $monoBuffer[$i + 2] = 255
    $monoBuffer[$i + 3] = $alpha
}

[System.Runtime.InteropServices.Marshal]::Copy($monoBuffer, 0, $monoData.Scan0, $bytes)
$adaptiveForeground.UnlockBits($foreData)
$monoBmp.UnlockBits($monoData)

$monoBmp.Save("d:\FitFlow\assets\images\android-icon-monochrome.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created android-icon-monochrome.png"

$monoBmp.Dispose()
$adaptiveForeground.Dispose()
$transparentLogo.Dispose()
$src.Dispose()

# Remove raw-logo.jpg
Remove-Item "d:\FitFlow\assets\images\raw-logo.jpg" -Force -ErrorAction SilentlyContinue

# Remove unused tabIcons folder
if (Test-Path "d:\FitFlow\assets\images\tabIcons") {
    Remove-Item "d:\FitFlow\assets\images\tabIcons" -Recurse -Force
    Write-Host "Removed unused tabIcons directory."
}
