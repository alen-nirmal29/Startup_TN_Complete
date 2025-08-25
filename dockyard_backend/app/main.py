from fastapi import FastAPI

from app.api import prompt

app = FastAPI()

app.include_router(prompt.router, prefix="/api")

