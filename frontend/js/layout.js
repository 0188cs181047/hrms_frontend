async function loadSidebar() {
    const response = await fetch("sidebar.html");
    const sidebar = await response.text();
    document.getElementById("sidebar-container").innerHTML = sidebar;

    setActiveLink();
}

function setActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active", "fw-bold");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);