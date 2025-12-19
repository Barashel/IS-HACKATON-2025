// ========================================
// Configuration globale
// ========================================
const config = {
    imagePath: '../IMAGES/noel1.jpg',
    facebookSize: { width: 1200, height: 630 },
    instagramSize: { width: 1080, height: 1080 },
    textColor: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowBlur: 15,
    // Images additionnelles pour la galerie
    galleryImages: [
        '../IMAGES/noel1.jpg',
        '../IMAGES/noel2.jpg',
        '../IMAGES/noel3.jpg',
        '../IMAGES/noel4.jpg'
    ]
};

let currentStudentName = '';
let baseImage = new Image();
let imageLoaded = false;
let audioPlayer = null;
let isPlaying = false;

// ========================================
// Éléments DOM
// ========================================
const nameInputSection = document.getElementById('nameInputSection');
const previewSection = document.getElementById('previewSection');
const festiveSection = document.getElementById('festiveSection');
const studentNameInput = document.getElementById('studentName');
const generateBtn = document.getElementById('generateBtn');
const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');
const displayName = document.getElementById('displayName');
const downloadFacebookBtn = document.getElementById('downloadFacebook');
const downloadInstagramBtn = document.getElementById('downloadInstagram');
const createAnotherBtn = document.getElementById('createAnotherBtn');
const backHomeBtn = document.getElementById('backHomeBtn');
const createNewBtn = document.getElementById('createNewBtn');

// ========================================
// Initialisation au chargement de la page
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎄 Application Mon Cadeau initialisée');
    
    // Précharger l'image de base
    preloadImage();
    
    // Initialiser le lecteur audio
    initAudioPlayer();
    
    // Event listeners principaux
    generateBtn.addEventListener('click', handleGenerate);
    
    studentNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    });
    
    downloadFacebookBtn.addEventListener('click', () => downloadPoster('facebook'));
    downloadInstagramBtn.addEventListener('click', () => downloadPoster('instagram'));
    createAnotherBtn.addEventListener('click', resetToStart);
    backHomeBtn.addEventListener('click', () => window.location.href = '../home.html');
    createNewBtn.addEventListener('click', resetToStart);
    
    // Configuration des liens de partage
    setupSocialSharing();
    
    // Créer la galerie d'images
    createImageGallery();
});

// ========================================
// Précharger l'image de fond
// ========================================
function preloadImage() {
    baseImage.src = config.imagePath;
    
    baseImage.onload = () => {
        console.log('✅ Image de fond chargée avec succès');
        imageLoaded = true;
    };
    
    baseImage.onerror = () => {
        console.error('❌ Erreur de chargement de l\'image:', config.imagePath);
        showNotification('Impossible de charger l\'image. Vérifiez le chemin.', 'error');
        imageLoaded = false;
    };
}

