// Complete translations object with all languages
// NU mai definim aici - folosim window.translations din translations-global-complete.js
if (!window.translations) {
    window.translations = {};
}

// Adăugăm traducerile locale la cele globale
const localTranslations = {
    ro: {
        // Navigation
        "nav.home": "Pagina Principală",
        "nav.about": "Despre",
        "nav.products": "Produse",
        "nav.contact": "Contact",
        "nav.login": "Autentificare",

        // Theme Toggle
        "theme.light": "Luminos",
        "theme.dark": "Întunecat",
        "theme.system": "Sistem",
        "theme.toggle": "Schimbă tema",

        // Hero Section
        "hero.title": "Cupole Decorative Metalice Iluminate Solar",
        "hero.subtitle": "Craftsmanship premium care combină designul ornamental tradițional cu tehnologia solară modernă pentru instalări rezidențiale și comerciale",
        "hero.cta.products": "Vezi Produse",
        "hero.cta.contact": "Contactează-ne",

        // About Section
        "about.title": "Despre MC",
        "about.subtitle": "Lideri în Inovație Solară și Artizanat Metalic",
        "about.description": "MC este specializată în crearea de cupole decorative metalice iluminate cu panouri solare. Fiecare piesă combină designul geometric complex cu tehnologia solară modernă, oferind atât frumusețe, cât și eficiență energetică.",
        "about.feature1.title": "Inovație Solară",
        "about.feature1.desc": "Panouri solare integrate pentru iluminare ecologică",
        "about.feature2.title": "Craftsmanship de Calitate",
        "about.feature2.desc": "Fabricație metalică precisă cu atenție la detalii",
        "about.feature3.title": "Soluții Personalizate",
        "about.feature3.desc": "Designuri unice adaptate fiecărui proiect",

        // Products Section
        "products.title": "Portofoliul Nostru",
        "products.subtitle": "Explorează instalările noastre de cupole solare",
        "products.card1.title": "Proiecte pentru Spații Comerciale și Festivaluri",
        "products.card1.desc": "Cupole metalice spectaculoase pentru evenimente și spații comerciale",
        "products.card2.title": "Proiect Rezidențial",
        "products.card2.desc": "Finisaj elegant pentru proprietăți private",
        "products.card3.title": "Proiecte Personalizate",
        "products.card3.desc": "Soluții unice adaptate nevoilor dumneavoastră",

        // How It Works
        "how.title": "Procesul Nostru",
        "how.step1.title": "Consultare",
        "how.step1.desc": "Discutăm viziunea și nevoile dumneavoastră",
        "how.step2.title": "Design",
        "how.step2.desc": "Creăm planuri personalizate pentru proiectul dvs.",
        "how.step3.title": "Fabricație",
        "how.step3.desc": "Construim cupola cu precizie și atenție",
        "how.step4.title": "Instalare",
        "how.step4.desc": "Instalare profesională și punere în funcțiune",

        // Contact Section
        "contact.title": "Contactați-ne",
        "contact.subtitle": "Să discutăm despre următorul dvs. proiect",
        "contact.name": "Nume",
        "contact.email": "Email",
        "contact.phone": "Telefon",
        "contact.company": "Companie (opțional)",
        "contact.message": "Mesaj",
        "contact.send": "Trimite Mesaj",
        "contact.sending": "Se trimite...",
        "contact.success": "Mesaj trimis cu succes!",
        "contact.error": "Nu s-a putut trimite mesajul. Încercați din nou.",

        // Virtual Assistant
        "assistant.title": "Maryna - Asistent MC",
        "assistant.online": "Online 24/7",
        "assistant.welcome": "Bună! Sunt Maryna, asistentul virtual MC MetSolArt. 😊\n\nSunt aici să te ajut cu informații despre produsele noastre, comenzi și orice întrebări ai avea. Cum te pot ajuta astăzi?",
        "assistant.placeholder": "Scrie un mesaj...",
        "assistant.minimize": "Minimizează",
        "assistant.close": "Închide",
        "assistant.openChat": "Deschide chat",
        "assistant.reopenChat": "Redeschide chat",
        "assistant.option.info": "Informații MC",
        "assistant.option.products": "Produse",
        "assistant.option.contact": "Contact Operator",
        "assistant.response.greeting": "Salut! Sunt aici pentru a-ți oferi informații complete despre soluțiile noastre premium de cupole solare. Cu ce te pot ajuta?",
        "assistant.response.about": "MC MetSolArt este o echipă tânără și dinamică cu 1 an de experiență ca firmă și 5 ani de lucru în domeniul proiectării CAD. Ne specializăm în crearea de cupole decorative metalice premium cu tehnologie solară integrată și soluții personalizate de înaltă calitate.",
        "assistant.response.domes": "MC se ocupă cu crearea de cupole decorative, logoui personalizate și cupole custom. Fiecare proiect este realizat cu atenție la detalii, combinând designul unic cu funcționalitatea premium.",
        "assistant.response.solar": "Integrăm tehnologie solară de vârf cu panouri fotovoltaice discrete și sisteme LED eficiente. Cupolele noastre oferă iluminare automată de la apus la răsărit, fără costuri de energie.",
        "assistant.response.materials": "Folosim exclusiv materiale premium: oțel inoxidabil, aliaje speciale rezistente la coroziune și finisaje durabile. Fiecare cupola este tratată pentru rezistență extremă la intemperii.",
        "assistant.response.price": "Investiția în cupolele MC variază între 2.500-15.000 EUR, în funcție de dimensiuni și personalizări. Oferim consultanță gratuită și devis personalizat în 24h.",
        "assistant.response.contact": "📸 Contactează echipa MC direct pe Instagram:\n\n🌟 <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>\n\nPe Instagram găsești:\n✅ Portofoliul nostru complet\n✅ Proiecte recente\n✅ Răspuns rapid la mesaje\n✅ Prețuri și detalii\n\n📧 Email: mc_metsolart@yahoo.com\n📱 Telefon: +40 123 456 789",
        "assistant.response.installation": "Serviciul nostru premium include: consultanță tehnică, transport securizat, instalare profesională și configurare completă. Garantăm instalarea perfectă în 1-2 zile.",
        "assistant.response.custom": "Excelăm în proiecte unice! Realizăm cupole personalizate după designul tău: dimensiuni speciale, finisaje exclusive, sisteme de iluminare avansate. Fiecare proiect este o creație unică.",
        "assistant.response.warranty": "Oferim garanție extinsă: 5 ani pentru structura metalică, 3 ani pentru sistemul solar și 2 ani pentru componentele LED. Service gratuit în primul an.",
        "assistant.response.delivery": "Livrăm în toată România în 5-10 zile lucrătoare. Transport securizat cu echipe specializate. Pentru proiecte internaționale, consultă-ne pentru detalii.",
        "assistant.response.portfolio": "Portofoliul nostru include peste 500 de instalări: vile de lux, hoteluri boutique, restaurante premium și spații comerciale. Vezi galeria noastră pentru inspirație.",
        "assistant.response.experience": "Suntem o echipă tânără și pasionată cu 1 an de experiență ca firmă MC MetSolArt și 5 ani de lucru în proiectare CAD. Combinăm creativitatea cu expertiza tehnică pentru rezultate excepționale.",
        "assistant.response.professional": "Ca specialist MC, îți pot oferi informații detaliate despre: specificații tehnice, opțiuni de personalizare, proces de instalare, garanții și servicii post-vânzare. Ce te interesează cel mai mult?",
        "assistant.response.thanks": "Cu mare plăcere! 😊\n\nDacă mai ai întrebări, sunt aici să te ajut!\n\nPoți să mă întrebi oricând despre produse, prețuri sau să programezi o consultație gratuită.",

        // Footer
        "footer.description": "Cupole decorative metalice premium iluminate cu tehnologie solară",
        "footer.quickLinks": "Link-uri Rapide",
        "footer.contact": "Contact",
        "footer.followUs": "Urmărește-ne",
        "footer.legal": "Informații Legale",
        "footer.terms": "Termeni și Condiții",
        "footer.privacy": "Politica de Confidențialitate",
        "footer.cookies": "Politica Cookies",
        "footer.gdpr": "GDPR",
        "footer.rights": "Toate drepturile rezervate.",

        // Login/Register
        "login.welcome": "Bine ai venit!",
        "login.subtitle": "Conectează-te pentru a accesa contul tău",
        "login.email": "Email",
        "login.password": "Parolă",
        "login.title": "Autentificare",
        "login.welcome": "Bine ai venit!",
        "login.subtitle": "Conectează-te pentru a accesa contul tău",
        "login.email": "Email",
        "login.email.placeholder": "exemplu@email.com",
        "login.password": "Parolă",
        "login.password.placeholder": "Introdu parola",
        "login.submit": "Conectează-te",
        "login.noAccount": "Nu ai cont? Înregistrează-te",
        "login.haveAccount": "Ai deja cont? Conectează-te",
        "login.error": "Email sau parolă incorectă. Te rog încearcă din nou.",
        
        "register.title": "Înregistrare",
        "register.firstName": "Prenume",
        "register.firstName.placeholder": "Prenumele tău",
        "register.lastName": "Nume de familie",
        "register.lastName.placeholder": "Numele de familie",
        "register.email": "Email",
        "register.email.placeholder": "exemplu@email.com",
        "register.password": "Parolă",
        "register.password.placeholder": "Minim 6 caractere",
        "register.confirmPassword": "Confirmă parola",
        "register.confirmPassword.placeholder": "Repetă parola",
        "register.submit": "Creează Cont",
        "register.error.emptyFields": "Te rog completează toate câmpurile",
        "register.error.passwordMismatch": "Parolele nu se potrivesc",
        "register.error.shortPassword": "Parola trebuie să aibă cel puțin 6 caractere",
        "profile.title": "Profilul Meu",
        "profile.editPhoto": "Schimbă poza",
        "profile.removePhoto": "Elimină poza",
        "profile.save": "Salvează modificările",
        "profile.logout": "Deconectare",
        
        // Additional Auth Messages
        "login.or": "SAU",
        "login.forgot": "Ai uitat parola?",
        "login.reset": "Resetează",
        "register.success": "Cont creat cu succes!",
        "register.agreeTerms": "Accept termenii și condițiile",
        "register.error.passwordTooShort": "Parola trebuie să aibă cel puțin 6 caractere",
        "register.error.passwordsNotMatching": "Parolele nu se potrivesc",
        "register.error.emailExists": "Email-ul este deja folosit"
    },

    uk: {
        // Navigation
        "nav.home": "Головна Сторінка",
        "nav.about": "Про нас",
        "nav.products": "Продукція",
        "nav.contact": "Контакти",
        "nav.login": "Увійти",

        // Theme Toggle
        "theme.light": "Світла",
        "theme.dark": "Темна",
        "theme.system": "Система",
        "theme.toggle": "Змінити тему",

        // Hero Section
        "hero.title": "Декоративні Металеві Куполи з Сонячною Енергією",
        "hero.subtitle": "Преміум майстерність, що поєднує традиційний орнаментальний дизайн із сучасною сонячною технологією для житлових та комерційних установок",
        "hero.cta.products": "Переглянути Продукцію",
        "hero.cta.contact": "Зв'язатися з Нами",

        // About Section
        "about.title": "Про MC",
        "about.subtitle": "Лідери в Сонячних Інноваціях та Металообробці",
        "about.description": "MC спеціалізується на створенні декоративних металевих куполів, освітлених сонячними панелями. Кожна деталь поєднує складний геометричний дизайн із сучасною сонячною технологією, забезпечуючи красу та енергоефективність.",
        "about.feature1.title": "Сонячні Інновації",
        "about.feature1.desc": "Інтегровані сонячні панелі для екологічного освітлення",
        "about.feature2.title": "Якісна Майстерність",
        "about.feature2.desc": "Точна металообробка з увагою до деталей",
        "about.feature3.title": "Індивідуальні Рішення",
        "about.feature3.desc": "Унікальні дизайни для кожного проекту",

        // Products Section
        "products.title": "Наше Портфоліо",
        "products.subtitle": "Дослідіть наші установки сонячних куполів",
        "products.card1.title": "Проекти для Комерційних Просторів та Фестивалів",
        "products.card1.desc": "Вражаючі металеві куполи для подій та комерційних просторів",
        "products.card2.title": "Житловий Проект",
        "products.card2.desc": "Елегантна обробка для приватних об'єктів",
        "products.card3.title": "Персоналізовані Проекти",
        "products.card3.desc": "Унікальні рішення адаптовані до ваших потреб",

        // How It Works
        "how.title": "Наш Процес",
        "how.step1.title": "Консультація",
        "how.step1.desc": "Обговорюємо ваше бачення та потреби",
        "how.step2.title": "Дизайн",
        "how.step2.desc": "Створюємо індивідуальні плани для вашого проекту",
        "how.step3.title": "Виробництво",
        "how.step3.desc": "Будуємо купол з точністю та увагою",
        "how.step4.title": "Установка",
        "how.step4.desc": "Професійна установка та введення в експлуатацію",

        // Contact Section
        "contact.title": "Зв'яжіться з Нами",
        "contact.subtitle": "Давайте обговоримо ваш наступний проект",
        "contact.name": "Ім'я",
        "contact.email": "Email",
        "contact.phone": "Телефон",
        "contact.company": "Компанія (необов'язково)",
        "contact.message": "Повідомлення",
        "contact.send": "Надіслати",
        "contact.sending": "Надсилання...",
        "contact.success": "Повідомлення успішно надіслано!",
        "contact.error": "Не вдалося надіслати. Спробуйте ще раз.",

        // Virtual Assistant
        "assistant.title": "Maryna - Асистент MC",
        "assistant.online": "Онлайн 24/7",
        "assistant.welcome": "Привіт! Я Maryna, віртуальний асистент MC MetSolArt. 😊\n\nЯ тут, щоб допомогти вам з інформацією про наші продукти, замовлення та будь-які питання. Як можу допомогти сьогодні?",
        "assistant.placeholder": "Напишіть повідомлення...",
        "assistant.minimize": "Згорнути",
        "assistant.close": "Закрити",
        "assistant.openChat": "Відкрити чат",
        "assistant.reopenChat": "Відновити чат",
        "assistant.option.info": "Інформація MC",
        "assistant.option.products": "Продукти",
        "assistant.option.contact": "Зв'язатися з оператором",
        "assistant.response.greeting": "Привіт! Я тут, щоб надати вам повну інформацію про наші преміум рішення сонячних куполів. Чим можу допомогти?",
        "assistant.response.about": "MC MetSolArt - це молода та динамічна команда з 1 роком досвіду як компанія та 5 роками роботи в CAD проектуванні. Ми спеціалізуємося на створенні преміум декоративних металевих куполів з інтегрованою сонячною технологією та високоякісних індивідуальних рішень.",
        "assistant.response.domes": "MC спеціалізується на створенні декоративних куполів, персоналізованих логотипів та індивідуальних куполів. Кожен проект виконується з увагою до деталей, поєднуючи унікальний дизайн з преміум функціональністю.",
        "assistant.response.solar": "Ми інтегруємо найкращу сонячну технологію з дискретними фотоелектричними панелями та ефективними LED системами. Наші куполи забезпечують автоматичне освітлення від заходу до сходу сонця без витрат на енергію.",
        "assistant.response.materials": "Використовуємо виключно преміум матеріали: нержавіючу сталь, спеціальні корозійностійкі сплави та довговічні покриття. Кожен купол обробляється для екстремальної стійкості до погодних умов.",
        "assistant.response.price": "Інвестиція в куполи MC варіюється від 2.500-15.000 EUR, залежно від розмірів та персоналізації. Пропонуємо безкоштовну консультацію та персональну пропозицію за 24 години.",
        "assistant.response.contact": "📸 Зв'яжіться з командою MC в Instagram:\n\n🌟 <a href='https://www.instagram.com/mc.metsolart/' target='_blank' rel='noopener noreferrer' style='color: #E1306C; font-weight: 600; text-decoration: none;'>@MC.MetSolArt</a>\n\nВ Instagram ви знайдете:\n✅ Наше повне портфоліо\n✅ Останні проекти\n✅ Швидка відповідь на повідомлення\n✅ Ціни та деталі\n\n📧 Email: mc_metsolart@yahoo.com\n📱 Телефон: +40 123 456 789",
        "assistant.response.installation": "Наш преміум сервіс включає: технічну консультацію, безпечне транспортування, професійну установку та повне налаштування. Гарантуємо ідеальну установку за 1-2 дні.",
        "assistant.response.custom": "Ми досконалі в унікальних проектах! Створюємо персоналізовані куполи за вашим дизайном: спеціальні розміри, ексклюзивні покриття, передові системи освітлення. Кожен проект - унікальне творіння.",
        "assistant.response.warranty": "Пропонуємо розширену гарантію: 5 років на металеву конструкцію, 3 роки на сонячну систему та 2 роки на LED компоненти. Безкоштовний сервіс у перший рік.",
        "assistant.response.delivery": "Доставляємо по всій Україні за 5-10 робочих днів. Безпечне транспортування зі спеціалізованими командами. Для міжнародних проектів консультуйтеся з нами.",
        "assistant.response.portfolio": "Наше портфоліо включає понад 500 установок: розкішні вілли, бутік-готелі, преміум ресторани та комерційні простори. Дивіться нашу галерею для натхнення.",
        "assistant.response.experience": "Ми молода та пристрасна команда з 1 роком досвіду як MC MetSolArt та 5 роками роботи в CAD проектуванні. Ми поєднуємо креативність з технічною експертизою для виняткових результатів.",
        "assistant.response.professional": "Як спеціаліст MC, можу надати детальну інформацію про: технічні специфікації, опції персоналізації, процес установки, гарантії та післяпродажні послуги. Що вас найбільше цікавить?",
        "assistant.response.thanks": "Будь ласка! 😊\n\nЯкщо у вас є ще питання, я тут, щоб допомогти!\n\nМожете запитати мене про продукти, ціни або запланувати безкоштовну консультацію.",

        // Footer
        "footer.description": "Преміум декоративні металеві куполи з сонячною технологією",
        "footer.quickLinks": "Швидкі Посилання",
        "footer.contact": "Контакти",
        "footer.followUs": "Слідкуйте за нами",
        "footer.legal": "Юридична Інформація",
        "footer.terms": "Умови та Положення",
        "footer.privacy": "Політика Конфіденційності",
        "footer.cookies": "Політика Cookies",
        "footer.gdpr": "GDPR",
        "footer.rights": "Всі права захищені.",

        // Login/Register
        "login.welcome": "Ласкаво просимо!",
        "login.subtitle": "Увійдіть, щоб отримати доступ до свого облікового запису",
        "login.email": "Email",
        "login.password": "Пароль",
        "login.button": "Увійти",
        "login.noAccount": "Немає облікового запису? Зареєструйтеся",
        "register.title": "Створити новий обліковий запис",
        "register.subtitle": "Заповніть дані для реєстрації",
        "register.firstName": "Ім'я",
        "register.firstName": "Ім'я",
        "register.firstName.placeholder": "Ваше ім'я",
        "register.lastName": "Прізвище",
        "register.lastName.placeholder": "Ваше прізвище",
        "register.email": "Email",
        "register.email.placeholder": "приклад@email.com",
        "register.password": "Пароль",
        "register.password.placeholder": "Мінімум 6 символів",
        "register.confirmPassword": "Підтвердіть пароль",
        "register.confirmPassword.placeholder": "Повторіть пароль",
        "register.button": "Створити обліковий запис",
        "register.hasAccount": "Вже є обліковий запис? Увійти",
        "profile.title": "Мій профіль",
        "profile.editPhoto": "Змінити фото",
        "profile.removePhoto": "Видалити фото",
        "profile.save": "Зберегти зміни",
        "profile.logout": "Вийти",
        
        // Additional Auth Messages
        "login.or": "АБО",
        "login.forgot": "Забули пароль?",
        "login.reset": "Скинути",
        "register.success": "Обліковий запис створено успішно!",
        "register.agreeTerms": "Я приймаю умови та положення",
        "register.error.passwordTooShort": "Пароль повинен мати щонайменше 6 символів",
        "register.error.passwordsNotMatching": "Паролі не збігаються",
        "register.error.emailExists": "Email уже використовується"
    },
    it: {
        // Navigation
        "nav.home": "Pagina Principale",
        "nav.about": "Chi Siamo",
        "nav.products": "Prodotti",
        "nav.contact": "Contatti",
        "nav.login": "Accedi",

        // Theme Toggle
        "theme.light": "Chiaro",
        "theme.dark": "Scuro",
        "theme.system": "Sistema",
        "theme.toggle": "Cambia tema",

        // Hero Section
        "hero.title": "Cupole Metalliche Decorative Illuminate a Energia Solare",
        "hero.subtitle": "Artigianato premium che combina design ornamentale tradizionale con moderna tecnologia solare per installazioni residenziali e commerciali",
        "hero.cta.products": "Vedi Prodotti",
        "hero.cta.contact": "Contattaci",

        // About Section
        "about.title": "Chi Siamo",
        "about.subtitle": "Leader nell'Innovazione Solare e nell'Artigianato Metallico",
        "about.description": "MC è specializzata nella creazione di cupole metalliche decorative illuminate con pannelli solari. Ogni pezzo combina design geometrico intricato con moderna tecnologia solare, offrendo bellezza ed efficienza energetica.",
        "about.feature1.title": "Innovazione Solare",
        "about.feature1.desc": "Pannelli solari integrati per illuminazione ecologica",
        "about.feature2.title": "Artigianato di Qualità",
        "about.feature2.desc": "Lavorazione metallica di precisione con attenzione ai dettagli",
        "about.feature3.title": "Soluzioni Personalizzate",
        "about.feature3.desc": "Design unici su misura per ogni progetto",

        // Products Section
        "products.title": "Il Nostro Portfolio",
        "products.subtitle": "Esplora le nostre installazioni di cupole solari",
        "products.card1.title": "Progetti per Spazi Commerciali e Festival",
        "products.card1.desc": "Cupole metalliche spettacolari per eventi e spazi commerciali",
        "products.card2.title": "Progetto Residenziale",
        "products.card2.desc": "Finitura elegante per proprietà private",
        "products.card3.title": "Progetti Personalizzati",
        "products.card3.desc": "Soluzioni uniche adattate alle vostre esigenze",

        // How It Works
        "how.title": "Il Nostro Processo",
        "how.step1.title": "Consultazione",
        "how.step1.desc": "Discutiamo la tua visione e le tue esigenze",
        "how.step2.title": "Design",
        "how.step2.desc": "Creiamo piani personalizzati per il tuo progetto",
        "how.step3.title": "Produzione",
        "how.step3.desc": "Costruiamo la cupola con precisione e cura",
        "how.step4.title": "Installazione",
        "how.step4.desc": "Installazione professionale e messa in servizio",

        // Contact Section
        "contact.title": "Contattaci",
        "contact.subtitle": "Parliamo del tuo prossimo progetto",
        "contact.name": "Nome",
        "contact.email": "Email",
        "contact.phone": "Telefono",
        "contact.company": "Azienda (opzionale)",
        "contact.message": "Messaggio",
        "contact.send": "Invia Messaggio",
        "contact.sending": "Invio in corso...",
        "contact.success": "Messaggio inviato con successo!",
        "contact.error": "Impossibile inviare il messaggio. Riprova.",

        // Virtual Assistant
        "assistant.title": "Maryna - Assistente MC",
        "assistant.online": "Online 24/7",
        "assistant.welcome": "Ciao! Sono Maryna, l'assistente virtuale di MC MetSolArt. 😊\n\nSono qui per aiutarti con informazioni sui nostri prodotti, ordini e qualsiasi domanda tu abbia. Come posso aiutarti oggi?",
        "assistant.placeholder": "Scrivi un messaggio...",
        "assistant.minimize": "Riduci a icona",
        "assistant.close": "Chiudi",
        "assistant.openChat": "Apri chat",
        "assistant.reopenChat": "Riapri chat",
        "assistant.option.info": "Informazioni MC",
        "assistant.option.products": "Prodotti",
        "assistant.option.contact": "Contatta Operatore",
        "assistant.response.greeting": "Ciao! Sono qui per fornirti informazioni complete sulle nostre soluzioni premium di cupole solari. Con cosa posso aiutarti?",
        "assistant.response.about": "MC MetSolArt è un team giovane e dinamico con 1 anno di esperienza come azienda e 5 anni di lavoro nella progettazione CAD. Ci specializziamo nella creazione di cupole decorative metalliche premium con tecnologia solare integrata e soluzioni personalizzate di alta qualità.",
        "assistant.response.domes": "MC si specializza nella creazione di cupole decorative, loghi personalizzati e cupole custom. Ogni progetto è realizzato con attenzione ai dettagli, combinando design unico con funzionalità premium.",
        "assistant.response.solar": "Integriamo tecnologia solare di punta con pannelli fotovoltaici discreti e sistemi LED efficienti. Le nostre cupole offrono illuminazione automatica dal tramonto all'alba, senza costi energetici.",
        "assistant.response.materials": "Utilizziamo esclusivamente materiali premium: acciaio inossidabile, leghe speciali resistenti alla corrosione e finiture durevoli. Ogni cupola è trattata per resistenza estrema alle intemperie.",
        "assistant.response.price": "L'investimento nelle cupole MC varia tra 2.500-15.000 EUR, a seconda delle dimensioni e personalizzazioni. Offriamo consulenza gratuita e preventivo personalizzato in 24h.",
        "assistant.response.contact": "📸 Contatta il team MC su Instagram:\n\n🌟 @mc.metal.art\n\nSu Instagram troverai:\n✅ Il nostro portfolio completo\n✅ Progetti recenti\n✅ Risposta rapida ai messaggi\n✅ Prezzi e dettagli\n\n📧 Email: mc_metsolart@yahoo.com\n📱 Telefono: +40 123 456 789",
        "assistant.response.installation": "Il nostro servizio premium include: consulenza tecnica, trasporto sicuro, installazione professionale e configurazione completa. Garantiamo installazione perfetta in 1-2 giorni.",
        "assistant.response.custom": "Eccelliamo in progetti unici! Realizziamo cupole personalizzate secondo il tuo design: dimensioni speciali, finiture esclusive, sistemi di illuminazione avanzati. Ogni progetto è una creazione unica.",
        "assistant.response.warranty": "Offriamo garanzia estesa: 5 anni per la struttura metallica, 3 anni per il sistema solare e 2 anni per i componenti LED. Servizio gratuito nel primo anno.",
        "assistant.response.delivery": "Consegniamo in tutta Italia in 5-10 giorni lavorativi. Trasporto sicuro con team specializzati. Per progetti internazionali, consultaci per dettagli.",
        "assistant.response.portfolio": "Il nostro portfolio include oltre 500 installazioni: ville di lusso, hotel boutique, ristoranti premium e spazi commerciali. Vedi la nostra galleria per ispirazione.",
        "assistant.response.experience": "Siamo un team giovane e appassionato con 1 anno di esperienza come MC MetSolArt e 5 anni di lavoro nella progettazione CAD. Combiniamo creatività con competenza tecnica per risultati eccezionali.",
        "assistant.response.professional": "Come specialista MC, posso fornirti informazioni dettagliate su: specifiche tecniche, opzioni di personalizzazione, processo di installazione, garanzie e servizi post-vendita. Cosa ti interessa di più?",
        "assistant.response.thanks": "Prego! 😊\n\nSe hai altre domande, sono qui per aiutarti!\n\nPuoi chiedermi informazioni su prodotti, prezzi o programmare una consulenza gratuita.",

        // Footer
        "footer.description": "Cupole metalliche decorative premium illuminate con tecnologia solare",
        "footer.quickLinks": "Link Rapidi",
        "footer.contact": "Contatti",
        "footer.followUs": "Seguici",
        "footer.legal": "Informazioni Legali",
        "footer.terms": "Termini e Condizioni",
        "footer.privacy": "Informativa sulla Privacy",
        "footer.cookies": "Politica sui Cookie",
        "footer.gdpr": "GDPR",
        "footer.rights": "Tutti i diritti riservati.",

        // Login/Register
        "login.welcome": "Bentornato!",
        "login.subtitle": "Accedi per accedere al tuo account",
        "login.email": "Email",
        "login.password": "Password",
        "login.button": "Accedi",
        "login.noAccount": "Non hai un account? Registrati",
        "register.title": "Crea nuovo account",
        "register.subtitle": "Compila i tuoi dati per registrarti",
        "register.firstName": "Nome",
        "register.firstName.placeholder": "Il tuo nome",
        "register.lastName": "Cognome",
        "register.lastName.placeholder": "Il tuo cognome",
        "register.email": "Email",
        "register.email.placeholder": "esempio@email.com",
        "register.password": "Password",
        "register.password.placeholder": "Minimo 6 caratteri",
        "register.confirmPassword": "Conferma password",
        "register.confirmPassword.placeholder": "Ripeti la password",
        "register.button": "Crea Account",
        "register.hasAccount": "Hai già un account? Accedi",
        "profile.title": "Il Mio Profilo",
        "profile.editPhoto": "Cambia foto",
        "profile.removePhoto": "Rimuovi foto",
        "profile.save": "Salva modifiche",
        "profile.logout": "Esci",
        
        // Additional Auth Messages
        "login.or": "OPPURE",
        "login.forgot": "Hai dimenticato la password?",
        "login.reset": "Ripristina",
        "register.success": "Account creato con successo!",
        "register.agreeTerms": "Accetto i termini e le condizioni",
        "register.error.passwordTooShort": "La password deve avere almeno 6 caratteri",
        "register.error.passwordsNotMatching": "Le password non corrispondono",
        "register.error.emailExists": "L'email è già stata utilizzata"
    },
    en: {
        // Navigation
        "nav.home": "Main Page",
        "nav.about": "About",
        "nav.products": "Products",
        "nav.contact": "Contact",
        "nav.login": "Login",

        // Theme Toggle
        "theme.light": "Light",
        "theme.dark": "Dark",
        "theme.system": "System",
        "theme.toggle": "Toggle theme",

        // Hero Section
        "hero.title": "Solar Powered Decorative Metal Domes",
        "hero.subtitle": "Premium craftsmanship combining traditional ornamental design with modern solar technology for residential and commercial installations",
        "hero.cta.products": "View Products",
        "hero.cta.contact": "Contact Us",

        // About Section
        "about.title": "About MC",
        "about.subtitle": "Leaders in Solar Innovation and Metal Craftsmanship",
        "about.description": "MC specializes in creating decorative metal domes illuminated with solar panels. Each piece combines intricate geometric design with modern solar technology, offering both beauty and energy efficiency.",
        "about.feature1.title": "Solar Innovation",
        "about.feature1.desc": "Integrated solar panels for eco-friendly lighting",
        "about.feature2.title": "Quality Craftsmanship",
        "about.feature2.desc": "Precision metalwork with attention to detail",
        "about.feature3.title": "Custom Solutions",
        "about.feature3.desc": "Unique designs tailored to each project",

        // Products Section
        "products.title": "Our Portfolio",
        "products.subtitle": "Explore our solar dome installations",
        "products.card1.title": "Projects for Commercial Spaces and Festivals",
        "products.card1.desc": "Spectacular metal domes for events and commercial spaces",
        "products.card2.title": "Residential Project",
        "products.card2.desc": "Elegant finish for private properties",
        "products.card3.title": "Custom Projects",
        "products.card3.desc": "Unique solutions tailored to your needs",

        // How It Works
        "how.title": "Our Process",
        "how.step1.title": "Consultation",
        "how.step1.desc": "We discuss your vision and requirements",
        "how.step2.title": "Design",
        "how.step2.desc": "We create custom plans for your project",
        "how.step3.title": "Manufacturing",
        "how.step3.desc": "We build your dome with precision and care",
        "how.step4.title": "Installation",
        "how.step4.desc": "Professional installation and commissioning",

        // Contact Section
        "contact.title": "Contact Us",
        "contact.subtitle": "Let's discuss your next project",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.company": "Company (optional)",
        "contact.message": "Message",
        "contact.send": "Send Message",
        "contact.sending": "Sending...",
        "contact.success": "Message sent successfully!",
        "contact.error": "Failed to send message. Please try again.",

        // Virtual Assistant
        "assistant.title": "Maryna - MC Assistant",
        "assistant.online": "Online 24/7",
        "assistant.welcome": "Hello! I'm Maryna, the MC MetSolArt virtual assistant. 😊\n\nI'm here to help you with information about our products, orders, and any questions you may have. How can I help you today?",
        "assistant.placeholder": "Type a message...",
        "assistant.minimize": "Minimize",
        "assistant.close": "Close",
        "assistant.openChat": "Open chat",
        "assistant.reopenChat": "Reopen chat",
        "assistant.option.info": "MC Information",
        "assistant.option.products": "Products",
        "assistant.option.contact": "Contact Operator",
        "assistant.response.greeting": "Hello! I'm here to provide you with comprehensive information about our premium solar dome solutions. How can I assist you?",
        "assistant.response.about": "MC MetSolArt is a young and dynamic team with 1 year of company experience and 5 years of CAD design work. We specialize in creating premium decorative metal domes with integrated solar technology and high-quality custom solutions.",
        "assistant.response.domes": "MC specializes in creating decorative domes, custom logos, and personalized domes. Each project is crafted with attention to detail, combining unique design with premium functionality.",
        "assistant.response.solar": "We integrate top-tier solar technology with discrete photovoltaic panels and efficient LED systems. Our domes provide automatic lighting from sunset to sunrise with zero energy costs.",
        "assistant.response.materials": "We use exclusively premium materials: stainless steel, special corrosion-resistant alloys, and durable finishes. Each dome is treated for extreme weather resistance.",
        "assistant.response.price": "Investment in MC domes ranges from €2,500-15,000, depending on size and customizations. We offer free consultation and personalized quote within 24h.",
        "assistant.response.contact": "📸 Contact MC team directly on Instagram:\n\n🌟 @mc.metal.art\n\nOn Instagram you'll find:\n✅ Our complete portfolio\n✅ Recent projects\n✅ Quick message response\n✅ Prices and details\n\n📧 Email: mc_metsolart@yahoo.com\n📱 Phone: +40 123 456 789",
        "assistant.response.installation": "Our premium service includes: technical consultation, secure transport, professional installation, and complete setup. We guarantee perfect installation in 1-2 days.",
        "assistant.response.custom": "We excel in unique projects! We create personalized domes to your design: special dimensions, exclusive finishes, advanced lighting systems. Each project is a unique creation.",
        "assistant.response.warranty": "We offer extended warranty: 5 years for metal structure, 3 years for solar system, and 2 years for LED components. Free service in the first year.",
        "assistant.response.delivery": "We deliver throughout Europe in 5-10 business days. Secure transport with specialized teams. For international projects, consult us for details.",
        "assistant.response.portfolio": "Our portfolio includes over 500 installations: luxury villas, boutique hotels, premium restaurants, and commercial spaces. See our gallery for inspiration.",
        "assistant.response.experience": "We are a young and passionate team with 1 year of experience as MC MetSolArt and 5 years of CAD design work. We combine creativity with technical expertise for exceptional results.",
        "assistant.response.professional": "As an MC specialist, I can provide detailed information about: technical specifications, customization options, installation process, warranties, and after-sales services. What interests you most?",
        "assistant.response.thanks": "You're very welcome! 😊\n\nIf you have any more questions, I'm here to help!\n\nFeel free to ask me about products, prices, or schedule a free consultation.",

        // Footer
        "footer.description": "Premium decorative metal domes illuminated with solar technology",
        "footer.quickLinks": "Quick Links",
        "footer.contact": "Contact",
        "footer.followUs": "Follow Us",
        "footer.legal": "Legal Information",
        "footer.terms": "Terms and Conditions",
        "footer.privacy": "Privacy Policy",
        "footer.cookies": "Cookie Policy",
        "footer.gdpr": "GDPR",
        "footer.rights": "All rights reserved.",

        // Login/Register
        "login.welcome": "Welcome back!",
        "login.subtitle": "Sign in to access your account",
        "login.email": "Email",
        "login.password": "Password",
        "login.button": "Sign In",
        "login.noAccount": "Don't have an account? Sign up",
        "register.title": "Create new account",
        "register.subtitle": "Fill in your details to register",
        "register.firstName": "First Name",
        "register.firstName.placeholder": "Your first name",
        "register.lastName": "Last Name",
        "register.lastName.placeholder": "Your last name",
        "register.email": "Email",
        "register.email.placeholder": "example@email.com",
        "register.password": "Password",
        "register.password.placeholder": "Minimum 6 characters",
        "register.confirmPassword": "Confirm Password",
        "register.confirmPassword.placeholder": "Repeat password",
        "register.button": "Create Account",
        "register.hasAccount": "Already have an account? Sign in",
        "profile.title": "My Profile",
        "profile.editPhoto": "Change photo",
        "profile.removePhoto": "Remove photo",
        "profile.save": "Save changes",
        "profile.logout": "Logout",
        
        // Additional Auth Messages
        "login.or": "OR",
        "login.forgot": "Forgot password?",
        "login.reset": "Reset",
        "register.success": "Account created successfully!",
        "register.agreeTerms": "I agree to the terms and conditions",
        "register.error.passwordTooShort": "Password must be at least 6 characters",
        "register.error.passwordsNotMatching": "Passwords do not match",
        "register.error.emailExists": "Email is already in use"
    }
};

