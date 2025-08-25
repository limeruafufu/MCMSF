// 统计数字动画
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    // 检查元素是否进入视窗
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 缓动函数 - easeOutExpo
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    // 数字增长动画 - 使用缓动函数
    function animateCounter(element, target) {
        let startTime = null;
        const duration = 2500; // 动画持续时间（毫秒）
        
        // 检查元素是否已经有动画标记
        if (element.dataset.animated === 'true') {
            return;
        }
        
        // 标记该元素已开始动画
        element.dataset.animated = 'true';
        
        // 添加千位分隔符
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // 使用requestAnimationFrame实现平滑动画
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentValue = Math.floor(target * easedProgress);
            
            element.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
                
                // 动画结束后添加强调效果
                element.classList.add('stat-number-completed');
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // 滚动时检查是否显示统计区域
    function checkStatsVisibility() {
        stats.forEach(stat => {
            if (isElementInViewport(stat) && stat.dataset.animated !== 'true') {
                const target = parseInt(stat.getAttribute('data-count'), 10);
                animateCounter(stat, target);
                
                // 添加入场动画到父元素
                const statItem = stat.closest('.stat-item');
                if (statItem) {
                    statItem.classList.add('stat-item-visible');
                }
            }
        });
    }
    
    // 初始检查
    checkStatsVisibility();
    
    // 滚动时检查
    window.addEventListener('scroll', checkStatsVisibility);
}); 