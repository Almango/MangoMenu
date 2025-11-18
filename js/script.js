// GitHub风格自定义鼠标指针效果
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// 鼠标移动事件
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // 小圆点完全无延时跟随鼠标
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// 平滑动画 - 外圈跟随小圆点
function animateCursor() {
    // 外圈跟随小圆点位置，形成拖尾效果
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    cursor.style.left = cursorX - 9 + 'px'; // 18px / 2 = 9px
    cursor.style.top = cursorY - 9 + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 鼠标进入/离开窗口
document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    cursorDot.classList.remove('hidden');
});

document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursorDot.classList.add('hidden');
});

// 鼠标悬停效果 - 在可交互元素上激活active状态
const hoverElements = document.querySelectorAll('a, button, .nav-link, .card, .avatar');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorDot.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorDot.classList.remove('active');
    });
});

// 鼠标按下效果
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.3)';
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.3)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = '';
    cursorDot.style.transform = 'translate(-50%, -50%)';
});

// 页面加载完成后确保动画触发
document.addEventListener('DOMContentLoaded', function() {
    // 导航切换功能
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const contentArea = document.querySelector('.content-area');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 获取当前活动的内容区域
            const currentActiveSection = document.querySelector('.content-section.active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // 如果点击的是当前已经激活的导航，不执行动画
            if (link.classList.contains('active')) {
                return;
            }
            
            // 移除所有导航的活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前导航的活动状态
            link.classList.add('active');
            
            // 创建平滑过渡动画
            if (currentActiveSection && targetSection) {
                // 淡出当前内容
                currentActiveSection.style.opacity = '0';
                currentActiveSection.style.transform = 'translateY(-20px)';
                currentActiveSection.style.transition = 'all 0.3s ease-out';
                
                setTimeout(() => {
                    // 移除当前内容的激活状态
                    currentActiveSection.classList.remove('active');
                    
                    // 激活新内容并设置初始状态
                    targetSection.classList.add('active');
                    targetSection.style.opacity = '0';
                    targetSection.style.transform = 'translateY(20px)';
                    targetSection.style.transition = 'all 0.3s ease-out';
                    
                    // 触发重排以确保过渡效果
                    targetSection.offsetHeight;
                    
                    // 淡入新内容
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                }, 300);
            } else if (targetSection) {
                // 如果没有当前活动内容，直接激活目标内容
                targetSection.classList.add('active');
            }
        });
    });
});