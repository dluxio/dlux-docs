# DLUX dApp API Documentation

This document describes the API endpoints for accessing dApp content and ReMix data from the DLUX platform.

## Base URL
```
https://data.dlux.io
```

## Authentication
Some endpoints require admin authentication using headers:
- `x-account`: Account name (usually 'dlux-io')
- `x-challenge`: Challenge timestamp 
- `x-pubkey`: Public key
- `x-signature`: Signature

## Standard dApp Endpoints

### GET /new
Get newest dApp posts

**Parameters:**
- `a` (optional): Amount of posts to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)
- `b` (optional): Type bitmask for filtering (default: 255)

**Example:**
```bash
curl "https://data.dlux.io/new?a=10&o=0"
```

### GET /trending
Get trending dApp posts

**Parameters:**
- `a` (optional): Amount of posts to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)
- `b` (optional): Type bitmask for filtering (default: 255)

**Example:**
```bash
curl "https://data.dlux.io/trending?a=20"
```

### GET /promoted
Get promoted dApp posts

**Parameters:**
- `a` (optional): Amount of posts to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)
- `b` (optional): Type bitmask for filtering (default: 255)

**Example:**
```bash
curl "https://data.dlux.io/promoted"
```

## ReMix Content Endpoints

### GET /remix/new
Get newest ReMix content posts

**Parameters:**
- `a` (optional): Amount of posts to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)
- `license` (optional): Filter by specific license (e.g., "CC BY-SA 4.0")
- `tag` (optional): Filter by specific tag

**Example:**
```bash
curl "https://data.dlux.io/remix/new?a=10&license=CC%20BY-SA%204.0"
curl "https://data.dlux.io/remix/new?tag=music&a=5"
```

**Response:**
```json
{
   "result": [
      {
         "author": "username",
         "permlink": "post-permlink",
         "type": "dapp",
         "block": 96726251,
         "votes": 5,
         "voteweight": 100,
         "promote": 0,
         "paid": false,
         "remix_cid": "QmReMixCIDExample123456789",
         "license": "CC BY-SA 4.0",
         "tags": ["music", "remix", "creative"],
         "url": "/dlux/@username/post-permlink"
      }
   ],
   "filters": {
      "license": "CC BY-SA 4.0",
      "tag": null
   },
   "node": "dlux-io"
}
```

### GET /remix/trending
Get trending ReMix content posts

**Parameters:**
- `a` (optional): Amount of posts to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)
- `license` (optional): Filter by specific license
- `tag` (optional): Filter by specific tag

**Example:**
```bash
curl "https://data.dlux.io/remix/trending?tag=art"
```

### GET /remix/licenses
Get available licenses used in ReMix content

**Example:**
```bash
curl "https://data.dlux.io/remix/licenses"
```

**Response:**
```json
{
   "result": [
      {
         "license": "CC BY-SA 4.0",
         "count": "25"
      },
      {
         "license": "CC BY 4.0", 
         "count": "18"
      },
      {
         "license": "CC0",
         "count": "12"
      }
   ],
   "node": "dlux-io"
}
```

### GET /remix/tags
Get popular tags used in ReMix content

**Example:**
```bash
curl "https://data.dlux.io/remix/tags"
```

**Response:**
```json
{
   "result": [
      {
         "tag": "music",
         "count": "45"
      },
      {
         "tag": "art",
         "count": "32"
      },
      {
         "tag": "remix",
         "count": "28"
      }
   ],
   "node": "dlux-io"
}
```

## ReMix Applications Endpoints

ReMix applications are reusable tools/templates that multiple users can apply to their dApp content. When users apply the same ReMix CID, they create derivative works.

### GET /remix/apps/popular
Get most popular ReMix applications by usage count

**Parameters:**
- `a` (optional): Amount of applications to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)

**Example:**
```bash
curl "https://data.dlux.io/remix/apps/popular?a=10"
```

**Response:**
```json
{
   "result": [
      {
         "remix_cid": "QmPopularReMixApp123456789",
         "first_author": "creator-username",
         "first_permlink": "original-post",
         "first_seen_block": 96726250,
         "license": "CC BY-SA 4.0",
         "title": "Photo Gallery Template",
         "description": "A template for creating photo galleries",
         "usage_count": 45,
         "derivative_count": "45",
         "created_at": "2024-01-15T10:30:00Z",
         "updated_at": "2024-01-20T15:45:00Z"
      }
   ],
   "node": "dlux-io"
}
```

### GET /remix/apps/newest
Get newest ReMix applications

**Parameters:**
- `a` (optional): Amount of applications to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)

**Example:**
```bash
curl "https://data.dlux.io/remix/apps/newest"
```

### GET /remix/apps/stats
Get statistics about ReMix applications

**Example:**
```bash
curl "https://data.dlux.io/remix/apps/stats"
```

**Response:**
```json
{
   "result": {
      "totalApplications": 127,
      "totalDerivativeWorks": 543,
      "mostPopular": {
         "remix_cid": "QmMostPopularApp123456789",
         "usage_count": 67,
         "first_author": "popular-creator",
         "title": "Music Player Template"
      },
      "recentActivity": 23
   },
   "node": "dlux-io"
}
```

### GET /remix/apps/:remixCid
Get detailed information about a specific ReMix application and its derivative works

**Parameters:**
- `remixCid`: The IPFS CID of the ReMix application

**Example:**
```bash
curl "https://data.dlux.io/remix/apps/QmExampleReMixCID123456789"
```

