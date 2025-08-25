// 活动数据
const activities = [
    {
        id: "1",
        name: "方联生电 | Minefusion",
        image: "https://image.mcmsf.com/file/1742565002653_Minefu1sion.png",
    from: "由此服务器服主向MCMSF平台提交的服务器",
        version: "方联生电 - Minefusion <br/>版本1.18-1.21.4 丨 生电生存丨粘液科技丨无尽装备丨自由圈地丨多货币商店丨称号宠物丨OP全天在线<br/>#开荒养老首选 欢迎加入",
        tags: ["#1.21.4", "#生电", "#生存", "#互通", "#多版本"],
        participants: 28,
        apiEndpoint: "proxy.php?ip=play.simpfun.cn:10175",
        category: "成员服",
        ip: "1145141919"
    },
    {
        id: "2",
        name: "JDCmax服务器",
        image: "https://image.mcmsf.com/file/1742599174968_Image_19934345486187.png",
        from: "由此服务器服主向MCMSF平台提交的服务器",
        version: "专注于联合小型公益服，多版本公益群组服 内含生电，生存，创造，多种小游戏，空岛生存，模组，其中1服是十四代i9物理服务器，模组服为苹果m4mac，服务器长期运营不跑路，正版离线均可玩 Q群 791671609",
        tags: ["#1.21.X", "#生存", "#生电", "#多版本", "#小游戏"],
        participants: 28,
        apiEndpoint: "proxy.php?ip=www.jdcmax.top",
        category: "成员服",
        ip: "Q群 791671609"
    },
        {
        id: "7",
        name: "FunnyArenaPixel服务器",
        image: "https://image.mcmsf.com/file/1756124317680_Screenshot_20250825_201629.jpg",
        from: "由MCMSF平台自主展示的服务器",
        version: "FunnyArenaPixel（简称FAPIXEL）创立于2018年，是国内知名基岩版小游戏服务器，现属速德优（北京）网络科技有限公司。提供低延迟、玩法丰富的游戏环境，拥有自主研发反作弊及电子斗蛐蛐、SKYPVP等独创玩法，以及起床战争、超级战墙等经典模式，深受玩家和主播喜爱，并曾参展北京IJOY漫展。节假日常举办赛事，奖励丰厚。",
        tags: ["#1.8.X-1.21.X", "#小游戏", "#基岩版", "#多版本", "#自主反作弊"],
        participants: 28,
        apiEndpoint: "proxyb.php?ip=mc.fapixel.com:19132",
        category: "成员服",
        ip: "官方网站:https://www.fapixel.com/"
    },
    {
        id: "3",
        name: "像素生存2.0",
        image: "https://image.mcmsf.com/file/1742599129153_Image_19703215129558.png",
        from: "由此服务器服主向MCMSF平台提交的服务器",
        version: "像素生存2.0服务器已于2025/1/10开服！版本跨度：[1.12.2 - 1.21.x] 全版本兼容，无论你偏好经典还是追新，都能在这找到归属！q群 1023379394",
        tags: ["#1.12.2-1.21.x", "#生存"],
        participants: 0,
        apiEndpoint: "proxy.php?ip=mc10.top",
        category: "成员服",
        ip: "mc10.top"
    }
];

// 动态生成活动卡片
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateActivityCards(activityList = activities) {
    const shuffledActivities = shuffleArray([...activityList]);
    const container = document.getElementById("upcoming-events");
    
    if (!container) {
        console.error("找不到活动容器");
        return;
    }

    // 清空现有内容
    // 修改容器选择器，确保选中 .row.g-4 而非 .row
    const row = container.querySelector(".row.g-4");
    if (row) {
        row.innerHTML = "";
    }

    // 创建新的活动卡片
    shuffledActivities.forEach((activity, index) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 fade-in-card mb-4";
        col.style.animationDelay = `${0.1 * index}s`;

        col.innerHTML = `
    <div class="card border-0 shadow-sm event-card h-100" data-activity-id="${activity.id}">
                <div class="position-relative event-image-wrapper overflow-hidden rounded-top">
                    <image src="${activity.image}" class="event-image" alt="${activity.name}">
                    <span class="status-dot position-absolute" style="top: 10px; right: 10px;"></span>
                    <div class="event-category event-category-${getCategoryColor(activity.category)}">
                        <span>${activity.category}</span>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="event-meta mb-3">
                        <div class="event-date d-flex align-items-center">
                            <i class="fas fa-server text-primary me-2"></i>
                            <span>${activity.from}</span>
                        </div>
                        <div class="event-time d-flex align-items-center mt-2">
                        </div>
                    </div>
                    <h5 class="card-title mb-3">${activity.name}</h5>
                    <p class="card-text text-muted">${activity.version}</p>
                    <div class="event-tags mt-3">
                        ${activity.tags.map(tag => 
                            `<span class="event-tag me-0.4">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 p-4 pt-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="event-participants d-flex align-items-center">
                            <i class="fas fa-users text-muted me-2"></i> 
                            <span id="${activity.id}-players">加载中...</span>
                        </div>
                        <a href="#" class="btn btn-primary btn-sm rounded-pill event-btn" 
                           onclick="copyIP('${activity.id}')">
                            链接信息
                            <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        if (row) {
            row.appendChild(col);
        }
    });
}

