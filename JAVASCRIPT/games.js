
        // Base de données des jeux éducatifs
        const games = [
            {
                id: 1,
                title: "Math Playground",
                category: "math",
                description: "Résolvez des problèmes mathématiques amusants et améliorez vos compétences en calcul.",
                url: "https://www.mathplayground.com/",
                icon: "fa-calculator",
                rating: 4.8,
                players: "10K+",
                badge: "Populaire"
            },
            {
                id: 2,
                title: "Prodigy Math",
                category: "math",
                description: "Jeu RPG éducatif qui transforme les mathématiques en aventure épique.",
                url: "https://www.prodigygame.com/",
                icon: "fa-dragon",
                rating: 4.9,
                players: "50K+",
                badge: "Top"
            },
            {
                id: 3,
                title: "Duolingo",
                category: "language",
                description: "Apprenez les langues de manière ludique avec des exercices interactifs.",
                url: "https://www.duolingo.com/",
                icon: "fa-language",
                rating: 4.7,
                players: "100K+",
                badge: "Tendance"
            },
            {
                id: 4,
                title: "Scratch",
                category: "coding",
                description: "Créez vos propres histoires, jeux et animations en programmant.",
                url: "https://scratch.mit.edu/",
                icon: "fa-code",
                rating: 4.9,
                players: "75K+",
                badge: "Recommandé"
            },
            {
                id: 5,
                title: "Code.org",
                category: "coding",
                description: "Apprenez les bases de la programmation avec des tutoriels interactifs.",
                url: "https://code.org/",
                icon: "fa-laptop-code",
                rating: 4.8,
                players: "60K+",
                badge: "Top"
            },
            {
                id: 6,
                title: "PhET Simulations",
                category: "science",
                description: "Explorez des simulations scientifiques interactives en physique, chimie et biologie.",
                url: "https://phet.colorado.edu/",
                icon: "fa-flask",
                rating: 4.7,
                players: "30K+",
                badge: "Éducatif"
            },
            {
                id: 7,
                title: "Kahoot!",
                category: "logic",
                description: "Participez à des quiz interactifs et testez vos connaissances.",
                url: "https://kahoot.com/",
                icon: "fa-lightbulb",
                rating: 4.6,
                players: "80K+",
                badge: "Populaire"
            },
            {
                id: 8,
                title: "Typing Club",
                category: "language",
                description: "Améliorez votre vitesse de frappe avec des leçons progressives.",
                url: "https://www.typingclub.com/",
                icon: "fa-keyboard",
                rating: 4.5,
                players: "40K+",
                badge: "Nouveau"
            },
            {
                id: 9,
                title: "GeoGuessr",
                category: "science",
                description: "Devinez où vous êtes dans le monde en explorant Street View.",
                url: "https://www.geoguessr.com/",
                icon: "fa-globe",
                rating: 4.8,
                players: "55K+",
                badge: "Tendance"
            },
            {
                id: 10,
                title: "Chess.com",
                category: "logic",
                description: "Jouez aux échecs en ligne et développez votre réflexion stratégique.",
                url: "https://www.chess.com/",
                icon: "fa-chess",
                rating: 4.9,
                players: "90K+",
                badge: "Top"
            },
            {
                id: 11,
                title: "Coolmath Games",
                category: "math",
                description: "Collection de jeux de logique et de mathématiques amusants.",
                url: "https://www.coolmathgames.com/",
                icon: "fa-brain",
                rating: 4.6,
                players: "70K+",
                badge: "Populaire"
            },
            {
                id: 12,
                title: "National Geographic Kids",
                category: "science",
                description: "Explorez le monde naturel avec des jeux et des activités passionnantes.",
                url: "https://kids.nationalgeographic.com/games/",
                icon: "fa-paw",
                rating: 4.7,
                players: "45K+",
                badge: "Éducatif"
            },
            {
                id: 13,
                title: "Lumosity",
                category: "logic",
                description: "Entraînez votre cerveau avec des jeux scientifiquement conçus.",
                url: "https://www.lumosity.com/",
                icon: "fa-brain",
                rating: 4.5,
                players: "35K+",
                badge: "Science"
            },
            {
                id: 14,
                title: "CodeCombat",
                category: "coding",
                description: "Apprenez à coder en jouant à un jeu d'aventure épique.",
                url: "https://codecombat.com/",
                icon: "fa-dragon",
                rating: 4.8,
                players: "50K+",
                badge: "Recommandé"
            },
            {
                id: 15,
                title: "Wordscapes",
                category: "language",
                description: "Trouvez des mots cachés et élargissez votre vocabulaire.",
                url: "https://wordscapes.peoplefun.com/",
                icon: "fa-spell-check",
                rating: 4.6,
                players: "65K+",
                badge: "Populaire"
            }
        ];

        // Générer les particules
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                container.appendChild(particle);
            }
        }

        // Afficher les jeux
        function displayGames(category = 'all') {
            const grid = document.getElementById('gamesGrid');
            grid.innerHTML = '';

            const filteredGames = category === 'all' 
                ? games 
                : games.filter(game => game.category === category);

            filteredGames.forEach((game, index) => {
                const card = document.createElement('div');
                card.className = 'game-card';
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <div class="game-thumbnail">
                        <i class="fa-solid ${game.icon}"></i>
                        <div class="game-badge">${game.badge}</div>
                    </div>
                    <div class="game-content">
                        <h3 class="game-title">${game.title}</h3>
                        <div class="game-category">
                            <i class="fa-solid fa-tag"></i>
                            ${getCategoryName(game.category)}
                        </div>
                        <p class="game-description">${game.description}</p>
                        <div class="game-meta">
                            <div class="game-rating">
                                <i class="fa-solid fa-star"></i>
                                ${game.rating}
                            </div>
                            <div class="game-players">
                                <i class="fa-solid fa-users"></i>
                                ${game.players}
                            </div>
                        </div>
                        <button class="play-btn" onclick="playGame('${game.url}', '${game.title}')">
                            <i class="fa-solid fa-play"></i>
                            Jouer maintenant
                        </button>
                    </div>
                `;
                
                grid.appendChild(card);
            });
        }

        // Obtenir le nom de la catégorie
        function getCategoryName(category) {
            const names = {
                math: 'Mathématiques',
                language: 'Langues',
                science: 'Sciences',
                coding: 'Programmation',
                logic: 'Logique'
            };
            return names[category] || category;
        }

        // Jouer à un jeu
        function playGame(url, title) {
            const loading = document.getElementById('loading');
            loading.style.display = 'block';
            
            setTimeout(() => {
                loading.style.display = 'none';
                window.open(url, '_blank');
                showNotification(`Ouverture de ${title}...`, 'success');
            }, 1000);
        }

        // Notification
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#4caf50' : '#2196f3'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                animation: slideIn 0.5s ease-out;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }

        // Gestion des filtres
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                displayGames(category);
            });
        });

        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            displayGames();
            console.log('🎮 Page Jeux Éducatifs chargée !');
        });

        // Animations CSS supplémentaires
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