// Îmbină traducerile locale cu cele globale
Object.keys(localTranslations).forEach(lang => {
    if (!window.translations[lang]) {
        window.translations[lang] = {};
    }
    Object.assign(window.translations[lang], localTranslations[lang]);
});

// Current language state
let currentLanguage = localStorage.getItem('language') || 'ro';

// Translation function - folosește window.translations
function t(key) {
    return window.translations[currentLanguage]?.[key] || window.translations['ro'][key] || key;
}

// Export translation function globally
window.t = t;

// Update all text elements with translations
function updateTranslations() {
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update placeholders specifically
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = t(key);
    });
}

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function setTheme(theme) {
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (systemTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.removeItem('theme');
    } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Language management
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Emit event pentru alte componente
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

    // Update current language display
    const currentLangCode = document.querySelector('.current-lang-code');
    const currentLangName = document.querySelector('.current-lang-name');

    const languages = {
        'ro': { name: 'Română', code: 'RO' },
        'uk': { name: 'Українська', code: 'UK' },
        'it': { name: 'Italiano', code: 'IT' },
        'en': { name: 'English', code: 'EN' }
    };

    if (currentLangCode) {
        currentLangCode.textContent = languages[lang].code;
    }
    if (currentLangName) {
        currentLangName.textContent = languages[lang].name;
    }

    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });

    // Update all translations
    updateTranslations();
    updateLoginSidebarTranslations();
}

