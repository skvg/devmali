#!/bin/bash

# Devmali Heritage Website Deployment Script
# This script helps with local deployment testing and manual deployment to AWS S3

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME=${S3_BUCKET_NAME:-""}
AWS_REGION=${AWS_REGION:-"us-east-1"}
CLOUDFRONT_DISTRIBUTION_ID=${CLOUDFRONT_DISTRIBUTION_ID:-""}

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Devmali Heritage Deployment  ${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

print_step() {
    echo -e "${YELLOW}➤ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

check_requirements() {
    print_step "Checking requirements..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check if AWS CLI is installed (for deployment)
    if [ "$1" = "deploy" ] && ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI first."
        exit 1
    fi
    
    print_success "All requirements met"
}

install_dependencies() {
    print_step "Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
}

run_quality_checks() {
    print_step "Running quality checks..."
    
    # Type checking
    echo "  - Type checking..."
    npm run type-check
    
    # Linting
    echo "  - Linting..."
    npm run lint
    
    print_success "Quality checks passed"
}

build_project() {
    print_step "Building project..."
    npm run build
    print_success "Project built successfully"
}

deploy_to_s3() {
    if [ -z "$BUCKET_NAME" ]; then
        print_error "S3_BUCKET_NAME environment variable is not set"
        echo "Please set it using: export S3_BUCKET_NAME=your-bucket-name"
        exit 1
    fi
    
    print_step "Deploying to S3 bucket: $BUCKET_NAME"
    
    # Deploy HTML files with no-cache
    echo "  - Deploying HTML files..."
    aws s3 sync out s3://$BUCKET_NAME \
        --exclude "*" \
        --include "*.html" \
        --delete \
        --cache-control "public,max-age=0,must-revalidate" \
        --region $AWS_REGION
    
    # Deploy CSS and JS files with long cache
    echo "  - Deploying CSS and JS files..."
    aws s3 sync out s3://$BUCKET_NAME \
        --exclude "*.html" \
        --include "*.css" \
        --include "*.js" \
        --include "*.json" \
        --cache-control "public,max-age=31536000,immutable" \
        --region $AWS_REGION
    
    # Deploy other assets with medium cache
    echo "  - Deploying other assets..."
    aws s3 sync out s3://$BUCKET_NAME \
        --exclude "*.html" \
        --exclude "*.css" \
        --exclude "*.js" \
        --exclude "*.json" \
        --cache-control "public,max-age=86400" \
        --region $AWS_REGION
    
    print_success "Deployed to S3 successfully"
}

invalidate_cloudfront() {
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        print_step "Invalidating CloudFront cache..."
        aws cloudfront create-invalidation \
            --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
            --paths "/*" \
            --region $AWS_REGION
        print_success "CloudFront cache invalidated"
    else
        echo "  - Skipping CloudFront invalidation (CLOUDFRONT_DISTRIBUTION_ID not set)"
    fi
}

show_deployment_info() {
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📊 Deployment Information:${NC}"
    echo "  🌐 S3 Bucket: $BUCKET_NAME"
    echo "  🌍 Region: $AWS_REGION"
    echo "  🔗 Website URL: https://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"
    
    if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        echo "  🚀 CloudFront Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
    fi
    
    echo ""
    echo -e "${YELLOW}💡 Next Steps:${NC}"
    echo "  1. Test the website URL above"
    echo "  2. Check AWS Console for deployment status"
    echo "  3. Monitor CloudWatch for any issues"
    echo ""
}

# Main script logic
case "$1" in
    "build")
        print_header
        check_requirements
        install_dependencies
        run_quality_checks
        build_project
        print_success "Build completed successfully!"
        echo ""
        echo "Static files are ready in the 'out' directory"
        ;;
    
    "deploy")
        print_header
        check_requirements "deploy"
        install_dependencies
        run_quality_checks
        build_project
        deploy_to_s3
        invalidate_cloudfront
        show_deployment_info
        ;;
    
    "test")
        print_header
        check_requirements
        install_dependencies
        run_quality_checks
        print_success "All tests passed!"
        ;;
    
    *)
        echo "Devmali Heritage Website Deployment Script"
        echo ""
        echo "Usage: $0 {build|deploy|test}"
        echo ""
        echo "Commands:"
        echo "  build   - Install dependencies, run checks, and build the project"
        echo "  deploy  - Build and deploy to AWS S3 (requires AWS CLI and environment variables)"
        echo "  test    - Run quality checks (type checking and linting)"
        echo ""
        echo "Environment Variables for deployment:"
        echo "  S3_BUCKET_NAME              - S3 bucket name (required)"
        echo "  AWS_REGION                  - AWS region (default: us-east-1)"
        echo "  CLOUDFRONT_DISTRIBUTION_ID  - CloudFront distribution ID (optional)"
        echo ""
        echo "Example:"
        echo "  export S3_BUCKET_NAME=devmali-heritage-website"
        echo "  export AWS_REGION=us-east-1"
        echo "  export CLOUDFRONT_DISTRIBUTION_ID=E1234567890123"
        echo "  $0 deploy"
        exit 1
        ;;
esac