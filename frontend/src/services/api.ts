const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function fetchWithAuth(url: string, options: any = {}) {
  const token = getToken();
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
    },
  });
}

// Auth
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login inválido");
  return res.json();
}

// Clients
export async function getClients() {
  const res = await fetchWithAuth("/clients");
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

export async function createClient(data: any) {
  const res = await fetchWithAuth("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}
export async function updateClient(id: string, data: any) {
  const res = await fetchWithAuth(`/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cliente");
  return res.json();
}
export async function deleteClient(id: string) {
  const res = await fetchWithAuth(`/clients/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover cliente");
  return res.json();
}

// Repairs
export async function getRepairs() {
  const res = await fetchWithAuth("/repairs");
  if (!res.ok) throw new Error("Erro ao buscar consertos");
  return res.json();
}

export async function getRepairById(id: string) {
  const res = await fetchWithAuth(`/repairs/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar conserto");
  return res.json();
}

export async function createRepair(data: any) {
  const res = await fetchWithAuth("/repairs", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar conserto");
  return res.json();
}
export async function updateRepair(id: string, data: any) {
  const res = await fetchWithAuth(`/repairs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar conserto");
  return res.json();
}
export async function deleteRepair(id: string) {
  const res = await fetchWithAuth(`/repairs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover conserto");
  return res.json();
}

// Payments
export async function getPayments() {
  const res = await fetchWithAuth("/payments");
  if (!res.ok) throw new Error("Erro ao buscar pagamentos");
  return res.json();
}
export async function createPayment(data: any) {
  const res = await fetchWithAuth("/payments", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao registrar pagamento");
  return res.json();
}
export async function updatePayment(id: string, data: any) {
  const res = await fetchWithAuth(`/payments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar pagamento");
  return res.json();
}
export async function deletePayment(id: string) {
  const res = await fetchWithAuth(`/payments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover pagamento");
  return res.json();
}

export async function settings(data: any) {
  const res = await fetchWithAuth("/settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar configurações");
  return res.json();
}
