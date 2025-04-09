document.addEventListener('DOMContentLoaded', function() {

    // Początkowy rozmiar tekstu 
    let rozmiarTekstu = 16;
    
    // Funkcja aktualizująca rozmiar tekstu na stronie
    function zmienRozmiarTekstu() {
        document.documentElement.style.fontSize = rozmiarTekstu + 'px';
    }
    
    // Obsługa przycisku POWIĘKSZ tekst (A+)
    const przyciskPlus = document.getElementById('powiekszTekst');
    if (przyciskPlus) {
        przyciskPlus.addEventListener('click', function() {
            // Maksymalny rozmiar 22px
            if (rozmiarTekstu < 22) {
                rozmiarTekstu += 2;
                zmienRozmiarTekstu();
                // Zapisano wybrany rozmiar w pamięci przeglądarki
                localStorage.setItem('zapisanyRozmiar', rozmiarTekstu);
            }
        });
    }
    
    // Obsługa przycisku POMNIEJSZ tekst (A-)
    const przyciskMinus = document.getElementById('pomniejszTekst');
    if (przyciskMinus) {
        przyciskMinus.addEventListener('click', function() {
            // Minimalny rozmiar tekstu to 12px
            if (rozmiarTekstu > 12) {
                rozmiarTekstu -= 2;
                zmienRozmiarTekstu();
                localStorage.setItem('zapisanyRozmiar', rozmiarTekstu);
            }
        });
    }
    
    // Obsługa przycisku NORMALNY kontrast
    const przyciskNormalny = document.getElementById('normalnyKontrast');
    if (przyciskNormalny) {
        przyciskNormalny.addEventListener('click', function() {
            document.body.setAttribute('data-kontrast', 'normal');
            localStorage.setItem('zapisanyKontrast', 'normal');
        });
    }
    
    // Obsługa przycisku WYSOKI kontrast
    const przyciskWysoki = document.getElementById('wysokiKontrast');
    if (przyciskWysoki) {
        przyciskWysoki.addEventListener('click', function() {
            document.body.setAttribute('data-kontrast', 'wysoki');
            localStorage.setItem('zapisanyKontrast', 'wysoki');
        });
    }
    
    // Sprawdzenie zapisanych ustawień w przeglądarce
    const zapisanyRozmiar = localStorage.getItem('zapisanyRozmiar');
    const zapisanyKontrast = localStorage.getItem('zapisanyKontrast');
    
    // Przywrócenie zapisanego rozmiaru tekstu
    if (zapisanyRozmiar) {
        rozmiarTekstu = parseInt(zapisanyRozmiar);
        zmienRozmiarTekstu();
    }
    
    // Przywrócenie zapisanego trybu kontrastu
    if (zapisanyKontrast) {
        document.body.setAttribute('data-kontrast', zapisanyKontrast);
    }
    
    // Obsługa menu mobilnego (przycisk hamburger)
    const przyciskMenu = document.querySelector('.przycisk-menu');
    if (przyciskMenu) {
        przyciskMenu.addEventListener('click', function() {
            const menu = document.querySelector('nav');
            if (menu) {
                menu.classList.toggle('aktywny');
            }
        });
    }
    
    // Automatyczna zmiana banerów (karuzela)
    const banery = document.querySelectorAll('.baner img');
    if (banery.length > 1) {
        let pokazywanyBaner = 0;
        banery[pokazywanyBaner].classList.add('aktywny');
        
        // Rotacja banerów co 5 sekund
        setInterval(function() {
            banery[pokazywanyBaner].classList.remove('aktywny');
            pokazywanyBaner = (pokazywanyBaner + 1) % banery.length;
            banery[pokazywanyBaner].classList.add('aktywny');
        }, 5000);
    }
    
    // Płynne przewijanie do sekcji
    const linki = document.querySelectorAll('a[href^="#"]');
    linki.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cel = this.getAttribute('href');
            if (cel === '#') return;
            
            const element = document.querySelector(cel);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Automatyczne zamykanie menu na mobile
                if (window.innerWidth <= 768) {
                    const menu = document.querySelector('nav');
                    if (menu) {
                        menu.classList.remove('aktywny');
                    }
                }
            }
        });
    });

});