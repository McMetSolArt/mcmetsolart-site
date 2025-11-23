Deployment guide - MC MetSolArt

This document explains how to prepare and deploy the project to a Linux server (recommended) or Windows.

Quick checklist
- Ensure `McMetSolArtBackend/requirements.txt` exists and is installed in a virtualenv.
- Run DB initialization and migration: `python McMetSolArtBackend/app.py` (it will create DB on first run) or run `python McMetSolArtBackend/migrate_add_api_token.py` to add api_token.
- Configure environment variables (use `.env` or export in systemd unit).
- Use Gunicorn + Nginx on Linux, or Waitress on Windows.

Example Linux deployment (Ubuntu)
1. Update & install packages

    sudo apt update
    sudo apt install python3-venv python3-pip nginx certbot python3-certbot-nginx git

2. Clone repo and create venv

    git clone <repo.git> /var/www/mcmetsolart
    cd /var/www/mcmetsolart
    python3 -m venv venv
    source venv/bin/activate
    pip install -r McMetSolArtBackend/requirements.txt

3. Configure environment

    cp McMetSolArtBackend/.env.example McMetSolArtBackend/.env
    # Edit McMetSolArtBackend/.env and set values (DATABASE path, EMAIL_ENABLED etc.)

4. Initialize DB & migrations

    # Option A: let app.py create DB on first run
    python McMetSolArtBackend/app.py

    # Option B: run migration script to add api_token and tokens for existing users
    python McMetSolArtBackend/migrate_add_api_token.py

5. Configure Gunicorn systemd service (example)

Create `/etc/systemd/system/mcmetsolart.service` with:

    [Unit]
    Description=MC MetSolArt backend
    After=network.target

    [Service]
    User=www-data
    Group=www-data
    WorkingDirectory=/var/www/mcmetsolart
    EnvironmentFile=/var/www/mcmetsolart/McMetSolArtBackend/.env
    ExecStart=/var/www/mcmetsolart/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 McMetSolArtBackend.app:app

    [Install]
    WantedBy=multi-user.target

Enable and start:

    sudo systemctl daemon-reload
    sudo systemctl enable mcmetsolart
    sudo systemctl start mcmetsolart

6. Nginx reverse proxy + TLS

Create site file `/etc/nginx/sites-available/mcmetsolart` linking to `sites-enabled` and point to 127.0.0.1:5000, then run certbot:

    sudo ln -s /etc/nginx/sites-available/mcmetsolart /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    sudo certbot --nginx -d yourdomain.com

7. Frontend
- The static `index.html` and `js/` files can be served by Nginx as static files.
- Update `window.__API_BASE_URL__` in the served HTML (before loading `js/api-client.js`) to point to `https://api.yourdomain.com/api` or use a small `config.js` served by backend.

Windows deployment (simple)
- Use Waitress or run behind IIS with a WSGI adapter.

    pip install waitress
    waitress-serve --port=5000 McMetSolArtBackend.app:app

Security notes
- Do NOT run Flask with `debug=True` in production.
- Store secrets in environment variables, not in repo.
- Prefer HttpOnly, Secure cookies for auth tokens to reduce XSS risk.

If you want, I can:
- Add a `systemd` unit file template to the repo.
- Add a small `config.js.template` and instructions to inject `window.__API_BASE_URL__`.
- Create a CI/CD-friendly deploy script.

