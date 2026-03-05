// ================= CONFIG =================
const API_URL = 'http://localhost:3000';

// ================= SERVICES =================
const getDashboard = async () =>
  fetch(`${API_URL}/dashboard`).then(res => res.json());

const updateDashboard = async (dashboard) =>
  fetch(`${API_URL}/dashboard`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dashboard)
  });

// USERS
const getUsers = async () =>
  fetch(`${API_URL}/users`).then(res => res.json());

const createUser = async (user) =>
  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

const updateUser = async (id, user) =>
  fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

const deleteUser = async (id) =>
  fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });

// PRODUCTS
const getProducts = async () =>
  fetch(`${API_URL}/products`).then(res => res.json());

const createProduct = async (product) =>
  fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

const updateProduct = async (id, product) =>
  fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

const deleteProduct = async (id) =>
  fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });

// ================= HELPERS =================
const roleBadge = role =>
  role === 'admin' ? 'bg-danger' : 'bg-success';

const categoryMap = {
  1: 'Maquinaria y Equipos',
  2: 'Pintura y Acabados',
  3: 'Herramientas de Mano',
  4: 'Plomería y Gas'
};

const stateMap = {
  1: 'Publicado',
  2: 'Borrador',
  3: 'Agotado'
};

// ================= DASHBOARD STATS =================
const increaseStat = async (field, amount = 1) => {
  const dashboard = await getDashboard();
  dashboard.stats[field] += amount;
  await updateDashboard(dashboard);
};

// ================= RENDERS =================
const renderStats = stats => `
  <div class="row g-3 mb-4">
    <div class="col-md-3"><div class="card text-bg-primary"><div class="card-body text-center"><h6>Usuarios</h6><h3>${stats.total_users}</h3></div></div></div>
    <div class="col-md-3"><div class="card text-bg-success"><div class="card-body text-center"><h6>Ventas</h6><h3>${stats.total_sales}</h3></div></div></div>
    <div class="col-md-3"><div class="card text-bg-warning"><div class="card-body text-center"><h6>Ingresos</h6><h3>$${stats.total_revenue}</h3></div></div></div>
    <div class="col-md-3"><div class="card text-bg-danger"><div class="card-body text-center"><h6>Productos</h6><h3>${stats.total_products}</h3></div></div></div>
  </div>
`;

const renderDashboardUsers = users => `
  <div class="card">
    <div class="card-header">Últimos usuarios</div>
    <div class="card-body">
      <table class="table">
        ${users.slice(-5).map(u => `
          <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge ${roleBadge(u.role)}">${u.role}</span></td>
          </tr>
        `).join('')}
      </table>
    </div>
  </div>
`;

// ================= USERS CRUD =================
const renderUsersCRUD = users => `
  <button class="btn btn-primary mb-3" onclick="openUserForm()">Nuevo Usuario</button>
  <table class="table table-striped">
    ${users.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td class="text-end">
          <button class="btn btn-warning btn-sm" onclick="editUser('${u.id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="removeUser('${u.id}')">Eliminar</button>
        </td>
      </tr>
    `).join('')}
  </table>
`;

const renderUserForm = (user = {}) => `
  <form id="userForm" class="card mb-3 p-3">
    <input type="hidden" id="userId" value="${user.id || ''}">
    <input class="form-control mb-2" id="username" value="${user.name || ''}" placeholder="Nombre" required>
    <input class="form-control mb-2" id="email" value="${user.email || ''}" placeholder="Email" required>
    <input class="form-control mb-2" id="password" value="${user.password || ''}" placeholder="Password" required>
    <select class="form-select mb-2" id="role">
      <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
      <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
    </select>
    <button type="submit" class="btn btn-success">Guardar</button>
    <button type="button" class="btn btn-secondary" onclick="loadUsersCrud()">Cancelar</button>
  </form>
`;

// ================= PRODUCTS CRUD =================
const renderProductCRUD = products => `
  <button class="btn btn-primary mb-3" onclick="openProductForm()">Nuevo Producto</button>
  <table class="table table-striped">
    ${products.map(p => `
      <tr>
        <td>${p.name}</td>
        <td>${categoryMap[p.category_id]}</td>
        <td>$${p.price}</td>
        <td>${p.stock}</td>
        <td>${stateMap[p.product_state]}</td>
        <td class="text-end">
          <button class="btn btn-warning btn-sm" onclick="editProduct('${p.id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="removeProduct('${p.id}')">Eliminar</button>
        </td>
      </tr>
    `).join('')}
  </table>
