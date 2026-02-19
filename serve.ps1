$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Serving on http://localhost:$port"
Write-Host "Press Ctrl+C to stop the server."

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Local paths in Windows use backslashes
        $localPath = $urlPath.Replace('/', '\').TrimStart('\')
        $filePath = Join-Path (Get-Location) $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath)
            $contentType = switch ($extension) {
                ".html" { "text/html" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".webp" { "image/webp" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $contentType
            $content = [IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $response.StatusDescription = "Not Found"
        }
    } catch {
        Write-Host "Error handling request: $_"
    } finally {
        if ($null -ne $response) { $response.Close() }
    }
}
