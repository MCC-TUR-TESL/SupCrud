// ================= CONFIG =================
const API_URL = 'http://localhost:3003';

// ================= SERVICES =================

// PQRS
const getPQRS = async () =>
  fetch(`${API_URL}/pqrs`).then(res => res.json());

const getPQRSById = async (id) =>
  fetch(`${API_URL}/pqrs/${id}`).then(res => res.json());

const createPQRS = async (pqrs) =>
  fetch(`${API_URL}/pqrs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pqrs)
  });

const updatePQRS = async (id, pqrs) =>
  fetch(`${API_URL}/pqrs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pqrs)
  });

const deletePQRS = async (id) =>
  fetch(`${API_URL}/pqrs/${id}`, { method: 'DELETE' });

// STAFF PQRS
const getStaffPQRS = async () =>
  fetch(`${API_URL}/staff-pqrs`).then(res => res.json());

const getStaffById = async (id) =>
  fetch(`${API_URL}/staff-pqrs/${id}`).then(res => res.json());

const createStaff = async (staff) =>
  fetch(`${API_URL}/staff-pqrs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(staff)
  });

const updateStaff = async (id, staff) =>
  fetch(`${API_URL}/staff-pqrs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(staff)
  });

const deleteStaff = async (id) =>
  fetch(`${API_URL}/staff-pqrs/${id}`, { method: 'DELETE' });

// New: Type Request & Status for selects
const getTypeRequests = async () =>
  fetch(`${API_URL}/type_request`).then(res => res.json());

const getStatuses = async () =>
  fetch(`${API_URL}/status`).then(res => res.json());

// ================= HELPERS =================

const statusBadge = status => {
  const colors = {
    OPEN: "bg-primary",
    IN_PROGRESS: "bg-warning",
    CLOSED: "bg-success",
    REOPENED: "bg-danger"
  };
  return colors[status] || "bg-secondary";
};

// ================= RENDERS =================

const renderPQRSCRUD = pqrs => `
  <button class="btn btn-primary mb-3" onclick="openPQRSForm()">Nueva PQRS</button>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Asunto</th>
        <th>Tipo</th>
        <th>Estado</th>
        <th class="text-end">Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${pqrs.map(p => `
        <tr>
          <td>${p.full_name}</td>
          <td>${p.email}</td>
          <td>${p.subject}</td>
          <td>${p.type_request}</td>
          <td><span class="badge ${statusBadge(p.status)}">${p.status}</span></td>
          <td class="text-end">
            <button class="btn btn-warning btn-sm" onclick="editPQRS('${p.id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="removePQRS('${p.id}')">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

const renderStaffCRUD = staff => `
  <button class="btn btn-primary mb-3" onclick="openStaffForm()">Nuevo Staff</button>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>PQRS id</th>
        <th>PQRS Asignada</th>
        <th>Estado</th>
        <th class="text-end">Acciones</th>
      </tr>
    </thead>
    <tbody>
      ${staff.map(s => `
        <tr>
          <td>${s.full_name}</td>
          <td>${s.email}</td>
          <td>${s.pqrs_id}</td>
          <td>${s.subject}</td>
          <td><span class="badge ${statusBadge(s.status)}">${s.status}</span></td>
          <td class="text-end">
            <button class="btn btn-warning btn-sm" onclick="editStaff('${s.id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="removeStaff('${s.id}')">Eliminar</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

// ================= LOAD PAGES =================

const loadPQRSCRUD = async () => {
  const main = document.querySelector('.main');
  const pqrs = await getPQRS();
  main.innerHTML = `<h2>PQRS</h2>${renderPQRSCRUD(pqrs)}`;
};

const loadStaffCRUD = async () => {
  const main = document.querySelector('.main');
  const staff = await getStaffPQRS();
  console.log(staff);
  main.innerHTML = `<h2>Staff PQRS</h2>${renderStaffCRUD(staff)}`;
};

// ================= CRUD ACTIONS =================