// Update login sidebar translations
function updateLoginSidebarTranslations() {
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarSubtitle = document.querySelector('.sidebar-subtitle');
    const progressSteps = document.querySelectorAll('.progress-step span');

    // Check if we're on login or register view
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (registerForm && registerForm.style.display !== 'none') {
        // Register view
        if (sidebarTitle) sidebarTitle.textContent = t('register.title');
        if (sidebarSubtitle) sidebarSubtitle.textContent = t('register.subtitle');
        if (progressSteps[1]) progressSteps[1].textContent = t('register.title');
    } else {
        // Login view
        if (sidebarTitle) sidebarTitle.textContent = t('login.welcome');
        if (sidebarSubtitle) sidebarSubtitle.textContent = t('login.subtitle');
        if (progressSteps[0]) progressSteps[0].textContent = t('login.title');
    }

    // Update all data-text and data-placeholder elements in login sidebar
    updateTranslations();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Smooth scroll este gestionat de smooth-scroll.js
    // Nu mai blocăm navigarea cu #
    console.log('✅ Smooth scrolling delegat la smooth-scroll.js');
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeDropdown = document.getElementById('themeDropdown');

    if (themeToggleBtn) {
        // Direct toggle on click - no dropdown
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTheme();
        });
    }
}

// Language selector functionality
function initLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
            // Close theme dropdown if open
            const themeDropdown = document.getElementById('themeDropdown');
            if (themeDropdown) {
                themeDropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.remove('active');
        });

        // Language option clicks
        languageDropdown.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                changeLanguage(lang);
                languageDropdown.classList.remove('active');
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = t('contact.sending');
            submitBtn.disabled = true;

            // Colectează datele din formular
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Nu a fost furnizat',
                company: formData.get('company') || 'Nu a fost furnizată',
                message: formData.get('message')
            };

            try {
                // Trimite mesaj prin backend-ul nostru (API real)
                const response = await window.API.sendSupportMessage({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    subject: data.company ? `Mesaj de la ${data.name} (${data.company})` : `Mesaj de la ${data.name}`,
                    message: data.message
                });

                if (response.success) {
                    // Show success message
                    showNotification(
                        t('contact.success') || 'Mesaj trimis cu succes! Vă vom contacta în curând.', 
                        'success'
                    );
                    contactForm.reset();
                    
                    console.log('✅ Mesaj trimis cu succes către mc_metsolart@yahoo.com');
                    console.log('📧 Email va fi trimis automat când configurezi parola în config_email.py');
                } else {
                    throw new Error(response.message || 'Eroare la trimiterea mesajului');
                }
            } catch (error) {
                console.error('❌ Eroare la trimiterea formularului:', error);
                
                // Arată mesaj de eroare
                showNotification(
                    error.message || t('contact.error') || 'A apărut o eroare. Te rugăm să încerci din nou.', 
                    'error'
                );
                
                // Fallback: Deschide clientul de email doar dacă backend-ul nu răspunde
                if (error.message && error.message.includes('Failed to fetch')) {
                    const subject = encodeURIComponent(`Mesaj de la ${data.name} - MC MetSolArt`);
                    const body = encodeURIComponent(
                        `Nume: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Telefon: ${data.phone}\n` +
                        `Companie: ${data.company}\n\n` +
                        `Mesaj:\n${data.message}`
                    );
                    
                    if (confirm('Backend-ul nu răspunde. Doriți să deschideți clientul dvs. de email pentru a trimite mesajul?')) {
                        window.location.href = `mailto:mc_metsolart@yahoo.com?subject=${subject}&body=${body}`;
                        showNotification('Clientul de email a fost deschis. Vă rugăm să trimiteți mesajul.', 'info');
                    }
                }
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Virtual Assistant functionality
class VirtualAssistant {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.hasNewNotification = false;
        this.messages = [];
        this.isTyping = false;

        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.chatButton = document.getElementById('chatButton');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.notificationDot = document.getElementById('notificationDot');
    }

    initEventListeners() {
        if (this.chatButton) {
            this.chatButton.addEventListener('click', () => this.toggleChat());
        }

        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeChat());
        }
    }

    toggleChat() {
        if (this.isMinimized) {
            this.reopenChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        this.hasNewNotification = false;

        // Hide chat button with animation
        if (this.chatButton) {
            this.chatButton.classList.add('hidden');
        }

        if (this.chatWindow) {
            this.chatWindow.classList.add('active');
        }

        if (this.notificationDot) {
            this.notificationDot.classList.remove('active');
        }

        // Add welcome message if no messages exist
        if (this.messages.length === 0) {
            this.addMessage(t('assistant.welcome'), true);
        }

        // Eliminat scrollToBottom automat pentru a preveni repoziționarea la scroll rapid
    }

    minimizeChat() {
        this.isMinimized = true;

        if (this.chatWindow) {
            this.chatWindow.classList.remove('active');
        }

        if (this.chatButton) {
            this.chatButton.classList.add('minimized');
            this.chatButton.classList.remove('hidden');
        }
    }

    reopenChat() {
        this.isMinimized = false;
        this.hasNewNotification = false;

        if (this.chatWindow) {
            this.chatWindow.classList.add('active');
        }

        if (this.chatButton) {
            this.chatButton.classList.remove('minimized');
            this.chatButton.classList.add('hidden');
        }

        if (this.notificationDot) {
            this.notificationDot.classList.remove('active');
        }

        // Eliminat scrollToBottom automat pentru a preveni repoziționarea la scroll rapid
    }

    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        this.hasNewNotification = false;

        if (this.chatWindow) {
            this.chatWindow.classList.remove('active');
        }

        if (this.chatButton) {
            this.chatButton.classList.remove('minimized');
            this.chatButton.classList.remove('hidden');
        }

        if (this.notificationDot) {
            this.notificationDot.classList.remove('active');
        }

        // Clear messages on complete close
        this.messages = [];
        if (this.chatMessages) {
            this.chatMessages.innerHTML = '';
        }

        if (this.chatInput) {
            this.chatInput.value = '';
        }
    }

    sendMessage() {
        if (!this.chatInput || !this.chatInput.value.trim() || this.isTyping) return;

        const message = this.chatInput.value.trim();
        this.addMessage(message, false);
        this.chatInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate bot response delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.getBotResponse(message);
            this.addMessage(response, true);

            // Show notification if minimized
            if (this.isMinimized) {
                this.hasNewNotification = true;
                if (this.notificationDot) {
                    this.notificationDot.classList.add('active');
                }
            }
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, isBot) {
        const message = {
            id: Date.now().toString(),
            text: text,
            isBot: isBot,
            timestamp: new Date()
        };

        this.messages.push(message);
        this.renderMessage(message);
        // Eliminat scrollToBottom automat pentru a preveni repoziționarea la scroll rapid
    }

    renderMessage(message) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isBot ? 'bot' : 'user'}`;

        if (message.isBot) {
            messageDiv.innerHTML = `
        <div class="message-avatar bot">🤖</div>
        <div class="message-content bot">${message.text}</div>
      `;
        } else {
            messageDiv.innerHTML = `
        <div class="message-content user">${message.text}</div>
        <div class="message-avatar user">👤</div>
      `;
        }

        this.chatMessages.appendChild(messageDiv);
    }

    showTyping() {
        if (!this.chatMessages) return;

        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-message';
        typingDiv.innerHTML = `
      <div class="message-avatar bot">🤖</div>
      <div class="message-content bot">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;

        this.chatMessages.appendChild(typingDiv);
        // Eliminat scrollToBottom automat pentru a preveni repoziționarea la scroll rapid
    }

    hideTyping() {
        this.isTyping = false;
        const typingMessage = this.chatMessages?.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Greetings and introductions
        if (message.includes('salut') || message.includes('hello') || message.includes('привіт') || message.includes('ciao') || message.includes('bună') || message.includes('hi') || message.includes('hey')) {
            return t('assistant.response.greeting');
        }

        // About MC company
        if (message.includes('mc') || message.includes('companie') || message.includes('company') || message.includes('despre') || message.includes('about') || message.includes('chi siete') || message.includes('хто ви')) {
            return t('assistant.response.about');
        }

        // Solar domes and products
        if (message.includes('cupole') || message.includes('dome') || message.includes('купол') || message.includes('cupola') || message.includes('produs') || message.includes('product')) {
            return t('assistant.response.domes');
        }

        // Solar technology
        if (message.includes('solar') || message.includes('сонячн') || message.includes('solare') || message.includes('led') || message.includes('iluminat') || message.includes('lighting') || message.includes('illuminazione')) {
            return t('assistant.response.solar');
        }

        // Materials and craftsmanship
        if (message.includes('metal') || message.includes('материал') || message.includes('materiale') || message.includes('calitate') || message.includes('quality') || message.includes('qualità') || message.includes('якість')) {
            return t('assistant.response.materials');
        }

        // Pricing and quotes
        if (message.includes('preț') || message.includes('price') || message.includes('ціна') || message.includes('prezzo') || message.includes('cost') || message.includes('ofertă') || message.includes('quote') || message.includes('preventivo')) {
            return t('assistant.response.price');
        }

        // Installation services
        if (message.includes('instalare') || message.includes('install') || message.includes('установк') || message.includes('installazione') || message.includes('montaj') || message.includes('assembly') || message.includes('montaggio')) {
            return t('assistant.response.installation');
        }

        // Customization options
        if (message.includes('personalizat') || message.includes('custom') || message.includes('персоналізован') || message.includes('personalizzat') || message.includes('dimensiuni') || message.includes('size') || message.includes('dimensioni')) {
            return t('assistant.response.custom');
        }

        // Warranty and maintenance
        if (message.includes('garanție') || message.includes('warranty') || message.includes('гарантія') || message.includes('garanzia') || message.includes('mentenanță') || message.includes('maintenance') || message.includes('manutenzione')) {
            return t('assistant.response.warranty');
        }

        // Delivery and shipping
        if (message.includes('livrare') || message.includes('delivery') || message.includes('доставка') || message.includes('consegna') || message.includes('transport') || message.includes('shipping')) {
            return t('assistant.response.delivery');
        }

        // Portfolio and examples
        if (message.includes('portofoliu') || message.includes('portfolio') || message.includes('портфоліо') || message.includes('exemple') || message.includes('examples') || message.includes('esempi') || message.includes('lucrări') || message.includes('works')) {
            return t('assistant.response.portfolio');
        }

        // Contact information
        if (message.includes('contact') || message.includes('контакт') || message.includes('contatto') || message.includes('telefon') || message.includes('phone') || message.includes('email') || message.includes('adresă') || message.includes('address')) {
            return t('assistant.response.contact');
        }

        // Experience and expertise
        if (message.includes('experiență') || message.includes('experience') || message.includes('досвід') || message.includes('esperienza') || message.includes('ani') || message.includes('years') || message.includes('specializare') || message.includes('specialization')) {
            return t('assistant.response.experience');
        }

        // Professional response for unmatched queries
        return t('assistant.response.professional');
    }

    // Eliminat complet funcția scrollToBottom pentru a preveni repoziționarea automată
    // Dacă este nevoie, se poate adăuga doar la trimitere mesaj nou, nu la fiecare update
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    initTheme();

    // Mobile viewport height fix: set --vh to avoid 100vh issues on mobile browser chrome
    function setVh() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVh();
    window.addEventListener('resize', setVh);

    // Prevent programmatic scrolls from fighting user touch interactions.
    // When a touchstart occurs we mark a short window where programmatic scrolling is suppressed.
    // Eliminat complet override-urile la scrollTo, scrollBy, scrollIntoView pentru a nu interfera cu scroll-ul nativ

    // Show login badge on touch devices when user is NOT logged in
    function updateLoginBadge() {
        try {
            const badge = document.getElementById('loginBadge');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('authToken');
            const isTouch = (window.deviceInfo && (window.deviceInfo.isTouch || window.deviceInfo.isMobile || window.deviceInfo.isTablet)) || ('ontouchstart' in window);

            if (!badge) return;

            if (!isLoggedIn && isTouch) {
                badge.classList.add('show');
            } else {
                badge.classList.remove('show');
            }
        } catch (e) {
            console.warn('Could not update login badge:', e);
        }
    }

    // Update on load and when auth changes
    updateLoginBadge();
    window.addEventListener('storage', updateLoginBadge);
    document.addEventListener('userLoggedIn', updateLoginBadge);

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Initialize language
    changeLanguage(currentLanguage);

    // Initialize components
    initSmoothScrolling();
    initMobileMenu();
    initThemeToggle();
    initLanguageSelector();
    initContactForm();

    // Initialize Virtual Assistant
    const virtualAssistant = new VirtualAssistant();

    // Initialize Login Sidebar
    initLoginSidebar();

    // Initialize authentication system
    initAuthSystem();

    // Theme toggle event listener
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });

    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Login Sidebar Functionality
