$ErrorActionPreference = "Stop"

function Start-Server {
    param ([int]$initialPort = 8000)
    $port = $initialPort
    $maxRetries = 100
    $root = Join-Path $PSScriptRoot "www"

    if (-not (Test-Path $root)) {
        throw "Directory 'www' not found! Please ensure this script is in the correct folder."
    }

    for ($i = 0; $i -lt $maxRetries; $i++) {
        $url = "http://localhost:$port/"
        $listener = New-Object System.Net.HttpListener
        try {
            $listener.Prefixes.Add($url)
            $listener.Start()
            Write-Host "SUCCESS: Server started at $url" -ForegroundColor Green
            Start-Process $url
            return $listener, $root
        } catch {
            if ($listener) { $listener.Close() }
            # Write-Warning "Port $port is busy, trying next..."
            $port++
        }
    }
    throw "Could not find an available port after $maxRetries attempts."
}

try {
    $listener, $root = Start-Server
} catch {
    Write-Error "Failed to start server: $_"
    Write-Host "Press Enter to exit..."
    Read-Host
    exit
}

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response
        
        # URL Decode and path normalization
        $urlPath = [System.Net.WebUtility]::UrlDecode($req.Url.LocalPath)
        if (-not $urlPath) { $urlPath = $req.Url.LocalPath }
        
        $path = Join-Path $root ($urlPath -replace '/', '\')

        # SPA Support: Fallback to index.html if file not found
        if (-not (Test-Path $path) -or (Test-Path $path -PathType Container)) {
            $path = Join-Path $root "index.html"
        }

        try {
            $content = [System.IO.File]::ReadAllBytes($path)
            $res.ContentLength64 = $content.Length
            $ext = [System.IO.Path]::GetExtension($path).ToLower()
            switch ($ext) {
                ".html" { $res.ContentType = "text/html; charset=utf-8" }
                ".js"   { $res.ContentType = "application/javascript" }
                ".css"  { $res.ContentType = "text/css" }
                ".json" { $res.ContentType = "application/json" }
                ".svg"  { $res.ContentType = "image/svg+xml" }
                ".png"  { $res.ContentType = "image/png" }
                ".jpg"  { $res.ContentType = "image/jpeg" }
                ".ico"  { $res.ContentType = "image/x-icon" }
                ".woff" { $res.ContentType = "font/woff" }
                ".woff2"{ $res.ContentType = "font/woff2" }
                ".ttf"  { $res.ContentType = "font/ttf" }
            }
            $res.OutputStream.Write($content, 0, $content.Length)
        } catch {
            $res.StatusCode = 404
        }
        $res.Close()
    }
} catch {
    Write-Error "Runtime error: $_"
} finally {
    if ($listener) { $listener.Close() }
}
