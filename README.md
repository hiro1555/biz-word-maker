プロジェクト概要

本プロジェクトは、React (Create React App) と FastAPI (Python 3.12) を用いて構築したユーザー入力をもとに架空のビジネス用語を自動生成するwebアプリケーションです。フロントエンドはユーザー入力を受け取り、バックエンドへ JSON を送信します。バックエンドでは HuggingFace API を利用してモデルへの問い合わせを行い、その結果をフロントに返します。

使用技術

Frontend

- React（Create React App）

- JavaScript（JSX）

- TanStack Query

Backend

- FastAPI

- Python 3.12

- HuggingFace Inference API

- Uvicorn

フォルダ構成
```
project/
│
├─ frontend/       # React アプリケーション（Create React App）
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  └─ ...
│
├─ backend/        # FastAPI アプリケーション
│  ├─ main.py
│  ├─ venv/     # 仮想環境（Git には含めない）
│  └─ ...
│
└─ README.md
```

セットアップ
Backend（FastAPI）
1. 仮想環境の作成
```
python -m venv venv
```
2. 仮想環境の有効化

Windows:
```
venv\Scripts\activate
```
Mac/Linux:
```
source venv/bin/activate
```
3. 依存関係のインストール
```
pip install fastapi uvicorn requests
```
4. 開発サーバー起動
```
uvicorn main:app --reload
```
Frontend（React）
1. 依存関係インストール
```
npm install
```
2. 開発サーバー起動
```
npm start
```
API フロー

1. フロントエンドから JSON を FastAPI へ送信

2. FastAPI が HuggingFace API にリクエストを送信

3. モデルから返ってきたレスポンスをフロントに返却

環境変数

HuggingFace API キーは以下のように .env ファイルで管理します。（Git には含めません）
```
HF_API_KEY=xxxxxxxxxxxxxxxx
```