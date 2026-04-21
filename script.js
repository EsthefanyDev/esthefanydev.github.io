/* 
    EsthefanyDev - Portfolio Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Tracking ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    });

    // Scale cursor on hoverable elements
    const links = document.querySelectorAll('a, button, .project-card, .skill-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.background = 'rgba(124, 58, 237, 0.4)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--clr-primary)';
        });
    });

    // --- Animate on Scroll (AOS) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => observer.observe(el));

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- Project Modal Data ---
    const projectData = {
        obracontrol: {
            title: 'ObraControl',
            category: 'Construção Civil / SaaS',
            img: 'assets/obracontrol.png',
            desc: 'Aplicação PWA de alta performance projetada para o setor de construção civil. Focado em gestão ágil, transparência financeira e segurança jurídica.',
            features: [
                'Gestão de Diárias com Assinatura Digital e GPS',
                'Alertas de Risco de Vínculo (Sistema 15/20 dias)',
                'Dashboard Executivo com Gráficos Chart.js',
                'Geração de Recibos Profissionais (A4 e WhatsApp)',
                'Suporte Offline Completo (PWA / Service Workers)',
                'Controle de Acesso por Níveis (RBAC)',
                'Exportação em CSV e Backup JSON'
            ],
            link: 'https://obracontrol-sistema.vercel.app/'
        },
        palletlog: {
            title: 'PalletLog',
            category: 'Indústria / E-commerce',
            img: 'assets/palletlog.png',
            desc: 'Sistema moderno de catálogo de produtos e gestão de orçamentos para a indústria de paletização e logística. Focado em UX industrial e alta taxa de conversão.',
            features: [
                'Sistema de Orçamento com checkout via WhatsApp',
                'Carrinho Persistente (localStorage)',
                'Cálculo de itens em tempo real',
                'Catálogo Dinâmico com filtros avançados (Novos, Reformados)',
                'Busca instantânea sem recarregamento',
                'Modais de detalhes técnicos reutilizáveis'
            ],
            link: 'https://palletlog.vercel.app/'
        }
    };

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const openBtns = document.querySelectorAll('.open-project');
    const closeBtn = document.querySelector('.close-modal');

    const openModal = (id) => {
        const data = projectData[id];
        if (!data) return;

        document.getElementById('modal-img').src = data.img;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-category').innerText = data.category;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-link').href = data.link;

        const featureList = document.getElementById('modal-feature-list');
        featureList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerText = feature;
            featureList.appendChild(li);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.project));
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Mensagem Enviada!';
                btn.style.background = 'var(--clr-secondary)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'var(--grad-primary)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
