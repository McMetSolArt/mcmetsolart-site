/**
 * ASISTENT VIRTUAL PROFESIONAL - MC MetSolArt
 * Versiune Premium cu toate funcționalitățile
 */

(function() {
    'use strict';

    console.log('%c🤖 ASISTENT VIRTUAL PROFESIONAL', 'color: #3b82f6; font-size: 16px; font-weight: bold;');

    // Așteaptă ca DOM-ul să fie gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🚀 Inițializare asistent...');
        
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const minimizeBtn = document.getElementById('minimizeChat');
        const closeBtn = document.getElementById('closeChat');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');
        const chatMessages = document.getElementById('chatMessages');
        
        if (!chatButton || !chatWindow) {
            console.error('❌ Elementele asistentului nu au fost găsite!');
            return;
        }
        
        console.log('✅ Elemente găsite!');
        
        let isOpen = false;
        let isMinimized = false;
        
        // ==========================================
        // DESCHIDE CHAT
        // ==========================================
        chatButton.addEventListener('click', function() {
            console.log('👆 Buton chat apăsat');
            openChat();
        });
        
        function openChat() {
            isOpen = true;
            isMinimized = false;
            chatWindow.classList.add('active');
            chatButton.classList.add('hidden');
            chatButton.classList.remove('minimized');
            console.log('✅ Chat deschis');
            
            // Afișează mesajul de bun venit dacă nu există mesaje
            if (chatMessages && chatMessages.children.length === 0) {
                showWelcomeMessage();
            }
            
            // Focus pe input
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
        
        // ==========================================
        // MESAJ DE BUN VENIT
        // ==========================================
        function showWelcomeMessage() {
            const currentLang = localStorage.getItem('language') || 'ro';
            
            let welcomeText = '';
            
            if (currentLang === 'ro') {
                welcomeText = `Bună! Sunt Maryna, asistentul virtual MC MetSolArt. 😊

Sunt aici să te ajut cu informații despre produsele noastre, comenzi și orice întrebări ai avea. Cum te pot ajuta astăzi?`;
            } else if (currentLang === 'en') {
                welcomeText = `Hello! I'm Maryna, MC MetSolArt's virtual assistant. 😊

I'm here to help you with information about our products, orders, and any questions you may have. How can I help you today?`;
            } else if (currentLang === 'uk') {
                welcomeText = `Привіт! Я Марина, віртуальний асистент MC MetSolArt. 😊

Я тут, щоб допомогти вам з інформацією про наші продукти, замовлення та будь-які питання, які у вас можуть виникнути. Як я можу вам допомогти сьогодні?`;
            } else if (currentLang === 'it') {
                welcomeText = `Ciao! Sono Maryna, l'assistente virtuale di MC MetSolArt. 😊

Sono qui per aiutarti con informazioni sui nostri prodotti, ordini e qualsiasi domanda tu possa avere. Come posso aiutarti oggi?`;
            }
            
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar bot';
            
            // Maryna folosește imaginea Maryna.png
            const img = document.createElement('img');
            img.src = 'Maryna.png';
            img.alt = 'Maryna';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            avatar.appendChild(img);
            
            const content = document.createElement('div');
            content.className = 'message-content bot';
            content.textContent = welcomeText;
            content.style.whiteSpace = 'pre-line';
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
            chatMessages.appendChild(messageDiv);
        }
        
        // ==========================================
        // MINIMIZEAZĂ CHAT
        // ==========================================
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('👆 Minimize apăsat');
                minimizeChat();
            });
        }
        
        function minimizeChat() {
            isOpen = false;
            isMinimized = true;
            chatWindow.classList.remove('active');
            chatButton.classList.remove('hidden');
            chatButton.classList.add('minimized');
            console.log('✅ Chat minimizat');
        }
        
        // ==========================================
        // ÎNCHIDE CHAT (șterge conversația)
        // ==========================================
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('👆 Close apăsat - șterge conversația');
                closeChat();
            });
        }
        
        function closeChat() {
            isOpen = false;
            isMinimized = false;
            chatWindow.classList.remove('active');
            chatButton.classList.remove('hidden');
            chatButton.classList.remove('minimized');
            
            // Șterge toată conversația
            if (chatMessages) {
                chatMessages.innerHTML = '';
                console.log('🗑️ Conversație ștearsă');
            }
            
            console.log('✅ Chat închis');
        }
        
        // ==========================================
        // TRIMITE MESAJ
        // ==========================================
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                sendMessage();
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        function sendMessage() {
            if (!chatInput || !chatMessages) return;
            
            const message = chatInput.value.trim();
            if (!message) return;
            
            console.log('📝 Mesaj trimis:', message);
            
            // Adaugă mesajul utilizatorului
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Arată typing indicator
            showTyping();
            
            // Răspunde după 1 secundă
            setTimeout(() => {
                hideTyping();
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
        
        function addMessage(text, type) {
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message`;
            
            const avatar = document.createElement('div');
            avatar.className = `message-avatar ${type}`;
            
            // Avatar personalizat
            if (type === 'bot') {
                // Maryna folosește imaginea Maryna.png
                const img = document.createElement('img');
                img.src = 'Maryna.png';
                img.alt = 'Maryna';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '50%';
                avatar.appendChild(img);
            } else {
                // User folosește poza de profil din localStorage sau default
                const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
                const profilePicture = userProfile.profilePicture || 'default-avatar.png';
                
                const img = document.createElement('img');
                img.src = profilePicture;
                img.alt = 'User';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '50%';
                img.onerror = function() {
                    // Fallback la emoji dacă imaginea nu se încarcă
                    this.style.display = 'none';
                    avatar.textContent = '👤';
                };
                avatar.appendChild(img);
            }
            
            const content = document.createElement('div');
            content.className = `message-content ${type}`;
            content.innerHTML = text;
            content.style.whiteSpace = 'pre-line';
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
            chatMessages.appendChild(messageDiv);
            
            // Scroll la final
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function showTyping() {
            if (!chatMessages) return;
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typingIndicator';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar bot';
            
            // Maryna folosește imaginea Maryna.png
            const img = document.createElement('img');
            img.src = 'Maryna.png';
            img.alt = 'Maryna';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            avatar.appendChild(img);
            
            const content = document.createElement('div');
            content.className = 'message-content bot';
            content.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
            
            typingDiv.appendChild(avatar);
            typingDiv.appendChild(content);
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function hideTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) {
                typing.remove();
            }
        }
        
        // ==========================================
        // RĂSPUNSURI INTELIGENTE MULTILINGVE
        // ==========================================
        function getResponse(message) {
            const msg = message.toLowerCase();
            
            // Obține limba curentă
            const currentLang = localStorage.getItem('language') || 'ro';
            
            // Funcție helper pentru traduceri
            function t(key) {
                if (typeof window.t === 'function') {
                    return window.t(key);
                }
                // Fallback
                const translations = window.translations || {};
                return translations[currentLang]?.[key] || key;
            }
            
            // Salutări
            if (msg.match(/\b(buna|salut|hello|hi|hey|привіт|ciao)\b/)) {
                return t('assistant.response.greeting');
            }
            
            // Informații despre companie
            if (msg.match(/\b(info|despre|companie|mc|about|company|про|chi)\b/)) {
                return t('assistant.response.about');
            }
            
            // Produse
            if (msg.match(/\b(produs|cupol|solar|catalog|product|dome|продукт)\b/)) {
                return t('assistant.response.domes');
            }
            
            // Prețuri
            if (msg.match(/\b(pret|cost|cat costa|tarif|price|ціна|prezzo)\b/)) {
                return t('assistant.response.price');
            }
            
            // Contact
            if (msg.match(/\b(contact|telefon|email|adresa|phone|контакт)\b/)) {
                return t('assistant.response.contact');
            }
            
            // Livrare
            if (msg.match(/\b(livrare|transport|cand|timp|delivery|доставка|consegna)\b/)) {
                return t('assistant.response.delivery');
            }
            
            // Garanție
            if (msg.match(/\b(garantie|service|mentenanta|warranty|гарантія|garanzia)\b/)) {
                return t('assistant.response.warranty');
            }
            
            // Materiale
            if (msg.match(/\b(material|metal|otel|steel|метал|acciaio)\b/)) {
                return t('assistant.response.materials');
            }
            
            // Instalare
            if (msg.match(/\b(instalare|montaj|installation|встановлення|installazione)\b/)) {
                return t('assistant.response.installation');
            }
            
            // Personalizare
            if (msg.match(/\b(personalizat|custom|індивідуальн|personalizzat)\b/)) {
                return t('assistant.response.custom');
            }
            
            // Portofoliu
            if (msg.match(/\b(portofoliu|lucrari|portfolio|портфоліо)\b/)) {
                return t('assistant.response.portfolio');
            }
            
            // Experiență
            if (msg.match(/\b(experienta|ani|experience|досвід|esperienza)\b/)) {
                return t('assistant.response.experience');
            }
            
            // Mulțumiri
            if (msg.match(/\b(multumesc|mersi|thanks|thank|дякую|grazie)\b/)) {
                return t('assistant.response.thanks') || "Cu plăcere! 😊";
            }
            
            // Ajutor
            if (msg.match(/\b(ajutor|help|допомога|aiuto)\b/)) {
                return t('assistant.response.professional');
            }
            
            // Default
            return t('assistant.response.professional');
        }
        
        // ==========================================
        // QUICK OPTIONS
        // ==========================================
        const quickOptions = document.querySelectorAll('.quick-option-btn');
        quickOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                const option = this.getAttribute('data-option');
                handleQuickOption(option);
            });
        });
        
        function handleQuickOption(option) {
            if (!chatMessages) return;
            
            // Obține limba curentă
            const currentLang = localStorage.getItem('language') || 'ro';
            
            let userMessage = '';
            let botResponse = '';
            
            switch(option) {
                case 'info':
                    // Mesaj utilizator
                    if (currentLang === 'ro') userMessage = 'Vreau informații despre MC MetSolArt';
                    else if (currentLang === 'en') userMessage = 'I want information about MC MetSolArt';
                    else if (currentLang === 'uk') userMessage = 'Хочу інформацію про MC MetSolArt';
                    else if (currentLang === 'it') userMessage = 'Voglio informazioni su MC MetSolArt';
                    
                    // Răspuns bot - MAI NATURAL
                    if (currentLang === 'ro') {
                        botResponse = `Cu plăcere! 😊

Suntem MC MetSolArt - echipă tânără din România, specializată în cupole decorative și logoui metalice personalizate.

✨ 5 ani experiență CAD
🎨 Proiecte 100% personalizate
💪 Creativitate + precizie tehnică
🏆 Calitate premium

Transformăm idei în realitate - de la concept la finalizare!

Vrei să vezi ce creăm? 🏛️`;
                    } else if (currentLang === 'en') {
                        botResponse = `With pleasure! 😊

We are MC MetSolArt - young team from Romania, specialized in decorative domes and custom metal logos.

✨ 5 years CAD experience
🎨 100% personalized projects
💪 Creativity + technical precision
🏆 Premium quality

We turn ideas into reality - from concept to completion!

Want to see what we create? 🏛️`;
                    } else if (currentLang === 'uk') {
                        botResponse = `З задоволенням! 😊

Ми MC MetSolArt - молода команда з Румунії, спеціалізуємося на декоративних куполах та металевих логотипах.

✨ 5 років досвіду CAD
🎨 100% персоналізовані проекти
💪 Креативність + технічна точність
🏆 Преміум якість

Перетворюємо ідеї в реальність - від концепції до завершення!

Хочете побачити, що ми створюємо? 🏛️`;
                    } else if (currentLang === 'it') {
                        botResponse = `Con piacere! 😊

Siamo MC MetSolArt - team giovane dalla Romania, specializzato in cupole decorative e loghi metallici personalizzati.

✨ 5 anni esperienza CAD
🎨 Progetti 100% personalizzati
💪 Creatività + precisione tecnica
🏆 Qualità premium

Trasformiamo idee in realtà - dal concetto al completamento!

Vuoi vedere cosa creiamo? 🏛️`;
                    }
                    break;
                    
                case 'products':
                    // Mesaj utilizator
                    if (currentLang === 'ro') userMessage = 'Vreau să văd produsele';
                    else if (currentLang === 'en') userMessage = 'I want to see the products';
                    else if (currentLang === 'uk') userMessage = 'Хочу побачити продукти';
                    else if (currentLang === 'it') userMessage = 'Voglio vedere i prodotti';
                    
                    // Răspuns bot - MAI NATURAL
                    if (currentLang === 'ro') {
                        botResponse = `Perfect! Iată ce creăm: 🎨

🏛️ Cupole Decorative
Elegante, durabile, cu iluminare solară. Pentru case și clădiri comerciale.

🎨 Logoui Personalizate
Brandul tău în 3D metalic! Design CAD profesional, rezultate impresionante.

✨ Proiecte Custom
Orice idee, orice dimensiune - de la concept la realizare!

📸 Vezi portofoliul: @mc.metal.art

Ce te interesează? 💬`;
                    } else if (currentLang === 'en') {
                        botResponse = `Perfect! Here's what we create: 🎨

🏛️ Decorative Domes
Elegant, durable, with solar lighting. For homes and commercial buildings.

🎨 Custom Logos
Your brand in 3D metal! Professional CAD design, impressive results.

✨ Custom Projects
Any idea, any size - from concept to completion!

📸 See portfolio: @mc.metal.art

What interests you? 💬`;
                    } else if (currentLang === 'uk') {
                        botResponse = `Чудово! Ось що ми створюємо: 🎨

🏛️ Декоративні куполи
Елегантні, довговічні, з сонячним освітленням. Для будинків та комерційних будівель.

🎨 Персоналізовані логотипи
Ваш бренд у 3D металі! Професійний CAD дизайн, вражаючі результати.

✨ Індивідуальні проекти
Будь-яка ідея, будь-який розмір - від концепції до завершення!

📸 Дивіться портфоліо: @mc.metal.art

Що вас цікавить? 💬`;
                    } else if (currentLang === 'it') {
                        botResponse = `Perfetto! Ecco cosa creiamo: 🎨

🏛️ Cupole Decorative
Eleganti, durevoli, con illuminazione solare. Per case ed edifici commerciali.

🎨 Loghi Personalizzati
Il tuo brand in 3D metallico! Design CAD professionale, risultati impressionanti.

✨ Progetti Personalizzati
Qualsiasi idea, qualsiasi dimensione - dal concetto al completamento!

📸 Vedi portfolio: @mc.metal.art

Cosa ti interessa? 💬`;
                    }
                    break;
                    
                case 'contact':
                    // Mesaj utilizator
                    if (currentLang === 'ro') userMessage = 'Cum vă pot contacta?';
                    else if (currentLang === 'en') userMessage = 'How can I contact you?';
                    else if (currentLang === 'uk') userMessage = 'Як я можу з вами зв\'язатися?';
                    else if (currentLang === 'it') userMessage = 'Come posso contattarvi?';
                    
                    // Răspuns bot - MAI NATURAL
                    if (currentLang === 'ro') {
                        botResponse = `Super! Iată cum ne găsești: 😊

📸 Instagram: <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>
Cel mai rapid! Răspundem imediat + vezi portofoliul complet.

📧 Email: mc_metsolart@yahoo.com
Răspuns în 24h.

💬 WhatsApp: +40 123 456 789
Luni-Vineri, 09:00-18:00

💡 Recomandare: Începe pe Instagram - e cel mai rapid! ✨

Pe ce canal preferi? 💬`;
                    } else if (currentLang === 'en') {
                        botResponse = `Great! Here's how to find us: 😊

📸 Instagram: <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>
Fastest! Instant response + see full portfolio.

📧 Email: mc_metsolart@yahoo.com
Response within 24h.

💬 WhatsApp: +40 123 456 789
Mon-Fri, 09:00-18:00

💡 Tip: Start on Instagram - it's fastest! ✨

Which channel do you prefer? 💬`;
                    } else if (currentLang === 'uk') {
                        botResponse = `Чудово! Ось як нас знайти: 😊

📸 Instagram: <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>
Найшвидше! Миттєва відповідь + повне портфоліо.

📧 Email: mc_metsolart@yahoo.com
Відповідь протягом 24 годин.

💬 WhatsApp: +40 123 456 789
Пн-Пт, 09:00-18:00

💡 Порада: Почніть з Instagram - найшвидше! ✨

Який канал віддаєте перевагу? 💬`;
                    } else if (currentLang === 'it') {
                        botResponse = `Fantastico! Ecco come trovarci: 😊

📸 Instagram: <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>
Il più veloce! Risposta immediata + portfolio completo.

📧 Email: mc_metsolart@yahoo.com
Risposta entro 24h.

💬 WhatsApp: +40 123 456 789
Lun-Ven, 09:00-18:00

💡 Consiglio: Inizia su Instagram - è il più veloce! ✨

Quale canale preferisci? 💬`;
                    }
                    break;
            }
            
            // Adaugă mesajele
            if (userMessage) {
                addMessage(userMessage, 'user');
                
                // Arată typing
                showTyping();
                
                // Răspunde după 1.5 secunde
                setTimeout(() => {
                    hideTyping();
                    if (botResponse) {
                        addMessage(botResponse, 'bot');
                    }
                }, 1500);
            }
        }
        
        // ==========================================
        // ASCULTĂ SCHIMBĂRI DE LIMBĂ
        // ==========================================
        window.addEventListener('languageChanged', function(e) {
            console.log('🌍 Limba schimbată în:', e.detail.language);
            
            // Actualizează mesajul de bun venit dacă există
            const welcomeMsg = chatMessages?.querySelector('.bot-message:first-child .message-content');
            if (welcomeMsg && chatMessages.children.length === 1) {
                const currentLang = e.detail.language;
                const t = window.t || function(key) { return key; };
                welcomeMsg.textContent = t('assistant.welcome');
            }
        });
        
        // ==========================================
        // ASCULTĂ SCHIMBĂRI DE PROFIL (AVATAR)
        // ==========================================
        window.addEventListener('profileUpdated', function(e) {
            console.log('👤 Profil actualizat - actualizez avatarele din chat');
            
            // Actualizează toate avatarele utilizatorului din chat
            if (chatMessages) {
                const userAvatars = chatMessages.querySelectorAll('.message-avatar.user img');
                const newProfilePicture = e.detail?.profilePicture || JSON.parse(localStorage.getItem('userProfile') || '{}').profilePicture;
                
                if (newProfilePicture) {
                    userAvatars.forEach(img => {
                        img.src = newProfilePicture;
                    });
                    console.log('✅ Avatare actualizate în chat');
                }
            }
        });
        
        // Ascultă și schimbările din localStorage
        window.addEventListener('storage', function(e) {
            if (e.key === 'userProfile' && chatMessages) {
                console.log('👤 Profil schimbat în alt tab - actualizez avatarele');
                const userProfile = JSON.parse(e.newValue || '{}');
                const newProfilePicture = userProfile.profilePicture;
                
                if (newProfilePicture) {
                    const userAvatars = chatMessages.querySelectorAll('.message-avatar.user img');
                    userAvatars.forEach(img => {
                        img.src = newProfilePicture;
                    });
                }
            }
        });
        
        console.log('✅ Asistent virtual gata!');
        console.log('💡 Testează: Click pe butonul chat!');
    }

})();



