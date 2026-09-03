from typing import Literal
from pydantic import BaseModel,EmailStr,Field
class LoginRequest(BaseModel): email:EmailStr;password:str
class RegisterRequest(BaseModel): name:str=Field(min_length=2,max_length=100);email:EmailStr;password:str=Field(min_length=8);role:Literal['admin','officer','verifier','operator','viewer']='operator'
class VerificationDecision(BaseModel): decision:Literal['approve','reject'];fields:dict[str,dict]=Field(default_factory=dict);reason:str=Field(min_length=2,max_length=500)
