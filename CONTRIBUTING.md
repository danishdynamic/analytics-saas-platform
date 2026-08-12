# 🤝 CONTRIBUTING.md

Thank you for considering contributing to the Analytics SaaS & E Commerce Platform! We welcome contributions from developers of all skill levels.

---

## 📜 Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment free environment for everyone. Please treat all contributors with respect, empathy, and professional courtesy.

---

## 🚀 How Can I Contribute?

1. **Reporting Bugs**
   
Before creating an issue, please search existing issues to avoid duplicates. When filing a bug report, include:

- Description: A clear summary of the issue.

- Steps to Reproduce: Detailed steps showing how to reproduce the behavior.

- Expected vs. Actual Behavior: What you expected to happen versus what actually happened.

- Environment Info: OS, Python/Node versions, browser (if frontend issue), Docker versions.

2. **Suggesting Enhancements**
   
Feature requests are welcome! Please create an issue detailing:

- Goal: What problem does this feature solve?

- Proposed Solution: High-level design or workflow suggestion.

- Alternatives Considered: Any other approaches you thought of.

3. Submitting Pull Requests (PRs)
   
-  **Fork the Repository**: Create your own copy of the repository on GitHub.

- **Create a Feature Branch**: Branch off ```main``` with a descriptive name.

- **Write Code**: Ensure your changes follow the project’s style guide and include relevant unit/integration tests.

- **Test**: Verify that all tests pass locally.

- **Open a PR**: Submit your pull request to the ```main``` branch with a clear summary of your changes.

---

## 💻 Local Development Workflow

Branch Naming Conventions

Use prefix labels to keep git history organized:

- ```feat/``` — New feature or functionality (e.g., ```feat/jwt-refresh-rotation```)

- ```fix/``` — Bug fix (e.g., ```fix/cart-state-persistence```)

- ```docs/``` — Documentation updates (e.g.,```docs/update-env-vars```)

- ```refactor/``` — Code changes that neither fix a bug nor add a feature

- ```test/``` — Adding or updating tests

### Step-by-Step Setup

1. Fork & Clone

```Bash
git clone https://github.com/YOUR_USERNAME/analytics-saas-platform.git
cd analytics-saas-platform
```

2. Backend Setup

```Bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
```

3. Frontend Setup

```Bash
cd ../frontend
npm install
cp .env.example .env
```

4. Run Services with Docker (Optional / Recommended)

```Bash
docker compose up --build
```
---

## 🎨 Code Style & Quality Standards

Commit Message Format

We follow the Conventional Commits specification:

```Plaintext
<type>(<scope>): <short summary>

[optional body]
```

**Examples**:

- feat(auth): add Redis token blacklisting on logout

- fix(frontend): handle cart item quantity increment bug

- docs(readme): add environment variable table

**Backend (Python / FastAPI)**

- Formatting: Follow PEP 8 guidelines. Use black or ruff for code formatting.

- Type Hints: Use Python type annotations throughout FastAPI routes, services, and Pydantic schemas.

- Testing: Write unit tests in the ```backend/tests/``` folder using pytest.

```Bash
cd backend
pytest
```

**Frontend (JavaScript / React / Vite)**

- Component Architecture: Keep components clean, declarative, and separated into modular files under ```src/components/``` and ```src/pages/```.

- State Management: Use Zustand for global client state (Auth, Cart) and TanStack Query for server data fetching/caching.

- Formatting: Format code using Prettier / Oxlint.

```Bash
cd frontend
npm run dev
```