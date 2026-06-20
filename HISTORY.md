# AstraNexus 開発作業履歴 (HISTORY.md)

本プロジェクト（AstraNexus コーポレートサイト）において、AIエージェント（Antigravity等）がこれまでに実施した開発作業の履歴を管理するドキュメントです。

## 開発作業履歴

### 1. グローバルブランド名への変更 & ロゴの刷新
* **依頼内容**: 世界で通用し、かつ「A」から始まる会社名への変更。
* **対応内容**:
  * ユーザー選択により新社名を **「AstraNexus（アストラ・ネクサス）」** に決定。
  * [index.html](file:///home/devstaff/workspace/co/index.html) 内のタイトル、ディスクリプション、ドメイン、著作権表示などをすべて更新。
  * パッケージ名（[package.json](file:///home/devstaff/workspace/co/package.json), [package-lock.json](file:///home/devstaff/workspace/co/package-lock.json)）を `astranexus-corporate` に変更。
  * ヘッダーおよびフッターのロゴマーク（SVG）の描画パスを、従来の「N/M」形状から美しい**「A」の幾何学形状**（`d="M9 23L16 9L23 23M12 17H20"`）へ変更。

### 2. 免責事項（AI生成・架空企業）の追加
* **依頼内容**: AI生成サイトであること、および架空の会社であることを記載。
* **対応内容**:
  * フッター最下部の著作権表示直下に、以下の注記を追加。
    > ※このウェブサイトはAIによって自動生成されたデモサイトであり、掲載されている「AstraNexus」は架空の企業です。実在する団体・人物等とは一切関係ありません。

### 3. 会社概要の空欄化
* **依頼内容**: 代表取締役CEO、住所の空欄化。
* **対応内容**:
  * 会社概要テーブル内の「代表取締役 CEO」と「所在地」の値を空欄に変更。

### 4. お問い合わせセクションの非表示化（コメントアウト）
* **依頼内容**: お問い合わせ関連部分のコメントアウト。
* **対応内容**:
  * ヘッダーの「Contact Us」リンクをコメントアウト。
  * ヒーローセクションの「プロジェクトを始める」ボタンをコメントアウト。
  * お問い合わせフォームおよびマップ情報を含む `<section id="contact">` 全体をコメントアウト（入れ子コメントによる構文エラーを防ぐため、セクション内部 of 古いコメントはあらかじめ削除）。

### 5. SEO / アクセシビリティ対策の実施
* **依頼内容**: SEO対応。
* **対応内容**:
  * 重複コンテンツを防ぐための **Canonicalタグ** を追加。
  * ソーシャルメディアで美しく共有されるための **OGPタグ (Open Graph Protocol)** および Twitter カードメタデータを追加。
  * **見出し構造（Heading Hierarchy）の適正化**：技術スタックの見出しを `h4` から `h3` へ昇格させ、フッターのナビゲーションタイトルを `h4` から `<div class="footer-title">` に変更（それに伴い [style.css](file:///home/devstaff/workspace/co/src/style.css) も調整）。
  * ロゴ SVG に `role="img"` と `aria-label="AstraNexus ロゴ"` を追加し、アクセシビリティ（スクリーンリーダー対応）を向上。

### 6. 多言語（日本語・英語）対応の実施
* **依頼内容**: 日本語および英語 of 多言語対応。
* **対応内容**:
  * SEOに強く実装がシンプルな「静的HTMLファイル分割方式」を採用。
  * 既存の [index.html](file:///home/devstaff/workspace/co/index.html) を複製・ローカライズした [en/index.html](file:///home/devstaff/workspace/co/en/index.html)（英語版）を作成。
  * 各ページのヘッダーに相互言語にアクセスするための言語切り替えスイッチ（JP/EN）を追加。
  * [src/style.css](file:///home/devstaff/workspace/co/src/style.css) に言語スイッチのUIスタイル定義を追加。
  * 検索エンジンに対して相互の言語バージョンを伝えるため、両ページの `<head>` 内に `canonical` に加え、`hreflang="ja"`, `hreflang="en"`, `hreflang="x-default"` のメタタグを設定。
  * [vite.config.js](file:///home/devstaff/workspace/co/vite.config.js) をマルチページビルド用に更新し、ビルド時に両言語の HTML が `docs/` ディレクトリに正しく出力されるように設定。
  * Playwrightによる言語切り替えのE2Eテストを [tests/corporate.spec.js](file:///home/devstaff/workspace/co/tests/corporate.spec.js) に追加。

### 7. Playwright によるテスト環境構築 & E2Eテストの実行
* **依頼内容**: Playwright を使用したテストの実行。
* **対応内容**:
  * `@playwright/test` をインストールし、ブラウザおよびシステム依存関係 (`npx playwright install` および `npx playwright install-deps`) をセットアップ。
  * [playwright.config.js](file:///home/devstaff/workspace/co/playwright.config.js) を作成し、テスト実行時に Vite 開発サーバー (`npm run dev`) が自動で起動するよう設定。
  * [tests/corporate.spec.js](file:///home/devstaff/workspace/co/tests/corporate.spec.js) を新規作成（後に多言語化テストも追加）し、ページタイトル、OGP、ロゴのアクセシビリティ属性、会社概要の空欄セル、フッターの免責事項、非表示のお問い合わせフォームなどを検証する E2E テストスイートを実行。

### 8. .gitignore の更新
* **依頼内容**: `.gitignore` の更新。
* **対応内容**:
  * Playwright テストの実行に伴って生成されるレポートフォルダ (`playwright-report/`) および実行結果の一時フォルダ (`test-results/`) が Git の追跡対象外となるよう、[.gitignore](file:///home/devstaff/workspace/co/.gitignore) に除外設定を追記。

### 9. GitHub Pages 対応の実施
* **依頼内容**: GitHub Pages への対応。
* **対応内容**:
  * GitHub既定のドメイン（`https://ytkrb.github.io/fictitious-company/`）を前提とし、[vite.config.js](file:///home/devstaff/workspace/co/vite.config.js) に `base: '/fictitious-company/'` を設定。
  * サブフォルダ配信時にアセットや多言語切り替えのリンクが破損しないよう、[index.html](file:///home/devstaff/workspace/co/index.html) の英語切り替えリンクを `./en/`、[en/index.html](file:///home/devstaff/workspace/co/en/index.html) の日本語切り替えリンクを `../` へ相対パスに変更。
  * `canonical` タグ、`og:url`、`hreflang` タグに指定する絶対ドメインを `https://ytkrb.github.io/fictitious-company/` へ一括変更。
  * サブディレクトリ配信（Viteのbase設定）を考慮し、[playwright.config.js](file:///home/devstaff/workspace/co/playwright.config.js) の `baseURL` と `webServer` の監視 URL を `/fictitious-company/` 配下に修正。
  * テストスイート内の canonical URL アサーションおよび画面遷移後の URL アサーションを更新し、すべてパスすることを確認。
