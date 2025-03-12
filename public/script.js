const scrollButton = document.createElement('button');
scrollButton.className = 'fixed bottom-4 right-4 bg-green-700 z-50 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-green-800 hover:scale-110 opacity-0 pointer-events-none';
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        scrollButton.classList.add('opacity-0', 'pointer-events-none');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
const button = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (button && mobileMenu) {
    button.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !button.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    window.addEventListener('scroll', function() {
        mobileMenu.classList.add('hidden');
    });
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});





async function getAnswer() {
    const input = document.getElementById("userInput").value;
    const responseText = document.getElementById("response");

    // Tampilkan pesan "Thinking..." saat API sedang diproses
    responseText.innerText = "Thinking... ⏳";

    try {
        // Kirim teks ke Netlify Function, bukan API Hugging Face langsung
        const response = await fetch("/.netlify/functions/getAPIKey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input })  // Kirim teks input ke function
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            responseText.innerText = data[0].generated_text;
        } else if (data.hasOwnProperty("error")) {
            responseText.innerText = "Error: " + data.error;
        } else {
            responseText.innerText = "Gagal mendapatkan jawaban.";
        }
    } catch (error) {
        responseText.innerText = "Terjadi kesalahan: " + error.message;
    }
}
