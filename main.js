import * as animations from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initSmoothScroll();
    initHeaderScroll();
    initGameplayTabs();
    initScrollAnimations();
    initScrollLine();
    initTypewriter();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.5)';
        }
    });
}

function initGameplayTabs() {
    const tabs = document.querySelectorAll('.gameplay-tab');
    const contents = document.querySelectorAll('.gameplay-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const contentId = `${tab.dataset.tab}-content`;
            document.getElementById(contentId).classList.add('active');
        });
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.animate-section');
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    const crestImage = document.getElementById('crest-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.id === 'hero') {
                    animations.heroEntrance();
                }
                if (entry.target.id === 'signal-crest' && crestImage) {
                    animations.forgeCrest(crestImage);
                }
                if(entry.target.classList.contains('roadmap-item')) {
                    entry.target.classList.add('in-view');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
    roadmapItems.forEach(item => observer.observe(item));
}

function initScrollLine() {
    const scrollLine = document.getElementById('scroll-line');
    if (!scrollLine) return;

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const progress = scrollTop / scrollHeight;
        
        animations.updateScrollLine(scrollLine, progress);
    });
}

function initTypewriter() {
    const el = document.getElementById('typewriter');
    if(!el) return;

    const text = "Eris is not evil. It is a system driven by one, unbreakable rule: find the origin. It follows a public, transparent ruleset. It cannot be cheated, only outsmarted. Its 'Phantoms' mimic human behavior to flood the grid with NOISE, making your task harder. Every match is a pure test of intellect—human intuition versus cold, perfect logic.";
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animations.typewriterEffect(el, text);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(el);
}
