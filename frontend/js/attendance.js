{
    async function fetchAttendance() {
        const response = await fetch(`${API_BASE}/api/attendance/`);
        const data = await response.json();

        const table = document.getElementById("attendanceTable");
        table.innerHTML = "";

        data.forEach(att => {
            table.innerHTML += `
            <tr>
                <td>${att.employee_name}</td>
                <td>${att.date}</td>
                <td>
                    <span class="badge ${att.status === 'Present' ? 'bg-success' : 'bg-danger'}">
                        ${att.status}
                    </span>
                </td>
            </tr>
        `;
        });
    }

    window.markAttendance = async function () {
        const employeeId = document.getElementById("employeeId").value;
        const date = document.getElementById("date").value;
        const status = document.getElementById("status").value;

        if (!employeeId || !date) {
            showMessage("Please select employee and date.", "danger");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/attendance/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employee: employeeId,
                    date: date,
                    status: status
                })
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = "Unable to mark attendance.";

                if (data.non_field_errors) {
                    errorMessage = "Attendance already marked for this employee on this date.";
                }

                showMessage(errorMessage, "danger");
                return;
            }

            showMessage("Attendance marked successfully!", "success");

            document.getElementById("employeeId").value = "";
            document.getElementById("status").value = "Present";

            fetchAttendance();

        } catch (error) {
            console.error(error);
            showMessage("Server error. Please try again.", "danger");
        }
    };

    async function loadEmployees() {
        const response = await fetch(`${API_BASE}/api/employees/`);
        const employees = await response.json();

        const dropdown = document.getElementById("employeeId");

        dropdown.innerHTML = '<option value="">Select Employee</option>';

        employees.forEach(emp => {
            dropdown.innerHTML += `
                <option value="${emp.id}">
                    ${emp.full_name}
                </option>
            `;
        });
    }

    function showMessage(message, type) {
        const messageDiv = document.getElementById("formMessage");

        messageDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    document.addEventListener("DOMContentLoaded", function () {
        loadEmployees();
    });

    fetchAttendance();
}