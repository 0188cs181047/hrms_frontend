{
    async function fetchEmployees() {
        const response = await fetch(`${API_BASE}/api/employees/`);
        console.log
        const data = await response.json();

        const table = document.getElementById("employeeTable");
        table.innerHTML = "";

        data.forEach(emp => {
            table.innerHTML += `
            <tr>
                <td>${emp.full_name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>
                    <button class="btn btn-sm btn-danger"
                        onclick="deleteEmployee('${emp.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        });
    }

    window.addEmployee = async function () {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const departmentInput = document.getElementById("department");
        const messageDiv = document.getElementById("formMessage");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const department = departmentInput.value.trim();

        messageDiv.innerHTML = "";

        if (!name) {
            showMessage("Full name is required.", "danger");
            return;
        }

        if (!email) {
            showMessage("Email is required.", "danger");
            return;
        }

        if (!validateEmail(email)) {
            showMessage("Please enter a valid email address.", "danger");
            return;
        }

        if (!department) {
            showMessage("Department is required.", "danger");
            return;
        }

        try {
            let url = `${API_BASE}/api/employees/`;
            let method = "POST";

            if (window.currentEditId) {
                url = `${API_BASE}/api/employees/${window.currentEditId}/`;
                method = "PUT";
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name: name,
                    email: email,
                    department: department
                })
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = "Something went wrong.";

                if (data.email) {
                    errorMessage = data.email[0];
                } else if (data.full_name) {
                    errorMessage = data.full_name[0];
                } else if (data.department) {
                    errorMessage = data.department[0];
                }

                showMessage(errorMessage, "danger");
                return;
            }

            showMessage(
                window.currentEditId ? "Employee updated successfully!" : "Employee added successfully!",
                "success"
            );

            nameInput.value = "";
            emailInput.value = "";
            departmentInput.value = "";
            window.currentEditId = null;

            fetchEmployees();

        } catch (error) {
            console.error(error);
            showMessage("Server error. Please try again.", "danger");
        }
    };

    window.deleteEmployee = async function (id) {
        if (!confirm("Are you sure you want to delete this employee?")) return;

        await fetch(`${API_BASE}/api/employees/${id}/`, {
            method: "DELETE"
        });

        alert("Employee deleted");
        fetchEmployees();
    };

    window.editEmployee = function (id, name, email, department) {
        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        document.getElementById("department").value = department;

        window.currentEditId = id;
    };

    function showMessage(message, type) {
        const messageDiv = document.getElementById("formMessage");

        messageDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    fetchEmployees();
}