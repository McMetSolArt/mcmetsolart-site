"""McMetSolArtBackend package initializer.

This file makes the backend folder a proper Python package so that
relative imports (e.g. `from .translations import t`) work when
the application is started via module path (gunicorn McMetSolArtBackend.app:app).
"""

__all__ = []