function initLoginSidebar() {
    const loginBtn = document.getElementById('loginBtn');
    const loginSidebar = document.getElementById('loginSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const loginForm = document.getElementById('loginForm');

    // Open login sidebar
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            openLoginSidebar();
        });
    }

    // Close sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            closeLoginSidebar();
        });
    }

    // Back button functionality
    const sidebarBack = document.getElementById('sidebarBack');
    if (sidebarBack) {
        sidebarBack.addEventListener('click', () => {
            handleBackButton();
        });
    }

    // Logo functionality
    const sidebarLogo = document.getElementById('sidebarLogo');
    if (sidebarLogo) {
        sidebarLogo.addEventListener('click', () => {
            handleLogoClick();
        });
    }

    // Close on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            closeLoginSidebar();
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Switch between login and register forms
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegisterForm);
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', showLoginForm);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginSidebar.classList.contains('active')) {
            closeLoginSidebar();
        }
    });
}

// --- Auth delegation wrappers (non-destructive)
// Prefer the centralized `window.Auth` implementations (exposed in auth-functions.js). If not available,
// fall back to the original local implementations captured below.
;(function delegateAuthToCanonical() {
    const originals = {
        showRegisterForm: window.showRegisterForm,
        showLoginForm: window.showLoginForm,
        handleRegister: window.handleRegister,
        handleLogin: window.handleLogin,
        startLoginTransition: window.startLoginTransition,
        initAuthSystem: window.initAuthSystem,
        getRegisteredUsers: window.getRegisteredUsers,
        getBlockedAccounts: window.getBlockedAccounts,
        logFailedAttempt: window.logFailedAttempt,
        resetFailedAttempts: window.resetFailedAttempts,
        blockAccount: window.blockAccount,
        unblockAccount: window.unblockAccount
    };

    function makeDelegator(name) {
        window[name] = function (...args) {
            try {
                if (window.Auth && typeof window.Auth[name] === 'function') {
                    return window.Auth[name].apply(this, args);
                }
            } catch (e) {
                // ignore and fall back
                console.warn(`Auth delegator for ${name} raised:`, e);
            }

            // Fallback to original if present
            if (typeof originals[name] === 'function') {
                return originals[name].apply(this, args);
            }

            // Otherwise no-op
            console.warn(`${name} not available (delegated and fallback absent)`);
        };
    }

    Object.keys(originals).forEach(makeDelegator);
})();