// 复制服务器 IP
function copyIP(activityId) {
    const activity = activities.find(s => s.id === activityId);
    if (activity) {
        navigator.clipboard.writeText(activity.ip).then(() => {
            // 显示复制成功提示
            const toast = document.createElement("div");
            toast.className = "position-fixed top-0 end-0 p-3";
            toast.style.zIndex = "1070";
            toast.innerHTML = `
                <div class="toast show bg-success text-white" role="alert">
                    <div class="toast-header bg-success text-white">
                        <strong class="me-auto">连接信息已复制</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        ${activity.ip} 已复制到剪贴板！
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
            
            // 3秒后自动移除
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }).catch(err => {
            alert("服务器信息: " + activity.ip);
        });
    }
}

// 根据分类获取颜色
function getCategoryColor(category) {
    const colors = {
        "MCJPG引入": "bg-teal",
        "成员服": "bg-coral",
        "#其它渠道服": "bg-sand"
    };
    return colors[category] || "bg-lavender";
}


// 初始化
document.addEventListener("DOMContentLoaded", function () {
    generateActivityCards();
    
    // 添加CSS动画和样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .fade-in-card {
            animation: fadeInUp 0.6s ease forwards;
        }
        .event-category {
    /* 保持原有样式不变 */
    background-color: rgba(150, 150, 255, 0.9); /* 淡紫色 */
}

.event-category.bg-teal {
    background-color: rgba(0, 180, 170, 0.9); /* 蓝绿色 */
}

.event-category.bg-coral {
    background-color: rgba(255, 114, 114, 0.9); /* 珊瑚红 */
}

.event-category.bg-sand {
    background-color: rgba(237, 201, 150, 0.9); /* 沙色 */
    color: #212529;
}

.event-category.bg-lavender {
    background-color: rgba(200, 160, 255, 0.9); /* 薰衣草紫 */
}
        
        /* 新增卡片间距样式 */
        .card {
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .event-card {
            border-radius: 10px;
        }
        .event-image-wrapper {
            border-radius: 10px 10px 0 0;
        }
    `;
    document.head.appendChild(style);
});

// 更新服务器状态
async function updateActivityStatus() {
    activities.forEach(async activity => {
        try {
            const playerElement = document.getElementById(`${activity.id}-players`);
            if (!playerElement) {
                console.error(`找不到服务器 ${activity.id} 的玩家计数元素`);
                return;
            }
            
            // 显示加载动画
            playerElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // 使用Promise.race添加超时处理
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('请求超时')), 5000)
            );
            
            // 获取服务器状态
            try {
                const data = await Promise.race([
                    fetch(activity.apiEndpoint).then(res => res.json()),
                    timeoutPromise
                ]);
                
                // 更新服务器状态点
                const activityCard = document.querySelector(`[data-activity-id="${activity.id}"]`);
                const statusDot = activityCard ? activityCard.querySelector('.status-dot') : null;
                
                if (!statusDot) {
                    console.error(`找不到服务器 ${activity.id} 的状态点元素`);
                    return;
                }

                if (data.online) {
                    activity.online = true;
                    playerElement.innerHTML = `<span class="text-success">${data.players.online}/${data.players.max}</span>`;
                    
                    statusDot.className = "status-dot bg-success";
                    // 添加脉冲动画效果
                    statusDot.style.animation = "pulse 2s infinite";
                    
                    // 添加热门标签如果玩家超过一定数量
                    if (data.players.online > 20 && activityCard) {
                        const hotBadge = document.createElement('span');
                        hotBadge.className = 'badge bg-danger position-absolute top-0 end-0 m-2';
                        hotBadge.innerHTML = '<i class="fas fa-fire-alt me-1"></i> 热门';
                        activityCard.style.position = 'relative';
                        
                        // 如果不存在热门标签才添加
                        if (!activityCard.querySelector('.badge.bg-danger')) {
                            activityCard.appendChild(hotBadge);
                        }
                    }
                } else {
                    activity.online = false;
                    playerElement.innerHTML = '<span class="text-danger">离线</span>';
                    
                    statusDot.className = "status-dot bg-danger";
                    statusDot.style.animation = "none";
                }
            } catch (error) {
                console.error(`获取 ${activity.name} 状态失败:`, error);
                
                // 使用模拟数据
                const isOnline = Math.random() > 0.3;
                const playerCount = Math.floor(Math.random() * 30) + 1;
                const maxPlayers = 100;
                
                activity.online = isOnline;
                
                if (isOnline) {
                    playerElement.innerHTML = `<span class="text-success">${playerCount}/${maxPlayers}</span> <span class="text-muted">(估计数据)</span>`;
                } else {
                    playerElement.innerHTML = '<span class="text-warning">状态未知</span>';
                }
                
                // 更新服务器状态点
                const activityCard = document.querySelector(`[data-activity-id="${activity.id}"]`);
                const statusDot = activityCard ? activityCard.querySelector('.status-dot') : null;
                
                if (statusDot) {
                    statusDot.className = isOnline ? "status-dot bg-success" : "status-dot bg-warning";
                    statusDot.style.animation = isOnline ? "pulse 2s infinite" : "none";
                }
            }
        } catch (error) {
            console.error(`处理 ${activity.name} 时出错:`, error);
        }
    });
}

