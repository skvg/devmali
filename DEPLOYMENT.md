# Deployment Guide - Devmali Heritage Website

This guide explains how to deploy the Devmali Heritage Website to AWS S3 with CloudFront CDN using GitHub Actions.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **GitHub Repository** with the website code
3. **Domain Name** (optional, for custom domain)

## AWS Setup

### 1. Create S3 Bucket

```bash
# Replace 'your-bucket-name' with your actual bucket name
aws s3 mb s3://your-bucket-name --region us-east-1
```

### 2. Configure S3 Bucket for Static Website Hosting

```bash
# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document 404.html
```

### 3. Set S3 Bucket Policy

Create a bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

### 4. Create CloudFront Distribution (Recommended)

```bash
# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

Example CloudFront configuration (`cloudfront-config.json`):
```json
{
  "CallerReference": "devmali-heritage-website-$(date +%s)",
  "Comment": "Devmali Heritage Website CDN",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-bucket-name",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-your-bucket-name",
        "DomainName": "your-bucket-name.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

### 5. Create IAM User for GitHub Actions

Create an IAM user with the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

## GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

### Required Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS Region | `us-east-1` |
| `S3_BUCKET_NAME` | S3 Bucket Name | `devmali-heritage-website` |

### Optional Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront Distribution ID | `E1234567890123` |
| `CLOUDFRONT_DOMAIN` | Custom CloudFront Domain | `cdn.devmali.com` |

## Deployment Process

### Automatic Deployment

1. **Push to Production Branch**: Any push to the `production` branch triggers automatic deployment
2. **Manual Deployment**: Use GitHub Actions "Run workflow" button for manual deployment

### Manual Deployment

```bash
# Build the project locally
npm run build

# Deploy to S3 using AWS CLI
aws s3 sync out s3://your-bucket-name --delete

# Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Workflow Features

### ✅ What the Workflow Does

1. **Code Quality Checks**:
   - TypeScript type checking
   - ESLint code linting
   - Build verification

2. **Optimized Deployment**:
   - Different cache headers for different file types
   - HTML files: No cache (for dynamic updates)
   - CSS/JS files: Long cache (1 year for immutable assets)
   - Images/Assets: Medium cache (1 day)

3. **CloudFront Integration**:
   - Automatic cache invalidation
   - CDN distribution for global performance

4. **Deployment Summary**:
   - Success confirmation
   - Website URL display
   - Resource information

### 🔧 Customization Options

#### Custom Domain Setup

1. **Add CNAME Record**: Point your domain to CloudFront distribution
2. **SSL Certificate**: Use AWS Certificate Manager for HTTPS
3. **Update Secrets**: Add `CLOUDFRONT_DOMAIN` secret

#### Environment-Specific Deployments

Create separate workflows for different environments:
- `deploy-staging.yml` (triggers on `staging` branch)
- `deploy-production.yml` (triggers on `production` branch)

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check TypeScript errors: `npm run type-check`
   - Check linting errors: `npm run lint`
   - Verify dependencies: `npm ci`

2. **S3 Deployment Issues**:
   - Verify AWS credentials and permissions
   - Check S3 bucket policy
   - Ensure bucket exists and is accessible

3. **CloudFront Issues**:
   - Verify distribution ID is correct
   - Check CloudFront permissions
   - Wait for distribution deployment (can take 15-20 minutes)

### Debug Commands

```bash
# Test AWS credentials
aws sts get-caller-identity

# List S3 bucket contents
aws s3 ls s3://your-bucket-name --recursive

# Check CloudFront distribution status
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

## Performance Optimization

### Cache Strategy

- **HTML Files**: `max-age=0` (always check for updates)
- **CSS/JS Files**: `max-age=31536000` (1 year cache)
- **Images/Assets**: `max-age=86400` (1 day cache)

### CDN Benefits

- **Global Distribution**: Content served from edge locations
- **HTTPS**: Automatic SSL/TLS encryption
- **Compression**: Automatic gzip compression
- **Security**: DDoS protection and security headers

## Monitoring and Maintenance

### CloudWatch Metrics

Monitor the following metrics:
- S3 bucket requests and data transfer
- CloudFront cache hit ratio
- Error rates and response times

### Regular Maintenance

1. **Update Dependencies**: Keep npm packages updated
2. **Security Patches**: Apply security updates promptly
3. **Performance Monitoring**: Monitor Core Web Vitals
4. **Cost Optimization**: Review AWS usage and costs

## Support

For deployment issues or questions:
1. Check GitHub Actions logs for detailed error messages
2. Review AWS CloudWatch logs
3. Consult AWS documentation for S3 and CloudFront
4. Contact the development team for application-specific issues

---

**Last Updated**: December 2024
**Version**: 1.0.0