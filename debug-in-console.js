/**
 * COPIAZĂ ȘI LIPEȘTE ACEST COD ÎN CONSOLA BROWSER (F12) PE PAGINA PRINCIPALĂ
 * http://localhost:4000
 */

console.clear();
console.log('%c🔍 DIAGNOSTICE AUTO-HIDE HEADER', 'background: #000; color: #0f0; font-size: 20px; padding: 10px;');

// 1. Verifică dacă header-ul există
const header = document.querySelector('.header-main');
if (header) {
    console.log('%c✅ Header găsit: .header-main', 'color: #0f0; font-weight: bold');
    console.log('📏 Dimensiuni:', header.offsetWidth + 'x' + header.offsetHeight + 'px');
    console.log('📍 Position:', getComputedStyle(header).position);
    console.log('🎨 Z-index:', getComputedStyle(header).zIndex);
    console.log('🔄 Transform:', getComputedStyle(header).transform);
    console.log('⏱️ Transition:', getComputedStyle(header).transition);
    console.log('📋 Clase:', header.className);
    console.log('🎯 Element:', header);
} else {
    console.log('%c❌ Header NU a fost găsit! (.header-main)', 'color: #f00; font-weight: bold');
}

// 2. Verifică CSS-ul auto-hide-header.css
const stylesheets = Array.from(document.styleSheets);
const autoHideCSS = stylesheets.find(s => s.href && s.href.includes('auto-hide-header.css'));
if (autoHideCSS) {
    console.log('%c✅ CSS auto-hide-header.css încărcat', 'color: #0f0; font-weight: bold');
    console.log('📄 URL:', autoHideCSS.href);
    try {
        const rules = Array.from(autoHideCSS.cssRules || autoHideCSS.rules);
        console.log('📄 Reguli CSS găsite:', rules.length);
        rules.forEach(rule => {
            if (rule.selectorText && rule.selectorText.includes('header')) {
                console.log('🎯', rule.selectorText + ':', rule.style.cssText);
            }
        });
    } catch (e) {
        console.log('%c⚠️ Nu pot citi regulile CSS:', 'color: #fa0', e.message);
    }
} else {
    console.log('%c❌ CSS auto-hide-header.css NU este încărcat!', 'color: #f00; font-weight: bold');
    console.log('📄 CSS-uri încărcate:', stylesheets.map(s => s.href).filter(h => h));
}

// 3. Verifică scriptul auto-hide-header.js
const scripts = Array.from(document.scripts);
const autoHideJS = scripts.find(s => s.src && s.src.includes('auto-hide-header.js'));
if (autoHideJS) {
    console.log('%c✅ Script auto-hide-header.js încărcat', 'color: #0f0; font-weight: bold');
    console.log('📍 Src:', autoHideJS.src);
} else {
    console.log('%c❌ Script auto-hide-header.js NU este încărcat!', 'color: #f00; font-weight: bold');
    console.log('📜 Scripturi încărcate:', scripts.map(s => s.src).filter(s => s));
}

// 4. Verifică conflicte CSS
if (header) {
    console.log('%c🔍 Verificare Conflicte CSS:', 'color: #0af; font-weight: bold');
    const computed = getComputedStyle(header);
    
    // Verifică dacă transform este suprascris
    if (computed.transform === 'none') {
        console.log('%c⚠️ Transform este "none" - posibil conflict CSS!', 'color: #fa0; font-weight: bold');
    } else {
        console.log('✅ Transform:', computed.transform);
    }
    
    // Verifică transition
    if (!computed.transition || computed.transition === 'all 0s ease 0s') {
        console.log('%c⚠️ Transition lipsește sau este 0s!', 'color: #fa0; font-weight: bold');
    } else {
        console.log('✅ Transition:', computed.transition);
    }
    
    // Verifică will-change
    if (computed.willChange && computed.willChange !== 'auto') {
        console.log('✅ Will-change:', computed.willChange);
    } else {
        console.log('%c⚠️ Will-change lipsește sau este "auto"', 'color: #fa0');
    }
}

// 5. Test manual
console.log('%c🧪 TEST MANUAL:', 'color: #0af; font-weight: bold');
if (header) {
    console.log('Adaug clasa .header-hidden...');
    header.classList.add('header-hidden');
    header.classList.remove('header-visible');
    
    setTimeout(() => {
        const transform = getComputedStyle(header).transform;
        console.log('Transform după .header-hidden:', transform);
        
        if (transform !== 'none' && !transform.includes('matrix(1, 0, 0, 1, 0, 0)')) {
            console.log('%c✅ Transform aplicat! Header ar trebui să fie ascuns.', 'color: #0f0; font-weight: bold');
        } else {
            console.log('%c❌ Transform NU s-a aplicat!', 'color: #f00; font-weight: bold');
        }
        
        // Revin la vizibil
        console.log('Revin la .header-visible...');
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
        
        setTimeout(() => {
            const transform2 = getComputedStyle(header).transform;
            console.log('Transform după .header-visible:', transform2);
        }, 100);
    }, 500);
}

console.log('%c📊 CONCLUZIE:', 'color: #0af; font-size: 16px; font-weight: bold');
console.log('Verifică mesajele de mai sus pentru a identifica problema.');
