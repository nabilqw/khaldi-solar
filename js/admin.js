// ===== بيانات المنتجات =====
let products = [];
let editingId = null;

// ===== كلمة المرور =====
const ADMIN_PASSWORD = 'admin123';

// ===== تسجيل الدخول =====
function login() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadProducts();
    } else {
        alert('❌ كلمة المرور غير صحيحة!');
    }
}

// ===== تسجيل الخروج =====
function logout() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('admin-password').value = '';
    sessionStorage.removeItem('admin_logged_in');
}

// ===== تحميل المنتجات =====
function loadProducts() {
    const stored = localStorage.getItem('khaldi_products');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        // منتجات افتراضية
        products = [
            {
                id: 1,
                name: 'لوح شمسي 550 واط - مونوكريستال',
                category: 'panels',
                price: 145000,
                specs: 'كفاءة 21.5%، ضمان 25 سنة',
                status: 'active',
                image: ''
            },
            {
                id: 2,
                name: 'لوح شمسي 450 واط - بوليكريستال',
                category: 'panels',
                price: 110000,
                specs: 'كفاءة 19.2%، ضمان 20 سنة',
                status: 'active',
                image: ''
            },
            {
                id: 3,
                name: 'عاكس 5 كيلوواط - Growatt',
                category: 'inverters',
                price: 420000,
                specs: 'كفاءة 98%، مناسب للمنازل',
                status: 'active',
                image: ''
            },
            {
                id: 4,
                name: 'بطارية ليثيوم 5 كيلوواط/ساعة',
                category: 'batteries',
                price: 850000,
                specs: 'دورة حياة 6000 دورة، ضمان 10 سنوات',
                status: 'active',
                image: ''
            }
        ];
        saveToStorage();
    }
    renderTable();
    updateStats();
}

// ===== حفظ في localStorage =====
function saveToStorage() {
    localStorage.setItem('khaldi_products', JSON.stringify(products));
}

// ===== تحديث الإحصائيات =====
function updateStats() {
    const total = products.length;
    const active = products.filter(p => p.status === 'active').length;
    const inactive = products.filter(p => p.status === 'inactive').length;
    
    document.getElementById('total-products').textContent = total;
    document.getElementById('active-products').textContent = active;
    document.getElementById('inactive-products').textContent = inactive;
}

// ===== عرض الجدول =====
function renderTable() {
    const tbody = document.getElementById('products-tbody');
    const emptyState = document.getElementById('empty-state');
    
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';

    tbody.innerHTML = products.map((p, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                ${p.image ? 
                    `<img src="${p.image}" class="product-img" alt="${p.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'product-img-placeholder\\'><i class=\\'fas fa-box\\'></i></div>'">` : 
                    `<div class="product-img-placeholder"><i class="fas fa-box"></i></div>`
                }
            </td>
            <td><strong>${p.name}</strong></td>
            <td>${getCategoryName(p.category)}</td>
            <td>${p.price.toLocaleString()} ريال</td>
            <td>
                <span class="status-badge ${p.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${p.status === 'active' ? 'متوفر' : 'غير متوفر'}
                </span>
            </td>
            <td>
                <button class="action-btn action-btn-edit" onclick="editProduct(${p.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="action-btn action-btn-delete" onclick="deleteProduct(${p.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </td>
        </tr>
    `).join('');
}

// ===== الحصول على اسم التصنيف =====
function getCategoryName(cat) {
    const map = {
        'panels': 'ألواح شمسية',
        'inverters': 'عواكس',
        'batteries': 'بطاريات',
        'accessories': 'مستلزمات'
    };
    return map[cat] || cat;
}

// ===== إظهار نموذج الإضافة =====
function showAddForm() {
    document.getElementById('product-form').classList.add('show');
    document.getElementById('form-title').innerHTML = '<i class="fas fa-plus-circle"></i> إضافة منتج جديد';
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = 'panels';
    document.getElementById('product-price').value = '';
    document.getElementById('product-specs').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-status').value = 'active';
    document.getElementById('edit-id').value = '';
    editingId = null;
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

// ===== إلغاء النموذج =====
function cancelForm() {
    document.getElementById('product-form').classList.remove('show');
    editingId = null;
}

// ===== تعديل منتج =====
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('product-form').classList.add('show');
    document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> تعديل المنتج';
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-specs').value = product.specs || '';
    document.getElementById('product-image').value = product.image || '';
    document.getElementById('product-status').value = product.status || 'active';
    document.getElementById('edit-id').value = id;
    editingId = id;
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}

// ===== حفظ المنتج =====
function saveProduct() {
    const name = document.getElementById('product-name').value.trim();
    const category = document.getElementById('product-category').value;
    const price = parseInt(document.getElementById('product-price').value);
    const specs = document.getElementById('product-specs').value.trim();
    const image = document.getElementById('product-image').value.trim();
    const status = document.getElementById('product-status').value;
    const editId = document.getElementById('edit-id').value;

    if (!name) {
        alert('⚠️ يرجى إدخال اسم المنتج');
        return;
    }
    if (!price || price <= 0) {
        alert('⚠️ يرجى إدخال سعر صحيح');
        return;
    }

    if (editId) {
        const index = products.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            products[index] = { ...products[index], name, category, price, specs, image, status };
        }
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, category, price, specs, image, status });
    }

    saveToStorage();
    renderTable();
    updateStats();
    cancelForm();
    alert('✅ تم حفظ المنتج بنجاح!');
}

// ===== حذف منتج =====
function deleteProduct(id) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا المنتج؟')) return;
    
    products = products.filter(p => p.id !== id);
    saveToStorage();
    renderTable();
    updateStats();
    alert('🗑️ تم حذف المنتج بنجاح!');
}

// ===== تحميل تلقائي =====
document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = sessionStorage.getItem('admin_logged_in');
    if (loggedIn === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadProducts();
    }
});

// ===== تسجيل الدخول مع حفظ الجلسة =====
window.login = function() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_logged_in', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadProducts();
    } else {
        alert('❌ كلمة المرور غير صحيحة!');
    }
};