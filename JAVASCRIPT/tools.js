// Gestion des services et modales
document.addEventListener('DOMContentLoaded', function() {
    
    // Données des cours pour chaque service
    const coursesData = {
        courses: [
            { name: "PHY1320: Loi de la Thermodynamique", link: "#" },
            { name: "2MTH1320: Intégration multiple et Généralisée", link: "#" },
            { name: "1MTH1320: Séries", link: "#" },
            { name: "INF1321: Architecture des Ordinateurs", link: "#" },
            { name: "INF1320: Programmation Orientée Objet", link: "#" },
            { name: "MTH1322: Algèbre Tensorielle", link: "#" },
            { name: "1MTH1321: Probabilités", link: "#" },
            { name: "2MTH1321: Statistiques descriptives", link: "#" },
            { name: "1SEG1320: Economie d'entreprise", link: "#" },
            { name: "2SEGA320: Comptabilité", link: "#" },
            { name: "1PHY1321: Optique géométrique", link: "#" },
            { name: "2PHY1321: Optique Ondulatoire", link: "#" }
        ],
        exercises: [
            { name: "PHY1320: Loi de la Thermodynamique", link: "#" },
            { name: "2MTH1320: Intégration multiple et Généralisée", link: "#" },
            { name: "1MTH1320: Séries", link: "#" },
            { name: "INF1321: Architecture des Ordinateurs", link: "#" },
            { name: "INF1320: Programmation Orientée Objet", link: "#" },
            { name: "MTH1322: Algèbre Tensorielle", link: "#" },
            { name: "1MTH1321: Probabilités", link: "#" },
            { name: "2MTH1321: Statistiques descriptives", link: "#" },
            { name: "1SEG1320: Economie d'entreprise", link: "#" },
            { name: "2SEGA320: Comptabilité", link: "#" },
            { name: "1PHY1321: Optique géométrique", link: "#" },
            { name: "2PHY1321: Optique Ondulatoire", link: "#" }
        ],
        practice: [
            { name: "PHY1320: Loi de la Thermodynamique", link: "#" },
            { name: "2MTH1320: Intégration multiple et Généralisée", link: "#" },
            { name: "1MTH1320: Séries", link: "#" },
            { name: "INF1321: Architecture des Ordinateurs", link: "#" },
            { name: "INF1320: Programmation Orientée Objet", link: "#" },
            { name: "MTH1322: Algèbre Tensorielle", link: "#" },
            { name: "1MTH1321: Probabilités", link: "#" },
            { name: "2MTH1321: Statistiques descriptives", link: "#" },
            { name: "1SEG1320: Economie d'entreprise", link: "#" },
            { name: "2SEGA320: Comptabilité", link: "#" },
            { name: "1PHY1321: Optique géométrique", link: "#" },
            { name: "2PHY1321: Optique Ondulatoire", link: "#" }
        ],
        quizzes: [
            { name: "PHY1320: Loi de la Thermodynamique", link: "#" },
            { name: "2MTH1320: Intégration multiple et Généralisée", link: "#" },
            { name: "1MTH1320: Séries", link: "#" },
            { name: "INF1321: Architecture des Ordinateurs", link: "#" },
            { name: "INF1320: Programmation Orientée Objet", link: "#" },
            { name: "MTH1322: Algèbre Tensorielle", link: "#" },
            { name: "1MTH1321: Probabilités", link: "#" },
            { name: "2MTH1321: Statistiques descriptives", link: "#" },
            { name: "1SEG1320: Economie d'entreprise", link: "#" },
            { name: "2SEGA320: Comptabilité", link: "#" },
            { name: "1PHY1321: Optique géométrique", link: "#" },
            { name: "2PHY1321: Optique Ondulatoire", link: "#" }
        ],
        videos: [
            { name: "PHY1320: Loi de la Thermodynamique", link: "#" },
            { name: "2MTH1320: Intégration multiple et Généralisée", link: "#" },
            { name: "1MTH1320: Séries", link: "#" },
            { name: "INF1321: Architecture des Ordinateurs", link: "#" },
            { name: "INF1320: Programmation Orientée Objet", link: "#" },
            { name: "MTH1322: Algèbre Tensorielle", link: "#" },
            { name: "1MTH1321: Probabilités", link: "#" },
            { name: "2MTH1321: Statistiques descriptives", link: "#" },
            { name: "1SEG1320: Economie d'entreprise", link: "#" },
            { name: "2SEGA320: Comptabilité", link: "#" },
            { name: "1PHY1321: Optique géométrique", link: "#" },
            { name: "2PHY1321: Optique Ondulatoire", link: "#" }
        ],
        support: [
            { name: "Chat d'assistance générale", link: "#" },
            { name: "Support Mathématiques", link: "#" },
            { name: "Support Physique", link: "#" },
            { name: "Support Informatique", link: "#" },
            { name: "Support Gestion", link: "#" }
        ],
        notebook: [
            { name: "Créer un nouveau cahier", link: "#" },
            { name: "Mes cahiers sauvegardés", link: "#" },
            { name: "Partager un cahier", link: "#" },
            { name: "Exporter en PDF", link: "#" }
        ],
        simulation: [
            { name: "Simulations de Physique", link: "#" },
            { name: "Calculateurs Mathématiques", link: "#" },
            { name: "Visualisations 3D", link: "#" },
            { name: "Laboratoire virtuel", link: "#" }
        ],
        motivation: [
            { name: "Tableau de bord", link: "#" },
            { name: "Mes récompenses", link: "#" },
            { name: "Classement", link: "#" },
            { name: "Objectifs personnels", link: "#" }
        ]
    };

    // Icônes pour chaque service
    const serviceIcons = {
        courses: 'fa-book',
        exercises: 'fa-lightbulb',
        practice: 'fa-book-open',
        quizzes: 'fa-clipboard-question',
        videos: 'fa-play-circle',
        support: 'fa-headset',
        notebook: 'fa-pen-to-square',
        simulation: 'fa-cube',
        motivation: 'fa-trophy'
    };

    // Titres pour chaque service
    const serviceTitles = {
        courses: 'Documents Cours',
        exercises: 'Exercices Résolus',
        practice: "Exercices d'entraînement",
        quizzes: 'Quizz Interactifs ',
        videos: 'Tutoriels Videos',
        support: 'Support Chat',
        notebook: 'Integrated Notebook',
        simulation: 'Simulation Tool',
        motivation: 'Motivation System'
    };

    // Éléments DOM
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const courseList = document.getElementById('courseList');
    const serviceButtons = document.querySelectorAll('.service-btn');

    // Fonction pour ouvrir la modal
    function openModal(serviceType) {
        const courses = coursesData[serviceType];
        const icon = serviceIcons[serviceType];
        const title = serviceTitles[serviceType];

        // Mettre à jour le titre et l'icône
        modalTitle.textContent = title;
        modalIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;

        // Vider la liste
        courseList.innerHTML = '';

        // Ajouter les cours
        courses.forEach(course => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${course.link}">${course.name}</a>`;
            courseList.appendChild(li);
        });

        // Afficher la modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners pour les boutons
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceType = this.getAttribute('data-modal');
            openModal(serviceType);
        });
    });

    // Event listeners pour les cartes (clic sur toute la carte)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            openModal(serviceType);
        });
    });

    // Fermer la modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    console.log('✅ Section Services initialisée');
});

// Animation au scroll pour la section Further Education
document.addEventListener('DOMContentLoaded', function() {
    
    const educationSection = document.querySelector('.further-education-section');
    
    if (educationSection) {
        // Observer pour déclencher l'animation au scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Observer une seule fois
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(educationSection);
    }
    
    // Scroll smooth pour le bouton CTA
    const educationCta = document.querySelector('.education-cta');
    if (educationCta) {
        educationCta.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    console.log('✅ Section Further Education initialisée');
});