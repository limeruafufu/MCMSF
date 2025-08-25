<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MCMSF Java服务器列表</title>
  <style>
    :root {
      --card-radius: 18px;
      --card-gap: 1.5rem;
      --color-primary: #3b82f6;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: "Segoe UI", "Helvetica Neue", sans-serif;
      margin: 0;
      padding: 0;
      background: #f4f6f9;
      color: #333;
    }

    /* 顶部导航栏 */
    header {
      position: sticky;
      top: 0;
      z-index: 999;
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-logo {
      font-size: 1.2rem;
      font-weight: bold;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .navbar-logo img {
      height: 24px;
      width: 24px;
    }

    .navbar-links {
      display: flex;
      gap: 1.5rem;
    }

    .navbar-links a {
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .navbar-links a:hover {
      color: var(--color-primary);
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      margin: 2rem 0 1rem;
      color: #222;
    }

    .search {
      max-width: 600px;
      margin: 0 auto 2rem;
      display: flex;
      gap: 1rem;
      padding: 0 1rem;
    }

    .search input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: var(--card-radius);
      font-size: 1rem;
      background: white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--card-gap);
      padding: 0 1.5rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: var(--card-radius);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    }

    .card img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: #eee;
    }

    .card-content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex-grow: 1;
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111827;
    }

    .card-text {
      font-size: 0.95rem;
      color: #4b5563;
      line-height: 1.5;
      flex-grow: 1;
    }

    .card a {
      align-self: flex-start;
      margin-top: 0.5rem;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 600;
    }

    .card a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .navbar-links {
        display: none;
      }

      h1 {
        font-size: 1.5rem;
      }

      .grid {
        padding: 0 1rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="navbar">
      <a href="/" class="navbar-logo">
        <img src="https://wiki.mcmsf.com/images/f/fc/Favicon.png" alt="logo">
        MCMSF
      </a>
      <nav class="navbar-links">
        <a href="/">主页</a>
        <a href="/docs">文档</a>
        <a href="/join">加入我们</a>
      </nav>
    </div>
  </header>

  <h1>Java 版服务器列表</h1>

  <div class="search">
    <input type="text" id="search" placeholder="搜索服务器名称..." />
  </div>

  <div class="grid" id="server-cards">加载中...</div>

  <script>
    const API_BASE = "https://wiki.mcmsf.com";
    const CATEGORY = "Java版服务器";
    let allCards = [];

    async function fetchCategoryMembers(category) {
      const params = new URLSearchParams({
        action: "query",
        list: "categorymembers",
        cmtitle: `Category:${category}`,
        cmlimit: "max",
        format: "json",
        origin: "*"
      });
      const res = await fetch(`${API_BASE}/api.php?${params.toString()}`);
      const data = await res.json();
      return data.query.categorymembers;
    }

    async function fetchPageSummary(title) {
      const params = new URLSearchParams({
        action: "query",
        prop: "extracts|pageimages",
        titles: title,
        exintro: true,
        explaintext: true,
        piprop: "original",
        format: "json",
        origin: "*"
      });
      const res = await fetch(`${API_BASE}/api.php?${params.toString()}`);
      const data = await res.json();
      const page = Object.values(data.query.pages)[0];
      return {
        summary: page.extract || "暂无简介。",
        image: page.original?.source || null,
        pageid: page.pageid || 0
      };
    }

    async function renderServerCards() {
      const container = document.getElementById("server-cards");
      container.innerHTML = "加载中...";
      const members = await fetchCategoryMembers(CATEGORY);
      container.innerHTML = "";

      for (const member of members) {
        const { title } = member;
        const { summary, image, pageid } = await fetchPageSummary(title);

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${image || 'https://via.placeholder.com/400x225?text=暂无图片'}" alt="${title}">
          <div class="card-content">
            <div class="card-title">${title}</div>
            <div class="card-text">${summary}</div>
            <a href="${API_BASE}/index.php?curid=${pageid}" target="_blank">查看详情</a>
          </div>
        `;

        container.appendChild(card);
        allCards.push({ title, element: card });
      }
    }

    document.getElementById("search").addEventListener("input", e => {
      const keyword = e.target.value.toLowerCase();
      allCards.forEach(({ title, element }) => {
        element.style.display = title.toLowerCase().includes(keyword) ? "block" : "none";
      });
    });

    document.addEventListener("DOMContentLoaded", renderServerCards);
  </script>
</body>
</html>