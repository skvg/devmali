@echo off
REM Devmali Heritage Website Deployment Script for Windows
REM This script helps with local deployment testing and manual deployment to AWS S3

setlocal enabledelayedexpansion

REM Configuration
if "%S3_BUCKET_NAME%"=="" set S3_BUCKET_NAME=
if "%AWS_REGION%"=="" set AWS_REGION=us-east-1
if "%CLOUDFRONT_DISTRIBUTION_ID%"=="" set CLOUDFRONT_DISTRIBUTION_ID=

REM Colors (limited support in Windows CMD)
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

goto :main

:print_header
echo %BLUE%================================%NC%
echo %BLUE%  Devmali Heritage Deployment  %NC%
echo %BLUE%================================%NC%
echo.
goto :eof

:print_step
echo %YELLOW%^>^> %~1%NC%
goto :eof

:print_success
echo %GREEN%✓ %~1%NC%
goto :eof

:print_error
echo %RED%✗ %~1%NC%
goto :eof

:check_requirements
call :print_step "Checking requirements..."

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    call :print_error "Node.js is not installed. Please install Node.js first."
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    call :print_error "npm is not installed. Please install npm first."
    exit /b 1
)

REM Check if AWS CLI is installed (for deployment)
if "%~1"=="deploy" (
    aws --version >nul 2>&1
    if errorlevel 1 (
        call :print_error "AWS CLI is not installed. Please install AWS CLI first."
        exit /b 1
    )
)

call :print_success "All requirements met"
goto :eof

:install_dependencies
call :print_step "Installing dependencies..."
npm ci
if errorlevel 1 (
    call :print_error "Failed to install dependencies"
    exit /b 1
)
call :print_success "Dependencies installed"
goto :eof

:run_quality_checks
call :print_step "Running quality checks..."

echo   - Type checking...
npm run type-check
if errorlevel 1 (
    call :print_error "Type checking failed"
    exit /b 1
)

echo   - Linting...
npm run lint
if errorlevel 1 (
    call :print_error "Linting failed"
    exit /b 1
)

call :print_success "Quality checks passed"
goto :eof

:build_project
call :print_step "Building project..."
npm run build
if errorlevel 1 (
    call :print_error "Build failed"
    exit /b 1
)
call :print_success "Project built successfully"
goto :eof

:deploy_to_s3
if "%S3_BUCKET_NAME%"=="" (
    call :print_error "S3_BUCKET_NAME environment variable is not set"
    echo Please set it using: set S3_BUCKET_NAME=your-bucket-name
    exit /b 1
)

call :print_step "Deploying to S3 bucket: %S3_BUCKET_NAME%"

REM Deploy HTML files with no-cache
echo   - Deploying HTML files...
aws s3 sync out s3://%S3_BUCKET_NAME% --exclude "*" --include "*.html" --delete --cache-control "public,max-age=0,must-revalidate" --region %AWS_REGION%
if errorlevel 1 (
    call :print_error "Failed to deploy HTML files"
    exit /b 1
)

REM Deploy CSS and JS files with long cache
echo   - Deploying CSS and JS files...
aws s3 sync out s3://%S3_BUCKET_NAME% --exclude "*.html" --include "*.css" --include "*.js" --include "*.json" --cache-control "public,max-age=31536000,immutable" --region %AWS_REGION%
if errorlevel 1 (
    call :print_error "Failed to deploy CSS and JS files"
    exit /b 1
)

REM Deploy other assets with medium cache
echo   - Deploying other assets...
aws s3 sync out s3://%S3_BUCKET_NAME% --exclude "*.html" --exclude "*.css" --exclude "*.js" --exclude "*.json" --cache-control "public,max-age=86400" --region %AWS_REGION%
if errorlevel 1 (
    call :print_error "Failed to deploy other assets"
    exit /b 1
)

call :print_success "Deployed to S3 successfully"
goto :eof

:invalidate_cloudfront
if not "%CLOUDFRONT_DISTRIBUTION_ID%"=="" (
    call :print_step "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_DISTRIBUTION_ID% --paths "/*" --region %AWS_REGION%
    if errorlevel 1 (
        call :print_error "Failed to invalidate CloudFront cache"
        exit /b 1
    )
    call :print_success "CloudFront cache invalidated"
) else (
    echo   - Skipping CloudFront invalidation (CLOUDFRONT_DISTRIBUTION_ID not set)
)
goto :eof

:show_deployment_info
echo.
echo %GREEN%🎉 Deployment completed successfully!%NC%
echo.
echo %BLUE%📊 Deployment Information:%NC%
echo   🌐 S3 Bucket: %S3_BUCKET_NAME%
echo   🌍 Region: %AWS_REGION%
echo   🔗 Website URL: https://%S3_BUCKET_NAME%.s3-website-%AWS_REGION%.amazonaws.com

if not "%CLOUDFRONT_DISTRIBUTION_ID%"=="" (
    echo   🚀 CloudFront Distribution: %CLOUDFRONT_DISTRIBUTION_ID%
)

echo.
echo %YELLOW%💡 Next Steps:%NC%
echo   1. Test the website URL above
echo   2. Check AWS Console for deployment status
echo   3. Monitor CloudWatch for any issues
echo.
goto :eof

:main
if "%~1"=="build" (
    call :print_header
    call :check_requirements
    if errorlevel 1 exit /b 1
    call :install_dependencies
    if errorlevel 1 exit /b 1
    call :run_quality_checks
    if errorlevel 1 exit /b 1
    call :build_project
    if errorlevel 1 exit /b 1
    call :print_success "Build completed successfully!"
    echo.
    echo Static files are ready in the 'out' directory
) else if "%~1"=="deploy" (
    call :print_header
    call :check_requirements "deploy"
    if errorlevel 1 exit /b 1
    call :install_dependencies
    if errorlevel 1 exit /b 1
    call :run_quality_checks
    if errorlevel 1 exit /b 1
    call :build_project
    if errorlevel 1 exit /b 1
    call :deploy_to_s3
    if errorlevel 1 exit /b 1
    call :invalidate_cloudfront
    if errorlevel 1 exit /b 1
    call :show_deployment_info
) else if "%~1"=="test" (
    call :print_header
    call :check_requirements
    if errorlevel 1 exit /b 1
    call :install_dependencies
    if errorlevel 1 exit /b 1
    call :run_quality_checks
    if errorlevel 1 exit /b 1
    call :print_success "All tests passed!"
) else (
    echo Devmali Heritage Website Deployment Script
    echo.
    echo Usage: %0 {build^|deploy^|test}
    echo.
    echo Commands:
    echo   build   - Install dependencies, run checks, and build the project
    echo   deploy  - Build and deploy to AWS S3 (requires AWS CLI and environment variables)
    echo   test    - Run quality checks (type checking and linting)
    echo.
    echo Environment Variables for deployment:
    echo   S3_BUCKET_NAME              - S3 bucket name (required)
    echo   AWS_REGION                  - AWS region (default: us-east-1)
    echo   CLOUDFRONT_DISTRIBUTION_ID  - CloudFront distribution ID (optional)
    echo.
    echo Example:
    echo   set S3_BUCKET_NAME=devmali-heritage-website
    echo   set AWS_REGION=us-east-1
    echo   set CLOUDFRONT_DISTRIBUTION_ID=E1234567890123
    echo   %0 deploy
    exit /b 1
)

endlocal