// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initTheme();
    initTypedText();
    initMenu();
    loadProjects();
    initSkillBars();
    initContactForm();
    initScrollAnimations();
});

// 1. Cursor Personalizado
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efeito hover em links e botões
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.opacity = '1';
        });
    });
}

// 2. Toggle Tema Claro/Escuro
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// 3. Texto Animado (Typing Effect)
function initTypedText() {
    const texts = [
        'experiências digitais',
        'interfaces responsivas',
        'soluções web',
        'código limpo'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedText = document.querySelector('.typed-text');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// 4. Menu Mobile
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// 5. Carregar Projetos
async function loadProjects() {
    const projects = [
        {
            id: 1,
            title: "Dashboard Financeiro",
            description: "Dashboard interativo para análise de dados financeiros com gráficos em tempo real.",
            tags: ["React", "Chart.js", "API"],
            category: "web",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-chart-line"
        },
        {
            id: 2,
            title: "E-commerce Moderno",
            description: "Loja online completa com carrinho, checkout e integração de pagamentos.",
            tags: ["Next.js", "Stripe", "Tailwind"],
            category: "web",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-shopping-cart"
        },
        {
            id: 3,
            title: "App de Tarefas",
            description: "Aplicativo de gerenciamento de tarefas com drag & drop e notificações.",
            tags: ["Vue.js", "Firebase", "PWA"],
            category: "mobile",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-tasks"
        },
        {
            id: 4,
            title: "Portfólio Criativo",
            description: "Design de portfólio para artista digital com galeria interativa.",
            tags: ["GSAP", "Three.js", "CSS3"],
            category: "design",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-palette"
        },
        {
            id: 5,
            title: "Sistema de Agendamento",
            description: "Plataforma para agendamento de serviços com calendário integrado.",
            tags: ["Node.js", "MongoDB", "Socket.io"],
            category: "web",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-calendar-alt"
        },
        {
            id: 6,
            title: "Jogo Web",
            description: "Jogo educativo desenvolvido com HTML5 Canvas e JavaScript.",
            tags: ["JavaScript", "Canvas", "Games"],
            category: "web",
            github: "https://github.com",
            demo: "https://demo.com",
            icon: "fas fa-gamepad"
        }
    ];
    
    const container = document.getElementById('projectsContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function renderProjects(filter = 'all') {
        container.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Código
                        </a>
                        <a href="${project.demo}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(projectCard);
        });
    }
    
    // Filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });
    
    // Renderizar inicialmente
    renderProjects();
}

// 6. Barras de Habilidade
function initSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.setProperty('--level-width', `${level}%`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 7. Formulário de Contato
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica de envio
        // Para começar, apenas mostra uma mensagem
        alert('Obrigado pela mensagem! Em breve entrarei em contato.');
        form.reset();
    });
}

// 8. Animações no Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// 9. Contador de Visitas (Simples)
function initVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolioVisits', visits);
    
    // Você pode exibir em algum lugar se quiser
    // console.log(`Visitas: ${visits}`);
}