**Response:**
```json
{
   "result": {
      "application": {
         "remix_cid": "QmExampleReMixCID123456789",
         "first_author": "original-creator",
         "first_permlink": "original-post",
         "first_seen_block": 96726250,
         "license": "CC BY-SA 4.0",
         "title": "Interactive Story Template",
         "description": "A template for creating interactive stories",
         "usage_count": 12,
         "derivative_count": "12",
         "created_at": "2024-01-10T08:00:00Z",
         "updated_at": "2024-01-18T12:30:00Z"
      },
      "derivatives": [
         {
            "author": "user1",
            "permlink": "my-story-1",
            "block": 96726251,
            "license": "CC BY-SA 4.0",
            "tags": ["story", "interactive", "fiction"],
            "votes": 15,
            "voteweight": 150,
            "url": "/dlux/@user1/my-story-1",
            "created_at": "2024-01-15T14:20:00Z"
         }
      ]
   },
   "node": "dlux-io"
}
```

### GET /remix/derivatives/@:author
Get derivative works created by a specific author

**Parameters:**
- `author`: Hive username
- `a` (optional): Amount of derivatives to return (1-100, default: 50)
- `o` (optional): Offset for pagination (default: 0)

**Example:**
```bash
curl "https://data.dlux.io/remix/derivatives/@username?a=10"
```

**Response:**
```json
{
   "result": [
      {
         "remix_cid": "QmReMixApp123456789",
         "author": "username",
         "permlink": "my-creation",
         "block": 96726251,
         "license": "CC BY 4.0",
         "tags": ["art", "gallery"],
         "app_title": "Photo Gallery Template",
         "app_license": "CC BY-SA 4.0",
         "votes": 8,
         "voteweight": 80,
         "url": "/dlux/@username/my-creation",
         "created_at": "2024-01-16T09:15:00Z"
      }
   ],
   "author": "username",
   "node": "dlux-io"
}
```

## Post Data Structure

All post endpoints return objects with the following structure:

```json
{
   "author": "hive-username",
   "permlink": "post-permlink",
   "type": "dapp|vr|other",
   "block": 96726251,
   "votes": 10,
   "voteweight": 1000,
   "promote": 0,
   "paid": false,
   "remix_cid": "QmIPFSCIDForReMixContent",
   "license": "CC BY-SA 4.0",
   "tags": ["tag1", "tag2", "tag3"],
   "nsfw": false,
   "sensitive": false,
   "hidden": false,
   "featured": false,
   "flagged": false,
   "url": "/dlux/@author/permlink"
}
```

## License Types

Common license types you may encounter:

- `CC0` - Public Domain
- `CC BY 4.0` - Attribution 4.0 International
- `CC BY-SA 4.0` - Attribution-ShareAlike 4.0 International  
- `CC BY-NC 4.0` - Attribution-NonCommercial 4.0 International
- `CC BY-NC-SA 4.0` - Attribution-NonCommercial-ShareAlike 4.0 International
- `CC BY-ND 4.0` - Attribution-NoDerivatives 4.0 International
- `CC BY-NC-ND 4.0` - Attribution-NonCommercial-NoDerivatives 4.0 International

## Error Responses

All endpoints may return error responses in the following format:

```json
{
   "error": "Error message describing what went wrong",
   "node": "dlux-io"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `403` - Forbidden (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API endpoints may be rate limited. Please be respectful with your usage and implement appropriate delays between requests.

## Blockchain Integration

The system automatically monitors the Hive blockchain for new dApp posts and ReMix content. Posts are detected when they contain:

- `dappCID` field in json_metadata (required for all dApp posts)
- `ReMix` field in json_metadata (optional, for ReMix content)
- `.lic` field in json_metadata (optional, for license information)
- `tags` array in json_metadata (optional, for categorization)

When posting to Hive, ensure your json_metadata includes these fields for proper indexing:

```json
{
   "dappCID": "QmYourDappContentCID",
   "ReMix": "QmYourReMixContentCID", 
   ".lic": "CC BY-SA 4.0",
   "tags": ["music", "art", "remix"],
   "dAppType": "media"
}
```

## ReMix Applications Concept

ReMix applications are reusable tools/templates that multiple users can apply to their dApp content. When users apply the same ReMix CID, they create derivative works.

### How it Works

1. **Original ReMix Application**: A developer creates a dApp post with a `ReMix` CID (e.g., a photo gallery template)
2. **Derivative Works**: Other users create posts using the same `ReMix` CID, applying the template to their own data
3. **Tracking**: The system automatically tracks:
   - The original application and its creator
   - All derivative works using that ReMix CID
   - Usage statistics and popularity metrics

### Example Scenario

```
1. Developer @alice creates a photo gallery template:
   - Post: @alice/photo-gallery-template
   - ReMix CID: QmPhotoGalleryTemplate123
   - This becomes the "ReMix Application"

2. Users create derivative works:
   - @bob/my-vacation-photos (uses QmPhotoGalleryTemplate123)
   - @carol/art-portfolio (uses QmPhotoGalleryTemplate123)
   - @dave/wedding-album (uses QmPhotoGalleryTemplate123)

3. System tracks:
   - ReMix Application: QmPhotoGalleryTemplate123 (3 derivative works)
   - Original creator: @alice
   - All derivative works and their creators
```

### Benefits

- **Discoverability**: Find popular and useful ReMix applications
- **Attribution**: Proper credit to original creators
- **Analytics**: Usage metrics for template popularity
- **Community**: See what others have built with the same tools
