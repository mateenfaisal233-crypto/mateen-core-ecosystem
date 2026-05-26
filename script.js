// Mateen.Core - Interactivity Engine
document.addEventListener('DOMContentLoaded', () => {
    // Core Notification System
    const showNotification = (message, isError = false) => {
        const notify = document.createElement('div');
        notify.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--card-tech-slate);
            border: 1px solid ${isError ? '#ef4444' : 'var(--electric-blue)'};
            padding: 1rem 2rem;
            border-radius: 4px;
            color: white;
            z-index: 3000;
            animation: fade-in-up 0.4s ease-out;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        `;
        notify.innerText = message;
        document.body.appendChild(notify);
        setTimeout(() => {
            notify.style.opacity = '0';
            notify.style.transition = 'opacity 0.5s ease';
            setTimeout(() => notify.remove(), 500);
        }, 3000);
    };

    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const formData = new FormData(form);

            btn.innerText = 'TRANSMITTING...';
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    showNotification('Requirements Transmitted Successfully!');
                    form.reset();
                } else {
                    showNotification('Transmission Failed. Try again.', true);
                }
                btn.innerText = 'TRANSMIT REQUIREMENTS';
            }).catch(error => {
                showNotification('Connection Error. Check internet.', true);
                btn.innerText = 'TRANSMIT REQUIREMENTS';
            });
        });
    }

    // Poetry Switching Logic
    const poetButtons = document.querySelectorAll('.poet-btn');
    const shersContainer = document.getElementById('shers-display');

    const poetryData = {
        "Ghalib": [
            { text: "Hazaron khwahishen aisi ke har khwahish pe dam nikle...", detail: "Theme: Unending human desires and their weight on the soul." },
            { text: "Dil-e-nadan tujhe hua kya hai, Akhir is dard ki dawa kya hai?", detail: "Theme: Questioning the heart's innocence in the face of suffering." },
            { text: "Ishq ne Ghalib nikamma kar diya, Varna hum bhi aadmi thay kaam ke.", detail: "Theme: The transformative and often destructive power of love." },
            { text: "Bas-ki dushwar hai har kaam ka asaan hona...", detail: "Theme: The philosophical struggle of existence and simplicity." },
            { text: "Aah ko chahiye ek umr asar hone tak...", detail: "Theme: The patience required for prayers and sighs to find fulfillment." },
            { text: "Nukta-chin hai gham-e-dil usko sunaye na bane...", detail: "Theme: The difficulty of expressing deep sorrow to a critical world." },
            { text: "Hum ko malum hai jannat ki haqiqat lekin...", detail: "Theme: Reality vs. the beautiful illusions we create for comfort." },
            { text: "Hasti ke mat fareb mein aa jaiyo Asad...", detail: "Theme: Warning against the deceptions of material existence." },
            { text: "Rone se aur ishq mein be-bak ho gaye...", detail: "Theme: Finding strength and boldness through the release of grief." },
            { text: "Zindagi apni jab is shakl se guzri Ghalib...", detail: "Theme: A reflection on a life spent in constant struggle." }
        ],
        "Iqbal": [
            { text: "Khudi ko kar buland itna ke har taqdeer se pehle...", detail: "Concept: Self-empowerment to the point of influencing destiny." },
            { text: "Sitare se aage jahan aur bhi hain...", detail: "Concept: Endless possibilities and stages of human evolution." },
            { text: "Tu shaheen hai parwaz hai kaam tera...", detail: "Concept: Encouraging the youth to aim high like a falcon." },
            { text: "Nahi tera nasheman qasr-e-sultani ke gumbad par...", detail: "Concept: Rejecting royal luxury for the freedom of the mountains." },
            { text: "Ki Muhammad se wafa tu ne to hum tere hain...", detail: "Concept: Spiritual devotion as the key to universal success." },
            { text: "Apne man mein doob kar pa ja suragh-e-zindagi...", detail: "Concept: Introspection as the path to finding life's true meaning." },
            { text: "Amal se zindagi banti hai jannat bhi jahannam bhi...", detail: "Concept: Actions define one's fate, more than mere words." },
            { text: "Hazaron saal nargis apni be-noori pe roti hai...", detail: "Concept: The rarity of true visionaries in the world." },
            { text: "Parwaz hai dono ki isi ek faza mein...", detail: "Concept: Different spirits navigating the same world differently." },
            { text: "Mita de apni hasti ko agar kuch martaba chahiye...", detail: "Concept: Sacrifice and humility as requirements for greatness." }
        ],
        "Mir": [
            { text: "Patta patta boota boota haal hamara jaane hai...", detail: "Mood: The silent witness of nature to one's internal sorrow." },
            { text: "Hasti apni hubaab ki si hai, Ye numayish saraab ki si hai.", detail: "Mood: The fragility and fleeting nature of human existence." },
            { text: "Ibtada-e-ishq hai rota hai kya, Aage aage dekhiye hota hai kya.", detail: "Mood: The realization of the hardships yet to come in love." },
            { text: "Dil ki basti pur-ashob hai Mir...", detail: "Mood: The chaotic and sorrowful state of the human heart." },
            { text: "Dekhiye kis tarah se kat-ti hai...", detail: "Mood: The slow and painful passage of time in loneliness." },
            { text: "Sham hi se bujha sa rehta hai...", detail: "Mood: The persistent melancholy that sets in at sunset." },
            { text: "Mir darya hai sune sher zabani uski...", detail: "Mood: The depth and flow of Mir's poetic mastery." },
            { text: "Mat sahal humein jaano phirta hai falak barson...", detail: "Mood: The rarity of a true poet's emergence in history." },
            { text: "Raah-e-door-e-ishq mein rota hai kya...", detail: "Mood: Reflecting on the initial pains of a long journey." },
            { text: "Kya kijiye ki tabiyat hi aisi hai...", detail: "Mood: Accepting the inherent temperament of a melancholic soul." }
        ]
        // Note: You can add more poets like Faiz, Faraz, etc. in the same format
    };

    if (poetButtons.length > 0) {
        poetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                poetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const poet = btn.getAttribute('data-poet');
                const shers = poetryData[poet] || ["Shair data coming soon..."];

                // Update Display with animation
                shersContainer.style.opacity = '0';
                setTimeout(() => {
                    shersContainer.innerHTML = shers.map(sher => `
                        <div class="card" style="padding: 2rem; border: 1px dashed rgba(212, 175, 55, 0.2); text-align: center;">
                            <p class="poetry-style" style="font-size: 1.1rem; margin-bottom: 1rem;">"${sher.text}"</p>
                            <p style="font-size: 0.85rem; color: #94A3B8; font-style: italic;">${sher.detail}</p>
                        </div>
                    `).join('');
                    shersContainer.style.opacity = '1';
                }, 300);
            });
        });

        // Auto-click first poet to load initial data
        poetButtons[0].click();
    }

    // Education Switching Logic
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const eduContainer = document.getElementById('edu-display');

    const educationData = {
        "Physics": Array.from({length: 10}, (_, i) => ({
            name: `Prof. Physics Expert ${i + 1}`,
            bio: "Specializing in theoretical particle physics with over 15 years of research experience.",
            lectures: ["Quantum Mechanics: The Wave Function", "Laws of Thermodynamics in Industry", "Advanced Wave Optics", "Nuclear Fusion vs Fission Analysis"]
        })),
        "Mathematics": Array.from({length: 10}, (_, i) => ({
            name: `Dr. Math Specialist ${i + 1}`,
            bio: "Renowned for contributions to complex analysis and computational mathematics.",
            lectures: ["Multi-variable Calculus Masterclass", "Applied Linear Algebra for Engineers", "Bayesian Statistical Inference", "Non-linear Differential Equations"]
        })),
        "Computer Science": Array.from({length: 10}, (_, i) => ({
            name: `Engr. Tech Lead ${i + 1}`,
            bio: "Senior Software Architect with a focus on scalable cloud infrastructures.",
            lectures: ["Microservices Architecture in Python", "Modern React State Management", "Secure Database Schema Design", "Deploying AI Models at Scale"]
        }))
    };

    if (subjectButtons.length > 0) {
        subjectButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                subjectButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const subject = btn.getAttribute('data-subject');
                const teachers = educationData[subject] || [];

                eduContainer.style.opacity = '0';
                setTimeout(() => {
                    eduContainer.innerHTML = teachers.map(teacher => `
                        <div class="card">
                            <div class="card-content">
                                <h3 class="card-title-gold">${teacher.name}</h3>
                                <p style="font-size: 0.85rem; margin-bottom: 1rem; color: #fff;">${teacher.bio}</p>
                                <div class="lecture-list">
                                    <p style="font-size: 0.8rem; color: var(--electric-blue); font-weight: bold; margin-bottom: 0.5rem;">LECTURES:</p>
                                    <ul style="color: #94A3B8; font-size: 0.85rem; list-style: none;">
                                        ${teacher.lectures.map(l => `<li class="lecture-item"><span>• ${l}</span> <span style="font-size: 0.7rem; color: var(--matte-gold);">[LOCKED 🔒]</span></li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    eduContainer.style.opacity = '1';
                }, 300);
            });
        });
        subjectButtons[0].click();
    }

    // Modal Control Functions
    const modal = document.getElementById('login-modal');

    // Elite UX: Close modal on background click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    if (eduContainer) {
        eduContainer.addEventListener('click', (e) => {
            if (e.target.closest('.lecture-item')) {
                modal.style.display = 'flex';
            }
        });
    }

    window.closeModal = () => {
        modal.style.display = 'none';
    };

    console.log("Mateen.Core Systems: Operational");
});