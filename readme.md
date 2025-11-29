poetry run uvicorn weather_app_api:app --reload --port 8000
poetry install
poetry run pytest -v
poetry add --group dev pytest pytest-asyncio httpx
npm test -- --watch=false
 ng serve