`;

const renderProductForm = (product = {}) => `
  <div class="card mb-3">
    <div class="card-body">
      <h5>${product.id ? 'Editar Producto' : 'Nuevo Producto'}</h5>

      <form id="productForm">
        <input type="hidden" id="productId" value="${product.id || ''}">

        <input class="form-control mb-2"
          id="productname"
          placeholder="Nombre del producto"
          value="${product.name || ''}"
          required>

        <select class="form-select mb-2" id="category_id" required>
          <option value="">Seleccione categoría</option>
          <option value="1" ${product.category_id == 1 ? 'selected' : ''}>Maquinaria y Equipos</option>
          <option value="2" ${product.category_id == 2 ? 'selected' : ''}>Pintura y Acabados</option>
          <option value="3" ${product.category_id == 3 ? 'selected' : ''}>Herramientas de Mano</option>
          <option value="4" ${product.category_id == 4 ? 'selected' : ''}>Plomería y Gas</option>
        </select>

        <input type="number"
          class="form-control mb-2"
          id="price"
          placeholder="Precio"
          min="0"
          value="${product.price ?? ''}"
          required>

        <input type="number"
          class="form-control mb-2"
          id="stock"
          placeholder="Stock"
          min="0"
          value="${product.stock ?? ''}"
          required>

        <textarea class="form-control mb-2"
          id="description"
          placeholder="Descripción"
          required>${product.description || ''}</textarea>

        <select class="form-select mb-3" id="product_state" required>
          <option value="1" ${product.product_state == 1 ? 'selected' : ''}>Publicado</option>
          <option value="2" ${product.product_state == 2 ? 'selected' : ''}>Borrador</option>
          <option value="3" ${product.product_state == 3 ? 'selected' : ''}>Agotado</option>
        </select>

        <input
          type="url"
          class="form-control mb-3"
          id="image"
          placeholder="URL de la imagen del producto"
          value="${product.images?.[0] || ''}"
          required
        >

        <button type="submit" class="btn btn-success">Guardar</button>
        <button type="button"
          class="btn btn-secondary ms-2"
          onclick="loadProductCrud()">Cancelar</button>
      </form>
    </div>
  </div>
`;


// ================= PAGES =================
const loadDashboard = async () => {
  const main = document.querySelector('.main');
  const dashboard = await getDashboard();
  const users = await getUsers();
  main.innerHTML = `<h2>Dashboard</h2>${renderStats(dashboard.stats)}${renderDashboardUsers(users)}`;
};

const loadUsersCrud = async () => {
  const main = document.querySelector('.main');
  const users = await getUsers();
  main.innerHTML = `<h2>Usuarios</h2>${renderUsersCRUD(users)}`;
};

const loadProductCrud = async () => {
  const main = document.querySelector('.main');
  const products = await getProducts();
  main.innerHTML = `<h2>Productos</h2>${renderProductCRUD(products)}`;
};

// ================= CRUD LOGIC =================
const openUserForm = () =>
  document.querySelector('.main').insertAdjacentHTML('afterbegin', renderUserForm());

const editUser = async id => {
  const user = (await getUsers()).find(u => u.id == id);
  document.querySelector('.main').innerHTML = renderUserForm(user);
};

const removeUser = async id => {
  if (!confirm('¿Eliminar usuario?')) return;
  await deleteUser(id);
  await increaseStat('total_users', -1);
  loadUsersCrud();
};

const openProductForm = () =>
  document.querySelector('.main').insertAdjacentHTML('afterbegin', renderProductForm());

const editProduct = async id => {
  const product = (await getProducts()).find(p => p.id == id);
  document.querySelector('.main').innerHTML = renderProductForm(product);
};

const removeProduct = async id => {
  if (!confirm('¿Eliminar producto?')) return;
  await deleteProduct(id);
  await increaseStat('total_products', -1);
  loadProductCrud();
};
// ================= USER FORM =================
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'userForm') return;
  e.preventDefault();

  const id = document.getElementById('userId').value;

  const user = {
    name: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    role: role.value
  };

  if (id) {
    // EDITAR
    await updateUser(id, user);
  } else {
    // CREAR
    await createUser(user);
    await increaseStat('total_users', 1);
  }

  loadUsersCrud();
});

// =================PRODUCT FORMS =================
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'productForm') return;
  e.preventDefault();

  const id = document.getElementById('productId').value;

  const product = {
    name: productname.value.trim(),
    category_id: Number(category_id.value),
    price: Number(price.value),
    stock: Number(stock.value),
    description: description.value.trim(),
    product_state: Number(product_state.value),
    images: [image.value.trim()] // 👈 URL dentro de array
  };

  if (id) {
    await updateProduct(id, product);
  } else {
    await createProduct(product);
    await increaseStat('total_products', 1);
  }

  loadProductCrud();
});



// ================= NAV =================
document.querySelector('.dashborad').addEventListener('click', loadDashboard);
document.querySelector('.manage-users').addEventListener('click', loadUsersCrud);
document.querySelector('.manage-products').addEventListener('click', loadProductCrud);
document.querySelector('.Landing-page').addEventListener('click', () => {
  window.location = '../index.html';
})
// ================= INIT =================
document.addEventListener('DOMContentLoaded', loadDashboard);
