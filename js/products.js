// ===== بيانات المنتجات مع صور وأيقونات احتياطية =====
const products = [
    {
        id: 1,
        name: 'لوح شمسي 550 واط - مونوكريستال',
        category: 'panels',
        price: 145000,
        specs: 'كفاءة 21.5%، ضمان 25 سنة',
        img: 'images/products/panel-550w.jpg',
        icon: 'fa-solar-panel'  // أيقونة احتياطية
    },
    {
        id: 2,
        name: 'لوح شمسي 450 واط - بوليكريستال',
        category: 'panels',
        price: 110000,
        specs: 'كفاءة 19.2%، ضمان 20 سنة',
        img: 'images/products/panel-450w.jpg',
        icon: 'fa-solar-panel'
    },
    {
        id: 3,
        name: 'عاكس 5 كيلوواط - Growatt',
        category: 'inverters',
        price: 420000,
        specs: 'كفاءة 98%، مناسب للمنازل',
        img: 'images/products/inverter-5kw.jpg',
        icon: 'fa-microchip'
    },
    {
        id: 4,
        name: 'عاكس 8 كيلوواط - ثلاثي الطور',
        category: 'inverters',
        price: 680000,
        specs: 'كفاءة 97.5%، للمنشآت الكبيرة',
        img: 'images/products/inverter-8kw.jpg',
        icon: 'fa-microchip'
    },
    {
        id: 5,
        name: 'بطارية ليثيوم 5 كيلوواط/ساعة',
        category: 'batteries',
        price: 850000,
        specs: 'دورة حياة 6000 دورة، ضمان 10 سنوات',
        img: 'images/products/battery-lithium.jpg',
        icon: 'fa-battery-full'
    },
    {
        id: 6,
        name: 'بطارية جل 200 أمبير/ساعة',
        category: 'batteries',
        price: 320000,
        specs: 'عمق تفريغ 50%، ضمان 5 سنوات',
        img: 'images/products/battery-gel.jpg',
        icon: 'fa-battery-full'
    },
    {
        id: 7,
        name: 'منظم شحن MPPT 60 أمبير',
        category: 'accessories',
        price: 180000,
        specs: 'كفاءة 99%، توافق مع جميع البطاريات',
        img: 'images/products/charge-controller.jpg',
        icon: 'fa-sliders-h'
    },
    {
        id: 8,
        name: 'كابل شمسي 6 مم × 100 متر',
        category: 'accessories',
        price: 65000,
        specs: 'مقاوم للحرارة والأشعة فوق البنفسجية',
        img: 'images/products/cable.jpg',
        icon: 'fa-plug'
    }
];

// ===== عرض المنتجات مع أيقونة احتياطية =====
function renderProducts(containerId, productList = products) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productList.map(p => `
        <div class="product-card" data-category="${p.category}">
            <div class="product-image">
                <img src="${p.img}" alt="${p.name}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas ${p.icon}\\' style=\\'font-size: 4rem; color: var(--primary);\\'></i>'">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="category">${getCategoryName(p.category)}</div>
                <div class="specs">${p.specs}</div>
                <div class="price">${p.price.toLocaleString()} ريال</div>
                <button class="add-to-cart" data-id="${p.id}">أضف للسلة</button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(cat) {
    const map = {
        'panels': 'ألواح شمسية',
        'inverters': 'عواكس',
        'batteries': 'بطاريات',
        'accessories': 'مستلزمات'
    };
    return map[cat] || cat;
}

// ===== تحميل المنتجات =====
document.addEventListener('DOMContentLoaded', function() {
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
        renderProducts('featured-grid', products.slice(0, 4));
    }
    
    const allProductsGrid = document.getElementById('all-products-grid');
    if (allProductsGrid) {
        renderProducts('all-products-grid', products);
    }
});

window.products = products;
window.renderProducts = renderProducts;