const navSlide = () => {
    const burguer = document.querySelector('.burguer');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    burguer.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
                header.style.animation = `h1FadeOut 0.5s ease backwards ${index / 5 - 0.25}s`;
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
                header.style.animation = `h1FadeIn 0.5s ease forwards ${index / 5 - 0.25}s`;
            }
        });

        // Burguer Animation
        burguer.classList.toggle('toggle');
    });
}

navSlide();

const spacer = document.querySelector('.space');

