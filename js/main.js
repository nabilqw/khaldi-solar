// ===== سلة التسوق =====
let cartCount = 0;
const cartCountEl = document.querySelector('.cart-count');

function updateCart() {
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }
}

// إضافة منتج للسلة
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        cartCount++;
        updateCart();
        // تأثير بسيط
        const originalText = e.target.textContent;
        e.target.textContent = '✓ تم الإضافة';
        e.target.style.background = '#22c55e';
        e.target.style.color = 'white';
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.background = '';
            e.target.style.color = '';
        }, 1500);
    }
});

// ===== فلتر المنتجات =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // تصفية المنتجات
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = card.dataset.category === filter ? 'block' : 'none';
            }
        });
    }
});

// ===== رسالة تأكيد في نموذج الاتصال =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا قريباً.');
        this.reset();
    });
}

// ===== تغيير طريقة الحساب =====
const methodSelect = document.getElementById('calc-method');
if (methodSelect) {
    methodSelect.addEventListener('change', function() {
        const consumptionGroup = document.getElementById('consumption-group');
        const loadGroup = document.getElementById('load-group');
        const areaGroup = document.getElementById('area-group');
        
        consumptionGroup.style.display = 'none';
        loadGroup.style.display = 'none';
        areaGroup.style.display = 'none';
        
        if (this.value === 'consumption') {
            consumptionGroup.style.display = 'block';
        } else if (this.value === 'load') {
            loadGroup.style.display = 'block';
        } else if (this.value === 'area') {
            areaGroup.style.display = 'block';
        }
    });
}

console.log('☀️ متجر الخالدي للطاقة الشمسية يعمل بكفاءة!');