// 添加状态点脉冲动画
const pulseAnimation = document.createElement('style');
pulseAnimation.textContent = `
@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
    }
    
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 5px rgba(40, 167, 69, 0);
    }
    
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
    }
}

.status-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 5px;
}

.bg-success {
    background-color: #28a745 !important;
}

.bg-danger {
    background-color: #dc3545 !important;
}

.bg-warning {
    background-color: #ffc107 !important;
}
`;

// 服务器筛选函数
function filterActivities() {
    const searchTerm = document.getElementById('searchBox')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    
    if (!searchTerm && !category) {
        // 如果没有搜索条件，显示随机5个服务器
        generateActivityCards();
        return;
    }
    
    // 基于筛选条件过滤服务器
    const filteredActivities = activities.filter(activity => {
        const matchesSearch = searchTerm === '' || 
            activity.name.toLowerCase().includes(searchTerm) || 
            activity.version.toLowerCase().includes(searchTerm);
            
        const matchesCategory = category === '' || activity.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // 使用过滤后的服务器生成卡片
    generateActivityCards(filteredActivities);
    
    // 更新服务器状态
    updateActivityStatus();
}

// 初始化
document.addEventListener("DOMContentLoaded", function () {
    // 添加样式
    document.head.appendChild(pulseAnimation);
    
    // 暗黑模式切换
    let darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        // 读取本地存储的暗黑模式状态
        const isDarkModeEnabled = localStorage.getItem("dark-mode") === "enabled";
        if (isDarkModeEnabled) {
            document.body.classList.add("dark-mode");
            updateDarkModeElements(true);
        }

        // 切换暗黑模式
        darkModeToggle.addEventListener("click", function () {
            const isDarkMode = document.body.classList.toggle("dark-mode");
            updateDarkModeElements(isDarkMode);

            // 记录用户的选择
            localStorage.setItem("dark-mode", isDarkMode ? "enabled" : "disabled");
        });
    }
    
    // 更新暗黑模式相关元素
    function updateDarkModeElements(isDarkMode) {
        // 更新导航菜单背景色
        const mainNav = document.getElementById("mainNav");
        if (mainNav) {
            if (isDarkMode) {
                mainNav.classList.add("dark-mode");
            } else {
                mainNav.classList.remove("dark-mode");
            }
        }
        
        // 更新切换按钮图标
        if (darkModeToggle) {
            const moonIcon = darkModeToggle.querySelector('.fa-moon');
            const sunIcon = darkModeToggle.querySelector('.fa-sun');
            
            if (isDarkMode) {
                if (moonIcon) moonIcon.style.display = 'none';
                if (sunIcon) sunIcon.style.display = 'inline-block';
            } else {
                if (moonIcon) moonIcon.style.display = 'inline-block';
                if (sunIcon) sunIcon.style.display = 'none';
            }
        }
    }

    // 移动导航菜单
    let menuButton = document.getElementById("menuToggle");
    let menu = document.getElementById("mainNav");
    let closeButton = document.getElementById("closeNav");

    if (menuButton && menu && closeButton) {
        menuButton.addEventListener("click", function () {
            menu.classList.add("show");
        });

        closeButton.addEventListener("click", function () {
            menu.classList.remove("show");
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
                menu.classList.remove("show");
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 监听搜索框和分类选择器
    const searchBox = document.getElementById("searchBox");
    const categoryFilter = document.getElementById("categoryFilter");
    
    if (searchBox) {
        searchBox.addEventListener("input", filterActivities);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterActivities);
    }
    
    // 初始化服务器列表
    generateActivityCards();
    updateActivityStatus();
    
    // 定期更新服务器状态（30秒一次）
    setInterval(updateActivityStatus, 30000);
});