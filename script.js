const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

let visibleImages = [];


galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {

        visibleImages = [...document.querySelectorAll(
            ".gallery-item:not([style*='display: none']) img"
        )];

        const clickedImage = item.querySelector("img");

        currentIndex = visibleImages.indexOf(clickedImage);

        showImage();

        lightbox.classList.add("show");
    });
});


function showImage() {
    if (visibleImages.length === 0) return;

    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
}


nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();
});


prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();
});


closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }

});


document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeBtn.click();
    }

});


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});