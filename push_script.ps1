$git = "C:\Program Files\Git\cmd\git.exe"

Write-Host "Configuring Git user..."
& $git config user.name "ZHANGYUEMIN"
& $git config user.email "user@example.com"

Write-Host "Initializing repository..."
& $git init
& $git branch -M main

Write-Host "Adding files..."
& $git add .

Write-Host "Committing..."
& $git commit -m "Initial commit: MBTI Personality Test Project"

Write-Host "Configuring remote..."
& $git remote remove origin 2>$null
& $git remote add origin https://github.com/ZHANGYUEMIN/MBTI.git

Write-Host "Pushing to GitHub..."
Write-Host "NOTE: A browser window or login prompt may appear. Please authenticate."
& $git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Push failed. Exit code: $LASTEXITCODE" -ForegroundColor Red
}
