from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class APIModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)


class RegisterRequest(APIModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(APIModel):
    email: EmailStr
    password: str


class DisputeCreate(APIModel):
    title: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=10, max_length=10000)
    category: str = Field(default="general", max_length=80)
    participant_emails: list[EmailStr] = Field(default_factory=list, max_length=20)


class DisputeUpdate(APIModel):
    status: Literal["open", "in_discussion", "resolved", "closed"] | None = None
    title: str | None = Field(default=None, min_length=3, max_length=200)
    description: str | None = Field(default=None, min_length=10, max_length=10000)


class MessageCreate(APIModel):
    body: str = Field(min_length=1, max_length=5000)


class AIAnalyzeRequest(APIModel):
    text: str = Field(min_length=1, max_length=15000)
    task: Literal["analyze", "summarize", "suggest_resolution"] = "analyze"
