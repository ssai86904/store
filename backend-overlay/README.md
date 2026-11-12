# Backend setup (Laravel API)

This folder holds only the code written for this project. Laravel's own framework files
(about 10,000 files in `vendor/`) are not stored in git; you generate them with Composer
and then copy this code on top.

## Requirements

- PHP 8.3 or newer, with the `sqlite3`/`pdo_sqlite` extension (enabled by default in most installs)
- [Composer](https://getcomposer.org/)

## Steps

Run these from the **repository root** (the folder that contains `frontend/` and `backend-overlay/`).

**1. Create a fresh Laravel app in `backend/`**

```bash
composer create-project laravel/laravel backend
```

**2. Enable API routing** (Laravel 11+ does not include `routes/api.php` by default)

```bash
cd backend
php artisan install:api
```

If it asks whether to run migrations, answer **yes**.

**3. Copy this project's files over the fresh app** (this replaces `routes/api.php` and `DatabaseSeeder.php`)

```bash
cd ..
# macOS / Linux / Git Bash
cp -r backend-overlay/. backend/

# Windows (Command Prompt)
xcopy backend-overlay backend /E /Y /I
```

**4. Create the tables and load the sample products**

```bash
cd backend
php artisan migrate --seed
```

**5. Start the API**

```bash
php artisan serve
```

The API is now at `http://localhost:8000/api/products`. Open it in a browser to check.

**6. (Optional) Run the tests**

```bash
php artisan test
```

## Afterwards

Once `backend/` works you can delete `backend-overlay/` (its files now live inside `backend/`).
The default database is a SQLite file, so no MySQL is needed. To use MySQL instead, change the
`DB_*` values in `backend/.env`.

## Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/api/products` | List products. Optional `?search=` and `?category=` |
| GET | `/api/products/{id}` | One product (404 if missing) |
| POST | `/api/products` | Create (validated, returns 201) |
| PUT/PATCH | `/api/products/{id}` | Update |
| DELETE | `/api/products/{id}` | Delete (returns 204) |

Try it with curl:

```bash
curl http://localhost:8000/api/products?search=rice
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"name":"Test Mug","price":199,"stock":10,"category":"Home"}'
```
