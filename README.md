1. Clone the Repository
    https://github.com/0188cs181047/hrms_frontend
    hrms_frontend
2. Verify the Project Structure
    frontend/
    ├─ index.html
    ├─ employees.js
    ├─ styles.css
    └─ other frontend files...

3. Update API Base URL
    Open api.js and update the API base URL to your deployed backend:

    const API_BASE = "https://hrms-backend-xxxx.onrender.com";

4. Run Locally
    You can test your frontend locally using a simple HTTP server:
        python -m http.server 5500
        http://127.0.0.1:5500/index.html

5. Test the Frontend

    Open the deployed URL in a browser: https://shivhrms.netlify.app/.

    Verify that your pages load correctly.

    Check if API calls are working by opening browser console or testing features like attendance, employee list, etc.
