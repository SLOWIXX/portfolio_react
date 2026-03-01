// Script à inclure dans toutes les pages de projets
(function() {
    'use strict';
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectModal);
    } else {
        initProjectModal();
    }
    
    function initProjectModal() {
        // Vérifier si on est dans un sous-dossier de projets
        const currentPath = window.location.pathname;
        const isProjectPage = currentPath.includes('/projets/');
        
        if (!isProjectPage) return;
        
        // Calculer le chemin de retour vers la section projets (vers la racine du site Next.js)
        const backPath = '/#projects';
        
        // Récupérer le message personnalisé depuis le body si présent
        const customMessage = document.body.getAttribute('data-project-message');
        const messageHTML = customMessage 
            ? `<div class="portfolio-modal-custom-message">
                <i class="fas fa-info-circle"></i>
                <p>${customMessage}</p>
               </div>`
            : '';
        
        // Créer la modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="portfolio-modal-overlay"></div>
            <div class="portfolio-modal-content">
                <button class="portfolio-modal-close" aria-label="Fermer">
                    <i class="fas fa-times"></i>
                </button>
                <div class="portfolio-modal-body">
                    <i class="fas fa-arrow-left portfolio-modal-icon"></i>
                    <h3>Retour au Portfolio</h3>
                    <p>Vous consultez actuellement un projet. Cliquez ci-dessous pour revenir au portfolio principal.</p>
                    ${messageHTML}
                    <a href="${backPath}" class="portfolio-modal-btn">
                        <i class="fas fa-home"></i>
                        Retour au Portfolio
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Ouvrir la modal uniquement sur la page d'accueil du projet (index.html) et une seule fois par session
        const isIndexPage = currentPath.endsWith('/index.html') || currentPath.endsWith('/');
        const modalShown = sessionStorage.getItem('portfolioModalShown');
        
        if (isIndexPage && !modalShown) {
            setTimeout(() => {
                modal.classList.add('active');  
                sessionStorage.setItem('portfolioModalShown', 'true');
            }, 500);
        }
        
        // Gestion de la fermeture
        const closeBtn = modal.querySelector('.portfolio-modal-close');
        const overlay = modal.querySelector('.portfolio-modal-overlay');
        
        function closeModal() {
            modal.classList.remove('active');
        }
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Bouton flottant pour réouvrir la modal
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'portfolio-floating-btn';
        floatingBtn.innerHTML = '<i class="fas fa-home"></i>';
        floatingBtn.title = 'Retour au Portfolio';
        floatingBtn.setAttribute('aria-label', 'Retour au Portfolio');
        
        floatingBtn.addEventListener('click', () => {
            modal.classList.add('active');
            sessionStorage.removeItem('portfolioModalClosed');
        });
        
        document.body.appendChild(floatingBtn);
    }
})();