// Eliminar PQRS
const removePQRS = async (id) => {
  const result = await Swal.fire({
    title: '¿Eliminar PQRS?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  await deletePQRS(id);
  await loadPQRSCRUD();
  Swal.fire('Eliminada', 'PQRS eliminada con éxito.', 'success');
};

// Eliminar Staff
const removeStaff = async (id) => {
  const result = await Swal.fire({
    title: '¿Eliminar Staff?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  await deleteStaff(id);
  await loadStaffCRUD();
  Swal.fire('Eliminado', 'Staff eliminado con éxito.', 'success');
};

// Crear o Editar PQRS con selects dinámicos
const openPQRSForm = async (id = null) => {
  let pqrs = {
    full_name: '',
    email: '',
    subject: '',
    description: '',
    tr_id: '',
    status_id: ''
  };

  if (id) {
    pqrs = await getPQRSById(id);
  }

  // Obtener datos para selects
  const [typeRequests, statuses] = await Promise.all([getTypeRequests(), getStatuses()]);

  const typeOptions = typeRequests.map(tr => 
    `<option value="${tr.id}" ${pqrs.tr_id === tr.id ? 'selected' : ''}>${tr.name}</option>`
  ).join('');

  const statusOptions = statuses.map(st => 
    `<option value="${st.id}" ${pqrs.status_id === st.id ? 'selected' : ''}>${st.name}</option>`
  ).join('');

  const { value: formValues } = await Swal.fire({
    title: id ? 'Editar PQRS' : 'Nueva PQRS',
    html:
      `<input id="swal-full_name" class="swal2-input" placeholder="Nombre" value="${pqrs.full_name || ''}">` +
      `<input id="swal-email" class="swal2-input" placeholder="Email" type="email" value="${pqrs.email || ''}">` +
      `<input id="swal-subject" class="swal2-input" placeholder="Asunto" value="${pqrs.subject || ''}">` +
      `<textarea id="swal-description" class="swal2-textarea" placeholder="Descripción">${pqrs.description || ''}</textarea>` +
      `<select id="swal-tr_id" class="swal2-select" style="margin-top: 10px;">${typeOptions}</select>` +
      `<select id="swal-status_id" class="swal2-select" style="margin-top: 10px;">${statusOptions}</select>`,
    focusConfirm: false,
    preConfirm: () => ({
      full_name: document.getElementById('swal-full_name').value.trim(),
      email: document.getElementById('swal-email').value.trim(),
      subject: document.getElementById('swal-subject').value.trim(),
      description: document.getElementById('swal-description').value.trim(),
      tr_id: parseInt(document.getElementById('swal-tr_id').value),
      status_id: parseInt(document.getElementById('swal-status_id').value),
    })
  });

  if (!formValues) return;

  if (!formValues.full_name || !formValues.email || !formValues.subject || !formValues.tr_id || !formValues.status_id) {
    Swal.fire('Error', 'Por favor, completa todos los campos obligatorios', 'error');
    return;
  }

  if (id) {
    await updatePQRS(id, formValues);
    Swal.fire('Actualizado', 'PQRS actualizada con éxito', 'success');
    await loadPQRSCRUD();
  } else {
    await createPQRS(formValues);
    Swal.fire('Creado', 'PQRS creada con éxito', 'success');
    await loadPQRSCRUD();
  }
};

// Crear o Editar Staff con select de PQRS
const openStaffForm = async (id = null) => {
  let staff = {
    full_name: '',
    email: '',
    pqrs_assigned_id: ''
  };

  if (id) {
    staff = await getStaffById(id);
  }

  // Obtener PQRS para select
  const pqrsList = await getPQRS();

  const pqrsOptions = pqrsList.map(p => 
    `<option value="${p.id}" ${staff.pqrs_assigned_id === p.id ? 'selected' : ''}>${p.id} ${p.subject}</option>`
  ).join('');

  const { value: formValues } = await Swal.fire({
    title: id ? 'Editar Staff' : 'Nuevo Staff',
    html:
      `<input id="swal-full_name" class="swal2-input" placeholder="Nombre" value="${staff.full_name || ''}">` +
      `<input id="swal-email" class="swal2-input" placeholder="Email" type="email" value="${staff.email || ''}">` +
      `<select id="swal-pqrs_assigned_id" class="swal2-select" style="margin-top: 10px;">
         <option value="">Seleccione una PQRS</option>
         ${pqrsOptions}
       </select>`,
    focusConfirm: false,
    preConfirm: () => ({
      full_name: document.getElementById('swal-full_name').value.trim(),
      email: document.getElementById('swal-email').value.trim(),
      pqrs_assigned_id: parseInt(document.getElementById('swal-pqrs_assigned_id').value),
    })
  });

  if (!formValues) return;

  if (!formValues.full_name || !formValues.email || !formValues.pqrs_assigned_id) {
    Swal.fire('Error', 'Por favor, completa todos los campos obligatorios', 'error');
    return;
  }

  if (id) {
    await updateStaff(id, formValues);
    Swal.fire('Actualizado', 'Staff actualizado con éxito', 'success');
    await loadStaffCRUD();
  } else {
    await createStaff(formValues);
    Swal.fire('Creado', 'Staff creado con éxito', 'success');
    await loadStaffCRUD();
  }
};

// Editar PQRS
const editPQRS = (id) => openPQRSForm(id);

// Editar Staff
const editStaff = (id) => openStaffForm(id);

// ================= NAV =================

const pqrsBtn = document.querySelector('.manage-pqrs');
if (pqrsBtn) pqrsBtn.addEventListener('click', loadPQRSCRUD);

const staffBtn = document.querySelector('.manage-staff');
if (staffBtn) staffBtn.addEventListener('click', loadStaffCRUD);

// ================= INIT =================

document.addEventListener('DOMContentLoaded', loadPQRSCRUD);