from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import httpx
import re
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def error_response(message: str, status: int):
    return JSONResponse(
        status_code=status,
        content={
            "error": {
                "message": message,
                "status": status
            }
        }
    )

class AppLogicError(Exception):
    def __init__(self, message: str):
        self.message = message

@app.exception_handler(AppLogicError)
def logic_error_handler(request, exc: AppLogicError):
    return error_response(exc.message, 400)

HF_API_KEY = os.getenv("HF_API_KEY")
if HF_API_KEY is None:
    print("警告: HF_API_KEY が設定されていません。")

HF_API_URL = "https://router.huggingface.co/v1/chat/completions"

class RequestData(BaseModel):
    theme: str
    number: float

async def call_huggingface(prompt: str):
    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": "google/gemma-2-2b-it",
        "messages": [
            { "role": "user", "content": prompt }
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(HF_API_URL, headers=headers, json=body)
    except Exception as e:
        raise AppLogicError(f"HuggingFace への通信に失敗しました: {str(e)}")

    print("HF RESP:", response.text)

    if response.status_code != 200:
        raise HTTPException(
            status_code=500,
            detail=f"HuggingFace API error: {response.text}"
        )

    return response.json()

@app.post("/generate")
async def generate_text(data: RequestData):
    prompt = (
        f"次の条件を厳守して出力してください。\n"
        "1. 出力は必ず日本語のみ。\n"
        "2. 記号 *, **, ★, ■ などの装飾は禁止。句読点以外の記号は使わない。\n"
        "3. 現実には存在しない、テーマ「{data.theme}」に関連した架空のビジネス用語を1つだけ生成する。\n"
        "4. リアリティの度合いは {data.number}（1は現実っぽい、0は非現実）。\n"
        "5. 出力形式は以下のみ。余分な文章は禁止。\n"
        "用語: <用語>\n"
        "説明: <説明>\n"
    )

    hf_res = await call_huggingface(prompt)
    text = hf_res["choices"][0]["message"]["content"]
    term_match = re.search(r"用語[:：]\s*\**\s*(.+)", text)
    description_match = re.search(r"説明[:：]\s*\**\s*(.+)", text)

    term = term_match.group(1).strip() if term_match else ""
    description = description_match.group(1).strip() if description_match else ""

    if not term_match or not description_match:
        raise AppLogicError("生成結果の解析に失敗しました。出力形式を確認してください。")

    return {
        "term": term,
        "description": description,
        "raw": text
    }




