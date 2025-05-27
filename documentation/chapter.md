# Chapter Controller Documentation

---

## 1. createChapter

**Description:**  
Creates a new chapter and saves it in the database.

**Request Body:**

| Field            | Type     | Description                                       |
|------------------|----------|-------------------------------------------------|
| position         | Number   | Position of the chapter (sequence number)        |
| chapter_name     | String   | Name of the chapter                              |
| contents         | Mixed    | Content of the chapter (text or file data)      |
| sub_categorie_id | ObjectId | ID of the sub-category this chapter belongs to  |
| type             | String   | Type of chapter (`free` or `paid`)               |
| fileType         | String   | Content type (`editor` or `file`)                |

**Process:**  
- Validates all required fields.  
- Generates a unique slug from `chapter_name`.  
- Checks if a chapter with the same name exists.  
- Saves new chapter to database with content stored in `contents` or `solutionTable` depending on `fileType`.

**Response:**

- Success:  
  - Status: `201 Created`  
  - Message: `"Chapter Created Successfully"`

- Failure:  
  - Status: `400 Bad Request` (if missing fields or chapter exists)  
  - Error message describing the issue.

---

## 2. getAllChapters

**Description:**  
Fetches all chapters without their content or file data (metadata only).

**Request Parameters:**  
None.

**Process:**  
- Retrieves all chapters from database.  
- Excludes `contents` and `solutionTable` fields.

**Response:**

- Success:  
  - Status: `200 OK`  
  - Body: Array of chapters with metadata.

---

## 3. getChapterByIdentifier

**Description:**  
Fetches detailed information of a chapter by its unique slug (`identifier`).

**Request Parameters:**

| Parameter      | Type   | Description                  |
|----------------|--------|------------------------------|
| subIdentifier  | String | Slug/identifier of the chapter |

**Process:**  
- Finds chapter by slug.  
- If chapter type is `free` or no type set, returns full data.  
- If chapter is `paid`, checks user authentication and subscription status:  
  - Returns `401 Unauthorized` if user not logged in.  
  - Returns `403 Forbidden` if subscription expired.  
- Returns chapter details if access is granted.

**Response:**

- Success:  
  - Status: `200 OK`  
  - Body: Chapter details including content.

- Failure:  
  - Status: `404 Not Found` if chapter not found  
  - Status: `401 Unauthorized` if user not logged in (for paid chapters)  
  - Status: `403 Forbidden` if subscription expired

---

## 4. getChaptersBySubCategoryIdentifier

**Description:**  
Fetches all chapters under a given sub-category by sub-category slug.

**Request Parameters:**

| Parameter        | Type   | Description                     |
|------------------|--------|---------------------------------|
| chapterIdentifier| String | Slug/identifier of the sub-category |

**Process:**  
- Finds sub-category by slug.  
- Fetches all chapters linked to the sub-category.  
- Returns metadata only (excludes content and file data).

**Response:**

- Success:  
  - Status: `200 OK`  
  - Body: Array of chapters metadata.

- Failure:  
  - Status: `404 Not Found` if sub-category not found.

---

## 5. updateChapter

**Description:**  
Updates a chapter’s details by its ID.

**Request Parameters:**

| Parameter        | Type   | Description                   |
|------------------|--------|-------------------------------|
| chapterIdentifier| String | ID of the chapter to update    |

**Request Body:**  
Fields to update (same as createChapter).

**Process:**  
- Finds chapter by ID.  
- Updates fields including regenerated slug from `chapter_name`.  
- Saves updated chapter.

**Response:**

- Success:  
  - Status: `200 OK`  
  - Message: `"Chapter Updated Successfully"`

- Failure:  
  - Status: `404 Not Found` if chapter not found.

---

## 6. deleteChapter

**Description:**  
Deletes a chapter by its ID.

**Request Parameters:**

| Parameter        | Type   | Description               |
|------------------|--------|---------------------------|
| chapterIdentifier| String | ID of the chapter to delete |

**Process:**  
- Finds and deletes chapter by ID.

**Response:**

- Success:  
  - Status: `200 OK`  
  - Message: `"Chapter Deleted Successfully"`

- Failure:  
  - Status: `404 Not Found` if chapter not found.

---

## Notes

- `identifier` refers to a unique slug generated from `chapter_name`.  
- `fileType` defines where content is stored:  
  - `"editor"` => `contents` field  
  - `"file"` => `solutionTable` field  
- Paid chapters require user authentication and active subscription checked by `checkAndUpdatePurchasePlanStatus`.

---

If you want, I can also help generate example requests and responses for each endpoint. Just let me know!