// ========================================
// Initialiser le lecteur audio
// ========================================
function initAudioPlayer() {
    // Créer le conteneur du lecteur audio
    const audioHTML = `
        <div id="audioPlayer" style="
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1rem 2rem;
            border-radius: 50px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            display: none;
            align-items: center;
            gap: 1rem;
            z-index: 1000;
            animation: slideUp 0.5s ease-out;
        ">
            <button id="playPauseBtn" style="
                background: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #667eea;
                transition: all 0.3s ease;
            ">
                <i class="fa-solid fa-play"></i>
            </button>
            <div style="color: white; font-weight: 600;">
                🎵 Musique de Noël
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', audioHTML);
    
    // Créer l'élément audio
    audioPlayer = new Audio('wish.mp3');
    audioPlayer.loop = true;
    audioPlayer.volume = 0.3;
    
    // Event listener pour le bouton play/pause
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.addEventListener('click', toggleMusic);
}

// ========================================
// Toggle musique
// ========================================
function toggleMusic() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const icon = playPauseBtn.querySelector('i');
    
    if (isPlaying) {
        audioPlayer.pause();
        icon.className = 'fa-solid fa-play';
        isPlaying = false;
    } else {
        audioPlayer.play();
        icon.className = 'fa-solid fa-pause';
        isPlaying = true;
    }
}

// ========================================
// Gérer la génération de l'affiche
// ========================================
function handleGenerate() {
    const name = studentNameInput.value.trim();
    
    // Validations
    if (!name) {
        showNotification('⚠️ Veuillez entrer votre nom', 'warning');
        studentNameInput.focus();
        return;
    }
    
    if (name.length < 2) {
        showNotification('⚠️ Le nom doit contenir au moins 2 caractères', 'warning');
        return;
    }
    
    if (!imageLoaded) {
        showNotification('⏳ Chargement de l\'image en cours...', 'info');
        setTimeout(() => handleGenerate(), 500);
        return;
    }
    
    // Enregistrer le nom
    currentStudentName = name;
    displayName.textContent = name;
    
    // Générer l'affiche (format Facebook par défaut)
    generatePoster(name, 'facebook');
    
    // Passer à la section de prévisualisation
    showSection('preview');
    
    // Effet confetti
    createConfetti();
    
    showNotification('✨ Votre affiche est prête !', 'success');
}

// ========================================
// Générer l'affiche sur le canvas
// ========================================
function generatePoster(name, format) {
    const size = format === 'facebook' ? config.facebookSize : config.instagramSize;
    
    // Configurer les dimensions du canvas
    canvas.width = size.width;
    canvas.height = size.height;
    
    // Dessiner l'affiche
    drawPoster(name);
}

// ========================================
// Dessiner l'affiche avec le nom centré
// ========================================
function drawPoster(name) {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner l'image de fond (redimensionnée pour remplir le canvas)
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    
    // Configuration du texte
    const fontSize = Math.floor(canvas.width / 15);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = config.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Ombre portée pour meilleure lisibilité
    ctx.shadowColor = config.textShadowColor;
    ctx.shadowBlur = config.textShadowBlur;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Position au centre du canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Dessiner le nom (centré)
    ctx.fillText(name, centerX, centerY);
    
    console.log(`✅ Affiche générée pour "${name}" - ${canvas.width}x${canvas.height}px`);
}

// ========================================
// Télécharger l'affiche
// ========================================
function downloadPoster(format) {
    // Regénérer avec le bon format
    generatePoster(currentStudentName, format);
    
    // Attendre que le canvas soit mis à jour
    setTimeout(() => {
        const formatName = format === 'facebook' ? 'Facebook' : 'Instagram';
        const fileName = `EPL_Noel_2025_${currentStudentName.replace(/\s+/g, '_')}_${format}.png`;
        
        // Créer le blob et télécharger
        canvas.toBlob((blob) => {
            if (!blob) {
                showNotification('❌ Erreur lors de la création de l\'image', 'error');
                return;
            }
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            
            // Nettoyer l'URL
            URL.revokeObjectURL(url);
            
            showNotification(`✅ Affiche ${formatName} téléchargée !`, 'success');
            
            // Passer à la section festive
            setTimeout(() => {
                showSection('festive');
                launchFireworks();
            }, 1000);
        }, 'image/png', 1.0);
    }, 200);
}

// ========================================
// Afficher une section spécifique
// ========================================
function showSection(section) {
    // Cacher toutes les sections
    nameInputSection.classList.remove('section-visible');
    nameInputSection.classList.add('section-hidden');
    previewSection.classList.remove('section-visible');
    previewSection.classList.add('section-hidden');
    festiveSection.classList.remove('section-visible');
    festiveSection.classList.add('section-hidden');
    
    // Cacher le lecteur audio
    document.getElementById('audioPlayer').style.display = 'none';
    
    // Afficher la section demandée
    if (section === 'input') {
        nameInputSection.classList.remove('section-hidden');
        nameInputSection.classList.add('section-visible');
    } else if (section === 'preview') {
        previewSection.classList.remove('section-hidden');
        previewSection.classList.add('section-visible');
    } else if (section === 'festive') {
        festiveSection.classList.remove('section-hidden');
        festiveSection.classList.add('section-visible');
        // Afficher le lecteur audio
        document.getElementById('audioPlayer').style.display = 'flex';
    }
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Réinitialiser l'application
// ========================================
function resetToStart() {
    studentNameInput.value = '';
    currentStudentName = '';
    showSection('input');
    studentNameInput.focus();
    
    // Arrêter la musique
    if (isPlaying) {
        toggleMusic();
    }
}

// ========================================
// Créer la galerie d'images
// ========================================
function createImageGallery() {
    const galleryHTML = `
        <div id="imageGallery" style="
            margin-top: 2rem;
            padding: 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        ">
            <h3 style="text-align: center; margin-bottom: 1.5rem; color: #333;">
                🎨 Galerie d'images de Noël
            </h3>
            <div id="galleryGrid" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            "></div>
        </div>
    `;
    
    // Ajouter la galerie après les statistiques
    const festiveCard = document.querySelector('.festive-card');
    if (festiveCard) {
        const actionsDiv = festiveCard.querySelector('.festive-actions');
        actionsDiv.insertAdjacentHTML('beforebegin', galleryHTML);
        
        // Remplir la galerie
        const galleryGrid = document.getElementById('galleryGrid');
        config.galleryImages.forEach((imagePath, index) => {
            const imageCard = `
                <div class="gallery-item" style="
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                ">
                    <img src="${imagePath}" alt="Image de Noël ${index + 1}" style="
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                    ">
                    <button onclick="downloadGalleryImage('${imagePath}', ${index})" style="
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        background: rgba(255, 255, 255, 0.9);
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    ">
                        <i class="fa-solid fa-download"></i> Télécharger
                    </button>
                </div>
            `;
            galleryGrid.insertAdjacentHTML('beforeend', imageCard);
        });
    }
}

// ========================================
// Télécharger une image de la galerie
// ========================================
window.downloadGalleryImage = function(imagePath, index) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imagePath;
    
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `EPL_Christmas_Image_${index + 1}.png`;
            link.click();
            URL.revokeObjectURL(url);
            
            showNotification(`✅ Image ${index + 1} téléchargée !`, 'success');
        });
    };
    
    img.onerror = () => {
        showNotification('❌ Erreur lors du téléchargement', 'error');
    };
};

// ========================================
// Créer des confettis animés
// ========================================
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#6c5ce7', '#a29bfe', '#fd79a8'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const duration = 2500 + Math.random() * 2000;
            const startTime = Date.now();
            const rotation = Math.random() * 360;
            const drift = (Math.random() - 0.5) * 100;
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    const y = progress * 120;
                    const x = Math.sin(progress * Math.PI * 2) * drift;
                    confetti.style.top = y + '%';
                    confetti.style.transform = `translateX(${x}px) rotate(${rotation * progress}deg)`;
                    confetti.style.opacity = 1 - progress;
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            animate();
        }, i * 20);
    }
}

// ========================================
// Lancer les feux d'artifice
// ========================================
function launchFireworks() {
    console.log('🎆 Feux d\'artifice lancés !');
    animateStats();
}

// ========================================
// Configuration du partage social
// ========================================
function setupSocialSharing() {
    const shareText = encodeURIComponent('🎄 Découvrez mon affiche de Noël personnalisée de l\'EPL ! 🎁✨');
    const shareUrl = encodeURIComponent(window.location.href);
    
    const facebookShare = document.getElementById('shareFacebook');
    const twitterShare = document.getElementById('shareTwitter');
    const whatsappShare = document.getElementById('shareWhatsapp');
    const instagramShare = document.getElementById('shareInstagram');
    
    if (facebookShare) {
        facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`;
    }
    if (twitterShare) {
        twitterShare.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    }
    if (whatsappShare) {
        whatsappShare.href = `https://wa.me/?text=${shareText} ${shareUrl}`;
    }
    if (instagramShare) {
        instagramShare.href = 'https://www.instagram.com/';
    }
}

// ========================================
// Animation des statistiques
// ========================================
function animateStats() {
    const animateNumber = (element, target, duration) => {
        if (!element) return;
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    };
    
    const totalUsersEl = document.getElementById('totalUsers');
    const totalDownloadsEl = document.getElementById('totalDownloads');
    
    if (totalUsersEl && totalDownloadsEl) {
        animateNumber(totalUsersEl, 1247, 2000);
        animateNumber(totalDownloadsEl, 3891, 2000);
    }
}

// ========================================
// Système de notifications
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '12px';
    notification.style.color = '#fff';
    notification.style.zIndex = '99999';
    notification.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    notification.style.animation = 'slideInRight 0.5s ease-out';
    notification.style.fontWeight = '500';
    notification.style.minWidth = '250px';
    notification.textContent = message;
    
    // Couleurs selon le type
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========================================
// Animations CSS
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    .gallery-item:hover {
        transform: scale(1.05);
    }
    
    #playPauseBtn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);

console.log('🎅 Joyeux Noël de la part de l\'EPL ! 🎄');