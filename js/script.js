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
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // 添加当前活动状态
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});