function openLoginSidebar() {
    const loginSidebar = document.getElementById('loginSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Show overlay
    sidebarOverlay.classList.add('active');

    // Slide in sidebar
    setTimeout(() => {
        loginSidebar.classList.add('active');
    }, 50);

    // Focus on email input
    setTimeout(() => {
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) {
            emailInput.focus();
        }
    }, 700);
}

function closeLoginSidebar() {
    const loginSidebar = document.getElementById('loginSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const loginError = document.getElementById('loginError');

    // Hide sidebar
    loginSidebar.classList.remove('active', 'expanding', 'full-page');
    sidebarOverlay.classList.remove('active');

    // Hide error message
    if (loginError) {
        loginError.classList.remove('show');
    }

    // Reset forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) {
        loginForm.reset();
        loginForm.style.display = 'flex';
        loginForm.style.opacity = '1';
        loginForm.style.transform = 'translateX(0)';
    }
    if (registerForm) {
        registerForm.reset();
        registerForm.style.display = 'none';
    }

    // Reset titles
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarSubtitle = document.querySelector('.sidebar-subtitle');
    const sidebarBack = document.getElementById('sidebarBack');
    if (sidebarTitle) sidebarTitle.textContent = 'Bine ai venit!';
    if (sidebarSubtitle) sidebarSubtitle.textContent = 'Conectează-te pentru a accesa contul tău';

    // Hide back button
    if (sidebarBack) {
        sidebarBack.style.display = 'none';
    }

    // Reset progress indicators
    updateProgressIndicators('login');
    // Reset sidebar content visibility
    const sidebarContent = document.getElementById('sidebarContent');
    if (sidebarContent) {
        sidebarContent.classList.remove('hidden');
    }

    // Clear account page container
    const accountContainer = document.getElementById('accountPageContainer');
    if (accountContainer) {
        accountContainer.classList.remove('visible');
        accountContainer.innerHTML = '';
    }
}

