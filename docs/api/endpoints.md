# API

## HTTP Client

**File:** `app/api/client/httpsClient.js`

A single Axios instance is shared across all API modules.

```js
axios.create({
  baseURL: process.env.EXPO_PUBLIC_BE_API_BASE_URL + "/v1",
  timeout: 300000,   // 5 minutes
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})
```

The base URL is set via the `EXPO_PUBLIC_BE_API_BASE_URL` environment variable in `.env`.

---

## Events API

**File:** `app/api/events.api.js`

All endpoints are under `/v1/events`.

### `fetchEventsApi(query?)`

```
GET /v1/events{query}
```

`query` is an optional query string, e.g. `?status=pending,assigned,accepted`.

**Response shape (used by slice):**
```json
{
  "details": { "events": [...] },
  "statusCounts": { "pending": 3, "assigned": 1 }
}
```

---

### `createEventApi(payload)`

```
POST /v1/events
```

**Payload:**
```json
{
  "eventName": "string",
  "comments": "string",
  "eventType": "CONFERENCE | WORKSHOP | ...",
  "scheduledAt": "ISO 8601 string",
  "expectedAttendees": number,
  "assignedToUid": "string",
  "status": "pending",
  "venue": "string",
  "tenantUid": "string"
}
```

---

### `updateEventApi(payload)`

```
PATCH /v1/events/:eventUid
```

Payload is the same shape as create; `payload.eventUid` is used to build the URL.

---

### `assignEventApi(payload)`

```
PATCH /v1/events/:eventUid/assign
```

**Payload:**
```json
{
  "eventUid": "string",
  "assignedToUid": "string",
  "userName": "string"
}
```

---

### `deleteEventApi(eventUid, payload)`

```
DELETE /v1/events/:eventUid
```

Payload is sent as the request body (`{ data: payload }`).

---

## Users API

**File:** `app/api/users.api.js`

### `getManagersApi(queryParams)`

```
GET /v1/users/event-managers{queryParams}
```

Returns a list of users with the event-manager role.

**Response shape (used by slice):**
```json
{
  "details": [
    { "uid": "string", "firstName": "string", "lastName": "string" }
  ]
}
```

---

## Error Handling

All errors are caught in thunks via `rejectWithValue`. The error message is extracted from `error?.response?.data` or `error?.response?.data?.message`. Toast notifications surface user-facing error messages for create, update operations.
