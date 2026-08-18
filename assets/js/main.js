document.addEventListener("DOMContentLoaded", function () {
  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      renderCommittees(data.committees);
      renderMembers(data.members);
      setupSearch(data.members);
    })
    .catch((error) => console.error("Error loading json:", error));
});

function renderCommittees(committees) {
  const container = document.getElementById("committee-container");
  container.innerHTML = "";

  committees.forEach((c) => {
    container.innerHTML += `
      <div class="card">
        <img src="${c.image}" fill alt="${c.role}">
        <h3>${c.role}</h3>
        <p><strong>${c.name}</strong></p>
        <p>${c.phone}</p>
        <small>${c.desc}</small>
      </div>
    `;
  });
}

function renderMembers(members) {
  const tbody = document.getElementById("members-table-body");
  const countSpan = document.getElementById("total-count");
  tbody.innerHTML = "";
  countSpan.textContent = members.length;

  members.forEach((m) => {
    tbody.innerHTML += `
      <tr>
        <td>${m.id}</td>
        <td>${m.name}</td>
        <td>${m.phone}</td>
      </tr>
    `;
  });
}

function setupSearch(members) {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", function () {
    const query = this.value.toLowerCase();
    const filtered = members.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.phone.toLowerCase().includes(query)
    );
    renderMembers(filtered);
  });
}