// User Management Functions (global scope)
/**
 * Returnează lista utilizatorilor înregistrați din localStorage.
 * Gestionază erorile și întoarce un array gol la nevoie.
 */
function getRegisteredUsers() {
    try {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error loading registered users:', error);
        return [];
    }
}

/**
 * Salvează lista utilizatorilor înregistrați în localStorage.
 * Întoarce true la succes, false la eroare.
 */
function saveRegisteredUsers(users) {
    try {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Error saving registered users:', error);
        return false;
    }
}

/**
 * Șterge toți utilizatorii înregistrați din localStorage.
 * Întoarce true/false în funcție de rezultat.
 */
function clearRegisteredUsers() {
    try {
        localStorage.removeItem('registeredUsers');
        console.log('All registered users cleared');
        return true;
    } catch (error) {
        console.error('Error clearing registered users:', error);
        return false;
    }
}

/**
 * Debug: Afișează utilizatorii înregistrați curent în consola.
 * Întoarce lista utilizatorilor.
 */
function debugShowRegisteredUsers() {
    const users = getRegisteredUsers();
    console.log('Currently registered users:', users);
    return users;
}

/**
 * Obține informații despre utilizator după email.
 * Caută întâi în lista înregistrată, apoi în utilizatorii de demo.
 */
function getUserInfo(email) {
    const normalizedEmail = email.toLowerCase();

    // Check in registered users first
    const registeredUsers = getRegisteredUsers();
    const registeredUser = registeredUsers.find(user => user.email.toLowerCase() === normalizedEmail);

    if (registeredUser) {
        return {
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            email: registeredUser.email,
            isRegisteredUser: true,
            registeredAt: registeredUser.registeredAt
        };
    }

    // Check in default demo users
    const defaultUsers = [
        { email: 'ion.popescu@email.com', firstName: 'Ion', lastName: 'Popescu' },
        { email: 'demo@mc.com', firstName: 'Demo', lastName: 'User' },
        { email: 'test@test.com', firstName: 'Test', lastName: 'User' }
    ];

    const defaultUser = defaultUsers.find(user => user.email.toLowerCase() === normalizedEmail);

    if (defaultUser) {
        return {
            firstName: defaultUser.firstName,
            lastName: defaultUser.lastName,
            email: defaultUser.email,
            isRegisteredUser: false
        };
    }

    return null;
}

/**
 * Gestionează procesul de autentificare a utilizatorului
 * Validează datele introduse, procesează cererea și gestionează răspunsul
 * @param {Event} e - Evenimentul de submit al formularului
 */
/**
 * Gestionează procesul de autentificare
 * 
 * Această funcție coordonează întregul proces de autentificare:
 * 1. Validează datele introduse de utilizator
 * 2. Verifică conexiunea la internet
 * 3. Gestionează starea de încărcare
 * 4. Autentifică utilizatorul
 * 5. Gestionează rezultatul autentificării (succes/eșec)
 * 
 * @param {Event} e - Evenimentul de submit al formularului
 */
async function handleLogin(e) {
    e.preventDefault();

    // Obține referințe la elementele DOM necesare
    const loginForm = document.getElementById('loginForm');
    const loginBtn = loginForm.querySelector('.btn-login');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    // Extrage și normalizează valorile introduse
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Resetează starea formularului
    resetFormState(loginForm);

    // Validează datele introduse
    if (!validateLoginData(email, password)) {
        return;
    }

    // Activează starea de încărcare
    setLoadingState(loginBtn, true);

    // Verifică conexiunea la internet
    if (!checkInternetConnection()) {
        setLoadingState(loginBtn, false);
        return;
    }

    try {
        // Autentifică utilizatorul (înlocuiește cu apel API real în producție)
        const loginResult = await authenticateUser(email, password);

        if (loginResult.success) {
            // Procesează autentificarea reușită
            await handleSuccessfulLogin(email);
        } else {
            // Procesează autentificarea eșuată
            handleFailedLogin(loginForm, loginResult.message);
        }
    } catch (error) {
        // Gestionează erorile neașteptate
        console.error('Eroare de autentificare:', error);
        logAuthError(error, email);
        showErrorMessage('A apărut o eroare neașteptată. Te rugăm să încerci din nou mai târziu.', 'error');
    } finally {
        // Resetează starea butonului
        setLoadingState(loginBtn, false);
    }
}

/**
 * Validează datele de autentificare introduse
 * @param {string} email - Adresa de email
 * @param {string} password - Parola
 * @returns {boolean} - Indică dacă datele sunt valide
 */
function validateLoginData(email, password) {
    // Verifică dacă câmpurile sunt completate
    if (!email || !password) {
        showErrorMessage('Te rugăm să completezi toate câmpurile.', 'error');
        return false;
    }

    // Validează formatul adresei de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Te rugăm să introduci o adresă de email validă.', 'error');
        return false;
    }

    // Validează lungimea parolei
    if (password.length < 6) {
        showErrorMessage('Parola trebuie să conțină cel puțin 6 caractere.', 'error');
        return false;
    }

    return true;
}

/**
 * Verifică conexiunea la internet
 * @returns {boolean} - Indică dacă există conexiune la internet
 */
function checkInternetConnection() {
    if (!navigator.onLine) {
        showErrorMessage('Nu există conexiune la internet. Verifică conexiunea și încearcă din nou.', 'error');
        return false;
    }
    return true;
}

/**
 * Autentifică utilizatorul (simulare)
 * @param {string} email - Adresa de email
 * @param {string} password - Parola
 * @returns {Promise<Object>} - Rezultatul autentificării
 */
async function authenticateUser(email, password) {
    // În producție, înlocuiește cu un apel API real
    return await simulateLogin(email, password);
}

/**
 * Gestionează autentificarea reușită
 * @param {string} email - Adresa de email a utilizatorului
 */
async function handleSuccessfulLogin(email) {
    // Obține informațiile utilizatorului
    const userInfo = getUserInfo(email.trim().toLowerCase());

    // Salvează informațiile utilizatorului pentru sesiunea curentă
    if (userInfo) {
        // Salvează în localStorage (în producție, folosește sesiuni securizate)
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        localStorage.setItem('authToken', generateAuthToken(userInfo));
        localStorage.setItem('lastLogin', new Date().toISOString());
        localStorage.setItem('isLoggedIn', 'true'); // Flag pentru sesiune persistentă

        // Înregistrează evenimentul de autentificare
        console.log('Utilizator autentificat:', userInfo);
    }

    // Afișează mesaj de succes și începe tranziția
    showErrorMessage('Autentificare reușită! Redirecționare...', 'success');
    await startLoginTransition();
}

/**
 * Generează un token de autentificare (simulare)
 * @param {Object} userInfo - Informațiile utilizatorului
 * @returns {string} - Token-ul generat
 */
function generateAuthToken(userInfo) {
    // În producție, acest token ar trebui generat de server
    return btoa(`${userInfo.email}:${Date.now()}:${Math.random().toString(36).substring(2)}`);
}

/**
 * Gestionează autentificarea eșuată
 * @param {HTMLElement} loginForm - Formularul de autentificare
 * @param {string} errorMessage - Mesajul de eroare
 */
function handleFailedLogin(loginForm, errorMessage) {
    // Afișează mesajul de eroare
    showErrorMessage(errorMessage || 'Datele introduse nu sunt corecte. Încearcă din nou.', 'error');

    // Animație de shake pentru formular
    loginForm.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        loginForm.style.animation = '';
    }, 500);
}

/**
 * Setează starea de încărcare pentru butonul de autentificare
 * @param {HTMLElement} button - Butonul de autentificare
 * @param {boolean} isLoading - Indică dacă este în stare de încărcare
 */
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.querySelector('span').textContent = 'Se conectează...';
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.querySelector('span').textContent = 'Conectează-te';
        button.disabled = false;
    }
}

/**
 * Resetează starea formularului
 * @param {HTMLElement} form - Formularul de autentificare
 */
function resetFormState(form) {
    const loginError = document.getElementById('loginError');
    if (loginError) {
        loginError.classList.remove('show');
    }
}

/**
 * Înregistrează erorile de autentificare pentru depanare
 * @param {Error} error - Eroarea apărută
 * @param {string} email - Adresa de email utilizată
 */
function logAuthError(error, email) {
    console.error(`Eroare de autentificare pentru ${email}:`, error);
    // În producție, trimite aceste erori către un serviciu de logging
}

/**
 * Simulează procesul de autentificare (înlocuiește cu un API real în producție)
 * @param {string} email - Adresa de email a utilizatorului
 * @param {string} password - Parola utilizatorului
 * @returns {Promise<Object>} - Rezultatul autentificării
 */
async function simulateLogin(email, password) {
    try {
        // Simulează întârzierea apelului API
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500) + 800));

        // Validează datele de intrare
        if (!email || !password) {
            return {
                success: false,
                message: 'Te rugăm să completezi toate câmpurile.',
                code: 'EMPTY_FIELDS'
            };
        }

        // Normalizează datele de intrare
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        // Simulează o eroare de rețea ocazională (1% șansă)
        if (Math.random() < 0.01) {
            throw new Error('Simulare eroare de rețea');
        }

        // Obține utilizatorii înregistrați din localStorage
        const registeredUsers = getRegisteredUsers();

        // Credențiale demo implicite (disponibile întotdeauna)
        const defaultCredentials = [
            {
                email: 'ion.popescu@email.com',
                password: 'password123',
                firstName: 'Ion',
                lastName: 'Popescu',
                role: 'admin'
            },
            {
                email: 'demo@mc.com',
                password: 'demo123',
                firstName: 'Demo',
                lastName: 'User',
                role: 'user'
            },
            {
                email: 'test@test.com',
                password: 'test123',
                firstName: 'Test',
                lastName: 'Account',
                role: 'user'
            }
        ];

        // Combină utilizatorii înregistrați cu credențialele implicite
        const allValidCredentials = [...defaultCredentials, ...registeredUsers];

        // Verifică dacă contul este blocat
        const blockedAccounts = getBlockedAccounts();
        if (blockedAccounts.includes(normalizedEmail)) {
            return {
                success: false,
                message: 'Acest cont a fost blocat temporar din cauza prea multor încercări eșuate. Te rugăm să încerci din nou mai târziu sau să resetezi parola.',
                code: 'ACCOUNT_LOCKED'
            };
        }

        // Verifică dacă email-ul există
        const user = allValidCredentials.find(cred => cred.email.toLowerCase() === normalizedEmail);

        if (!user) {
            // Înregistrează încercarea eșuată (în producție, limitează numărul de încercări)
            logFailedAttempt(normalizedEmail);

            return {
                success: false,
                message: 'Acest email nu este înregistrat în sistem.',
                code: 'EMAIL_NOT_FOUND'
            };
        }

        // Verifică dacă credențialele se potrivesc
        if (user.password === normalizedPassword) {
            // Resetează contorul de încercări eșuate
            resetFailedAttempts(normalizedEmail);

            return {
                success: true,
                message: 'Autentificare reușită!',
                code: 'SUCCESS',
                userData: {
                    email: user.email,
                    firstName: user.firstName || 'Utilizator',
                    lastName: user.lastName || '',
                    role: user.role || 'user'
                }
            };
        } else {
            // Înregistrează încercarea eșuată și verifică dacă trebuie blocat contul
            const attempts = logFailedAttempt(normalizedEmail);

            let message = 'Parola introdusă este incorectă. Te rugăm să încerci din nou.';
            let code = 'INVALID_PASSWORD';

            // Dacă sunt prea multe încercări eșuate, avertizează utilizatorul
            if (attempts >= 3) {
                message = `Parola introdusă este incorectă. Mai ai ${5 - attempts} încercări înainte ca contul să fie blocat temporar.`;
                code = 'PASSWORD_ATTEMPTS_WARNING';
            }

            // Dacă sunt 5 sau mai multe încercări eșuate, blochează contul
            if (attempts >= 5) {
                blockAccount(normalizedEmail);
                message = 'Contul a fost blocat temporar din cauza prea multor încercări eșuate. Te rugăm să încerci din nou mai târziu sau să resetezi parola.';
                code = 'ACCOUNT_LOCKED';
            }

            return {
                success: false,
                message: message,
                code: code
            };
        }
    } catch (error) {
        console.error('Eroare în simulateLogin:', error);
        return {
            success: false,
            message: 'A apărut o eroare la procesarea cererii. Te rugăm să încerci din nou.',
            code: 'SERVER_ERROR'
        };
    }
}

/**
 * Înregistrează o încercare eșuată de autentificare
 * @param {string} email - Adresa de email
 * @returns {number} - Numărul total de încercări eșuate
 */
function logFailedAttempt(email) {
    const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts') || '{}');
    failedAttempts[email] = (failedAttempts[email] || 0) + 1;
    localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
    return failedAttempts[email];
}

/**
 * Resetează contorul de încercări eșuate pentru un email
 * @param {string} email - Adresa de email
 */
function resetFailedAttempts(email) {
    const failedAttempts = JSON.parse(localStorage.getItem('failedLoginAttempts') || '{}');
    if (failedAttempts[email]) {
        delete failedAttempts[email];
        localStorage.setItem('failedLoginAttempts', JSON.stringify(failedAttempts));
    }
}

/**
 * Blochează temporar un cont
 * @param {string} email - Adresa de email
 */
function blockAccount(email) {
    const blockedAccounts = getBlockedAccounts();
    if (!blockedAccounts.includes(email)) {
        blockedAccounts.push(email);
        localStorage.setItem('blockedAccounts', JSON.stringify(blockedAccounts));

        // În producție, setează un timer pentru deblocare automată
        setTimeout(() => {
            unblockAccount(email);
        }, 30 * 60 * 1000); // 30 minute
    }
}

/**
 * Deblochează un cont
 * @param {string} email - Adresa de email
 */
function unblockAccount(email) {
    const blockedAccounts = getBlockedAccounts();
    const index = blockedAccounts.indexOf(email);
    if (index !== -1) {
        blockedAccounts.splice(index, 1);
        localStorage.setItem('blockedAccounts', JSON.stringify(blockedAccounts));
    }
    resetFailedAttempts(email);
}

/**
 * Obține lista conturilor blocate
 * @returns {Array<string>} - Lista de email-uri blocate
 */
function getBlockedAccounts() {
    return JSON.parse(localStorage.getItem('blockedAccounts') || '[]');
}

function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarSubtitle = document.querySelector('.sidebar-subtitle');
    const sidebarBack = document.getElementById('sidebarBack');

    // Update progress indicators
    updateProgressIndicators('register');

    // Hide login form with animation
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateX(-20px)';

    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(20px)';

        // Update titles
        sidebarTitle.textContent = 'Creează cont nou';
        sidebarSubtitle.textContent = 'Înregistrează-te pentru a accesa toate funcțiile';

        // Show back button
        if (sidebarBack) {
            sidebarBack.style.display = 'flex';
            sidebarBack.style.opacity = '0';
            setTimeout(() => {
                sidebarBack.style.opacity = '1';
            }, 100);
        }

        // Show register form with animation
        setTimeout(() => {
            registerForm.style.opacity = '1';
            registerForm.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarSubtitle = document.querySelector('.sidebar-subtitle');
    const sidebarBack = document.getElementById('sidebarBack');

    // Update progress indicators
    updateProgressIndicators('login');

    // Hide register form with animation
    registerForm.style.opacity = '0';
    registerForm.style.transform = 'translateX(20px)';

    setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';

        // Update titles
        sidebarTitle.textContent = 'Bine ai venit!';
        sidebarSubtitle.textContent = 'Conectează-te pentru a accesa contul tău';

        // Hide back button
        if (sidebarBack) {
            sidebarBack.style.opacity = '0';
            setTimeout(() => {
                sidebarBack.style.display = 'none';
            }, 200);
        }

        // Show login form with animation
        setTimeout(() => {
            loginForm.style.opacity = '1';
            loginForm.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

async function handleRegister(e) {
    e.preventDefault();

    const registerBtn = e.target.querySelector('.btn-login');
    const loginError = document.getElementById('loginError');

    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();

    // Hide previous errors
    loginError.classList.remove('show');

    // Validation
    if (password.length < 6) {
        showErrorMessage('Parola trebuie să aibă cel puțin 6 caractere.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showErrorMessage('Parolele nu se potrivesc.', 'error');
        return;
    }

    // Add loading state
    registerBtn.classList.add('loading');
    registerBtn.querySelector('span').textContent = 'Se creează contul...';

    try {
        // Simulate registration (replace with real API call)
        const isRegistered = await simulateRegistration(firstName, lastName, email, password);

        if (isRegistered) {
            // Show success message with user name
            showErrorMessage(`Bine ai venit, ${firstName}! Contul a fost creat cu succes.`, 'success');

            // Switch to login form after 2.5 seconds
            setTimeout(() => {
                showLoginForm();
                // Pre-fill email for convenience
                document.getElementById('loginEmail').value = email.trim();

                // Show helpful message
                setTimeout(() => {
                    showErrorMessage('Acum te poți conecta cu datele tale.', 'success');
                }, 500);
            }, 2500);

        } else {
            showErrorMessage('Acest email este deja înregistrat. Încearcă să te conectezi.', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showErrorMessage('A apărut o eroare. Te rog încearcă din nou.', 'error');
    } finally {
        // Remove loading state
        registerBtn.classList.remove('loading');
        registerBtn.querySelector('span').textContent = 'Creează Cont';
    }
}

async function simulateRegistration(firstName, lastName, email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Normalize input data
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();

    // Get existing registered users
    const registeredUsers = getRegisteredUsers();

    // Default emails that are always "taken"
    const reservedEmails = ['admin@mc.com', 'test@existing.com'];

    // Check if email already exists in registered users or reserved emails
    const emailExists = registeredUsers.some(user => user.email.toLowerCase() === normalizedEmail) ||
        reservedEmails.includes(normalizedEmail);

    if (emailExists) {
        return false; // Email already exists
    }

    // Save new user to localStorage
    const newUser = {
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        email: normalizedEmail,
        password: normalizedPassword,
        registeredAt: new Date().toISOString()
    };

    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    console.log('New user registered and saved:', {
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        email: normalizedEmail
    });

    return true; // Registration successful
}

async function handleRegister(e) {
    e.preventDefault();

    const registerBtn = e.target.querySelector('.btn-login');
    const loginError = document.getElementById('loginError');

    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();

    // Hide previous errors
    loginError.classList.remove('show');

    // Validation
    if (password.length < 6) {
        showErrorMessage('Parola trebuie să aibă cel puțin 6 caractere.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showErrorMessage('Parolele nu se potrivesc.', 'error');
        return;
    }

    // Add loading state
    registerBtn.classList.add('loading');
    registerBtn.querySelector('span').textContent = 'Se creează contul...';

    try {
        // Simulate registration (replace with real API call)
        const isRegistered = await simulateRegistration(firstName, lastName, email, password);

        if (isRegistered) {
            // Show success message with user name
            showErrorMessage(`Bine ai venit, ${firstName}! Contul a fost creat cu succes.`, 'success');

            // Switch to login form after 2.5 seconds
            setTimeout(() => {
                showLoginForm();
                // Pre-fill email for convenience
                document.getElementById('loginEmail').value = email.trim();

                // Show helpful message
                setTimeout(() => {
                    showErrorMessage('Acum te poți conecta cu datele tale.', 'success');
                }, 500);
            }, 2500);

        } else {
            showErrorMessage('Acest email este deja înregistrat. Încearcă să te conectezi.', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showErrorMessage('A apărut o eroare. Te rog încearcă din nou.', 'error');
    } finally {
        // Remove loading state
        registerBtn.classList.remove('loading');
        registerBtn.querySelector('span').textContent = 'Creează Cont';
    }
}

function handleBackButton() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Check which form is currently visible
    if (registerForm.style.display === 'flex' || window.getComputedStyle(registerForm).display === 'flex') {
        // We're on register form, go back to login
        showLoginForm();
    } else {
        // We're on login form, close the sidebar
        closeLoginSidebar();
    }
}

function handleLogoClick() {
    // Logo click always goes back to main page
    closeLoginSidebar();

    // Scroll to top of main page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Optional: Add a subtle notification
    showNotification('Înapoi la pagina principală', 'info');
}

function updateProgressIndicators(activeStep) {
    const steps = document.querySelectorAll('.progress-step');

    steps.forEach(step => {
        step.classList.remove('active');
        if (step.getAttribute('data-step') === activeStep) {
            step.classList.add('active');
        }
    });
}

/**
 * Afișează mesaje de feedback pentru utilizator (eroare, succes, avertisment, informație)
 * @param {string} message - Mesajul de afișat
 * @param {string} type - Tipul mesajului: 'error', 'success', 'warning', 'info'
 * @param {number} duration - Durata de afișare în milisecunde (0 pentru permanent)
 */
function showErrorMessage(message, type = 'error', duration = 0) {
    const loginError = document.getElementById('loginError');
    if (!loginError) {
        console.error('Element loginError nu a fost găsit!');
        return;
    }

    const errorMessage = loginError.querySelector('.error-message');
    const errorIcon = loginError.querySelector('i');

    if (!errorMessage || !errorIcon) {
        console.error('Elementele necesare pentru afișarea mesajului nu au fost găsite!');
        // Afișăm mesajul direct în elementul părinte dacă subelementele nu există
        loginError.textContent = message;
        loginError.classList.add('show');
        return;
    }

    // Resetează clasele anterioare
    loginError.classList.remove('error', 'success', 'warning', 'info');

    // Configurează iconița și culorile în funcție de tip
    switch (type) {
        case 'success':
            errorIcon.className = 'fas fa-check-circle';
            loginError.classList.add('success');
            // Auto-ascunde mesajele de succes după 3 secunde dacă nu este specificată o durată
            duration = duration || 3000;
            break;
        case 'warning':
            errorIcon.className = 'fas fa-exclamation-triangle';
            loginError.classList.add('warning');
            break;
        case 'info':
            errorIcon.className = 'fas fa-info-circle';
            loginError.classList.add('info');
            break;
        default: // error
            errorIcon.className = 'fas fa-exclamation-circle';
            loginError.classList.add('error');
            // Adaugă animație de shake pentru erori
            loginError.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginError.style.animation = '';
            }, 500);
            break;
    }

    // Setează textul mesajului
    errorMessage.textContent = message;

    // Afișează mesajul cu efect de fade in
    loginError.style.display = 'flex';
    loginError.style.opacity = '0';
    loginError.classList.add('show');

    // Efect de fade in
    setTimeout(() => {
        loginError.style.opacity = '1';
    }, 10);

    // Auto-ascunde mesajul după durata specificată (dacă este > 0)
    if (duration > 0) {
        setTimeout(() => {
            // Efect de fade out
            loginError.style.opacity = '0';
            setTimeout(() => {
                loginError.classList.remove('show');
            }, 300);
        }, duration);
    }

    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            loginError.classList.remove('show');
        }, 3000);
    }
}

/**
 * Gestionează tranziția vizuală și redirecționarea după autentificare
 * @returns {Promise<void>}
 */
async function startLoginTransition() {
    const loginSidebar = document.getElementById('loginSidebar');
    const sidebarContent = document.getElementById('sidebarContent');

    // Pasul 1: Ascunde conținutul formularului de autentificare cu efect de fade out
    sidebarContent.classList.add('hidden');

    // Pasul 2: Începe animația de expandare a sidebar-ului
    setTimeout(() => {
        loginSidebar.classList.add('expanding');

        // Afișează mesajul de încărcare în timpul tranziției
        const userInfo = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userName = userInfo.firstName || 'utilizator';

        sidebarContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-primary);">
                <div style="width: 60px; height: 60px; border: 3px solid var(--primary); border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Bine ai venit, ${userName}!</h3>
                <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Se încarcă contul tău...</p>
                <div style="width: 200px; height: 4px; background: rgba(var(--primary), 0.2); border-radius: 2px; margin-top: 1rem; overflow: hidden;">
                    <div style="width: 100%; height: 100%; background: var(--primary); border-radius: 2px; animation: progressBar 1.6s ease-out forwards;"></div>
                </div>
            </div>
        `;
        sidebarContent.classList.remove('hidden');
    }, 400);

    // Pasul 3: Continuă expandarea și pregătește redirecționarea
    setTimeout(() => {
        loginSidebar.classList.add('full-page');

        // Ascunde overlay-ul deoarece suntem în tranziție
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
    }, 1000);

    // Pasul 4: Închide sidebar-ul și deschide panelul de cont
    setTimeout(() => {
        // Stochează flag-ul de tranziție pentru a menține continuitatea
        sessionStorage.setItem('loginTransition', 'true');
        sessionStorage.setItem('transitionTimestamp', Date.now().toString());

        // Închide sidebar-ul de login
        loginSidebar.classList.remove('active', 'expanding', 'full-page');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.documentElement.classList.remove('no-scroll');

        // Actualizează UI-ul cu butonul de profil
        if (window.SessionManager && window.SessionManager.checkSession) {
            window.SessionManager.checkSession();
        }

        // Deschide panelul de cont integrat după o scurtă pauză
        setTimeout(() => {
            if (window.AccountPanel) {
                window.AccountPanel.show('dashboard');
            } else {
                console.warn('AccountPanel not available');
            }
        }, 300);
    }, 1600);
}

// Removed dynamic loading functions - now using direct redirect

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Add the shake animation to the document
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Development helper functions (available in console)
window.debugAuth = {
    showUsers: debugShowRegisteredUsers,
    clearUsers: clearRegisteredUsers,
    testLogin: async (email, password) => {
        console.log('Testing login for:', email);
        const result = await simulateLogin(email, password);
        console.log('Login result:', result);
        return result;
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    testRegister: async (firstName, lastName, email, password) => {
        console.log('Testing registration for:', email);
        const result = await simulateRegistration(firstName, lastName, email, password);
        console.log('Registration result:', result);
        return result;
    }
};

function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarSubtitle = document.querySelector('.sidebar-subtitle');
    const sidebarBack = document.getElementById('sidebarBack');

    // Update progress indicators
    updateProgressIndicators('register');

    // Hide login form with animation
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateX(-20px)';

    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(20px)';

        // Update titles
        sidebarTitle.textContent = 'Creează cont nou';
        sidebarSubtitle.textContent = 'Înregistrează-te pentru a accesa toate funcțiile';

        // Show back button
        if (sidebarBack) {
            sidebarBack.style.display = 'flex';
            sidebarBack.style.opacity = '0';
            setTimeout(() => {
                sidebarBack.style.opacity = '1';
            }, 100);
        }

        // Show register form with animation
        setTimeout(() => {
            registerForm.style.opacity = '1';
            registerForm.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

function initAuthSystem() {
    // Show helpful info in console for development
    console.log('🔐 Authentication System Initialized');
    console.log('📝 Registered users:', getRegisteredUsers().length);
    console.log('🛠️  Debug commands available: window.debugAuth');
    console.log('💡 Demo credentials: demo@mc.com / demo123');
    console.log('📋 Pentru a testa înregistrarea: Folosește formularul de înregistrare din sidebar');

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        console.log('👤 Current user:', user.firstName + ' ' + user.lastName);
    }
}

// ==========================================
// PROFESSIONAL FORM INITIALIZATION
// ==========================================

/**
 * Initialize all form functionality after DOM is loaded
 */
function initProfessionalForms() {
    initFormValidation();
    initPasswordStrength();
    initFormSubmitHandlers();
    initAlertHandlers();
    initButtonStates();
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const registerFirstName = document.getElementById('registerFirstName');
    const registerLastName = document.getElementById('registerLastName');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const registerConfirmPassword = document.getElementById('registerConfirmPassword');
    const registerTerms = document.getElementById('registerTerms');

    // Login form validation
    if (loginEmail) {
        loginEmail.addEventListener('blur', function() {
            if (this.value && !this.value.includes('@')) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    }

    // Register form validations
    if (registerEmail) {
        registerEmail.addEventListener('blur', function() {
            if (this.value && !this.value.includes('@')) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    }

    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            if (registerConfirmPassword) {
                if (this.value !== registerConfirmPassword.value) {
                    registerConfirmPassword.classList.add('error');
                } else {
                    registerConfirmPassword.classList.remove('error');
                }
            }
        });
    }

    if (registerConfirmPassword) {
        registerConfirmPassword.addEventListener('input', function() {
            if (registerPassword) {
                if (this.value !== registerPassword.value) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            }
        });
    }
}

/**
 * Initialize password strength indicator
 */
function initPasswordStrength() {
    const registerPassword = document.getElementById('registerPassword');
    const passwordStrength = document.getElementById('passwordStrength');

    if (registerPassword && passwordStrength) {
        registerPassword.addEventListener('input', function() {
            const strength = getPasswordStrength(this.value);
            passwordStrength.className = 'password-strength ' + strength.level;
        });
    }
}

/**
 * Get password strength level
 */
function getPasswordStrength(password) {
    if (password.length < 6) {
        return { level: 'weak', score: 1 };
    } else if (password.length < 8) {
        return { level: 'medium', score: 2 };
    } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        return { level: 'strong', score: 3 };
    }
    return { level: 'medium', score: 2 };
}

/**
 * Initialize form submit handlers
 */
function initFormSubmitHandlers() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (typeof handleLogin === 'function') {
                handleLogin.call(this, e);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (typeof handleRegister === 'function') {
                handleRegister.call(this, e);
            }
        });
    }
}

/**
 * Initialize alert close handlers
 */
function initAlertHandlers() {
    const alertCloseButtons = document.querySelectorAll('.alert-close');

    alertCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            if (alert) {
                alert.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize button states and hover effects
 */
function initButtonStates() {
    const formButtons = document.querySelectorAll('.btn-submit, .btn-switch');

    formButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

/**
 * Add CSS error class styling
 */
function addErrorStyling() {
    const style = document.createElement('style');
    style.textContent = `
        .form-input.error {
            border-color: var(--destructive) !important;
            background-color: rgba(220, 38, 38, 0.03);
        }
        
        .form-input.error:focus {
            box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// INITIALIZE EVERYTHING ON DOM READY
// ==========================================

// Add error styling immediately
addErrorStyling();

// Re-initialize professional forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all elements to be ready
    setTimeout(function() {
        initProfessionalForms();
        console.log('✅ Professional forms initialized');
    }, 100);
});

// Export for testing
window.debugAuth = {
    showUsers: () => console.table(getRegisteredUsers()),
    clearUsers: () => localStorage.removeItem('registeredUsers'),
    logout: () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        window.location.reload();
    },
    testLogin: (email, password) => {
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = password;
    },
    createDemoUser: () => {
        const users = getRegisteredUsers();
        const demoUser = {
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@mc.com',
            password: 'demo123',
            registeredAt: new Date().toISOString(),
            avatar: null,
            role: 'member'
        };
        users.push(demoUser);
        saveRegisteredUsers(users);
        console.log('✅ Demo user created! Email: demo@mc.com, Password: demo123');
    }
};

// Eliminat: definiție duplicată showErrorMessage. Se folosește versiunea îmbunătățită definită anterior.


