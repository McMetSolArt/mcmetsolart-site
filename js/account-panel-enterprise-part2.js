/**
 * ACCOUNT PANEL ENTERPRISE - PART 2
 * Profile, Orders, Settings, Upload
 */

// Extend AccountPanelEnterprise
(function() {
    'use strict';

    if (!window.AccountPanelEnterprise) return;

    const Panel = window.AccountPanelEnterprise;

    // Profile Management
    Panel.loadProfile = function() {
        const content = document.getElementById('accountContentEnterprise');
        const user = this.userData;
        
        if (!this.editMode) {
            content.innerHTML = `
                <div class="account-card-final">
                    <div class="card-title-final">
                        <span>📸</span>
                        ${this.tr('account.profile.image')}
                    </div>
                    <div class="profile-image-section">
                        ${user.avatar_url ? 
                            `<img class="profile-image-preview" src="${user.avatar_url}" alt="Profile">` :
                            `<div class="profile-image-preview">${(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}</div>`
                        }
                        <div class="profile-image-actions">
                            <h4>${this.tr('account.profile.change_image')}</h4>
                            <p>${this.tr('account.profile.upload_hint')}</p>
                            <button class="btn-secondary-final" onclick="window.AccountPanelEnterprise.uploadAvatar()">
                                📤 ${this.tr('account.profile.upload_button')}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="account-card-final">
                    <div class="card-title-final">
                        <span>👤</span>
                        ${this.tr('account.profile.personal_info')}
                    </div>
                    <div class="info-grid-final">
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.profile.first_name')}</div>
                            <div class="info-value-final">${user.firstName || '-'}</div>
                        </div>
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.profile.last_name')}</div>
                            <div class="info-value-final">${user.lastName || '-'}</div>
                        </div>
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.dashboard.email')}</div>
                            <div class="info-value-final">${user.email || '-'}</div>
                        </div>
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.dashboard.phone')}</div>
                            <div class="info-value-final">${user.phone || '-'}</div>
                        </div>
                        ${user.company ? `
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.profile.company')}</div>
                            <div class="info-value-final">${user.company}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="account-card-final">
                    <div class="card-title-final">
                        <span>📍</span>
                        ${this.tr('account.profile.address_info')}
                    </div>
                    <div class="info-grid-final">
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.dashboard.country')}</div>
                            <div class="info-value-final">${user.country || '-'}</div>
                        </div>
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.profile.city')}</div>
                            <div class="info-value-final">${user.city || '-'}</div>
                        </div>
                        <div class="info-item-final" style="grid-column: 1 / -1;">
                            <div class="info-label-final">${this.tr('account.profile.address')}</div>
                            <div class="info-value-final">${user.address || '-'}</div>
                        </div>
                        ${user.postalCode ? `
                        <div class="info-item-final">
                            <div class="info-label-final">${this.tr('account.profile.postal_code')}</div>
                            <div class="info-value-final">${user.postalCode}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="btn-group-final">
                    <button class="btn-primary-final" onclick="window.AccountPanelEnterprise.enableEditMode()">
                        ✏️ ${this.tr('account.profile.edit')}
                    </button>
                </div>
            `;
        } else {
            this.loadProfileEditForm(user);
        }
    };

    Panel.loadProfileEditForm = function(user) {
        const content = document.getElementById('accountContentEnterprise');
        
        content.innerHTML = `
            <form id="profileEditForm" onsubmit="window.AccountPanelEnterprise.saveProfile(event)">
                <div class="account-card-final">
                    <div class="card-title-final">
                        <span>👤</span>
                        ${this.tr('account.profile.personal_info')}
                    </div>
                    <div class="form-grid-final">
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.profile.first_name')} <span class="label-required">*</span>
                            </label>
                            <input type="text" class="form-input-final" name="firstName" value="${user.firstName || ''}" required>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.profile.last_name')} <span class="label-required">*</span>
                            </label>
                            <input type="text" class="form-input-final" name="lastName" value="${user.lastName || ''}" required>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.dashboard.email')} <span class="label-required">*</span>
                            </label>
                            <input type="email" class="form-input-final" name="email" value="${user.email || ''}" required>
                            <div class="form-hint">${this.tr('account.profile.email_hint')}</div>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.dashboard.phone')} <span class="label-required">*</span>
                            </label>
                            <input type="tel" class="form-input-final" name="phone" value="${user.phone || ''}" required>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final full-width">
                            <label class="form-label-final">${this.tr('account.profile.company')}</label>
                            <input type="text" class="form-input-final" name="company" value="${user.company || ''}">
                        </div>
                    </div>
                </div>
                
                <div class="account-card-final">
                    <div class="card-title-final">
                        <span>📍</span>
                        ${this.tr('account.profile.address_info')}
                    </div>
                    <div class="form-grid-final">
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.dashboard.country')} <span class="label-required">*</span>
                            </label>
                            <select class="form-select-final" name="country" required>
                                <option value="">${this.tr('account.profile.select_country')}</option>
                                <option value="România" ${user.country === 'România' ? 'selected' : ''}>${this.tr('country.romania')}</option>
                                <option value="Italia" ${user.country === 'Italia' ? 'selected' : ''}>${this.tr('country.italy')}</option>
                                <option value="Spania" ${user.country === 'Spania' ? 'selected' : ''}>${this.tr('country.spain')}</option>
                                <option value="Germania" ${user.country === 'Germania' ? 'selected' : ''}>${this.tr('country.germany')}</option>
                                <option value="Franța" ${user.country === 'Franța' ? 'selected' : ''}>${this.tr('country.france')}</option>
                                <option value="Altă țară" ${user.country && !['România', 'Italia', 'Spania', 'Germania', 'Franța'].includes(user.country) ? 'selected' : ''}>${this.tr('country.other')}</option>
                            </select>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final">
                            <label class="form-label-final">
                                ${this.tr('account.profile.city')} <span class="label-required">*</span>
                            </label>
                            <input type="text" class="form-input-final" name="city" value="${user.city || ''}" required>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final full-width">
                            <label class="form-label-final">
                                ${this.tr('account.profile.address')} <span class="label-required">*</span>
                            </label>
                            <textarea class="form-textarea-final" name="address" required>${user.address || ''}</textarea>
                            <div class="form-hint">${this.tr('account.profile.address_hint')}</div>
                            <div class="error-message" style="display: none;"></div>
                        </div>
                        <div class="form-group-final">
                            <label class="form-label-final">${this.tr('account.profile.postal_code')}</label>
                            <input type="text" class="form-input-final" name="postalCode" value="${user.postalCode || ''}">
                        </div>
                    </div>
                </div>
                
                <div class="btn-group-final">
                    <button type="submit" class="btn-primary-final">
                        💾 ${this.tr('account.profile.save')}
                    </button>
                    <button type="button" class="btn-outline-final" onclick="window.AccountPanelEnterprise.cancelEdit()">
                        ❌ ${this.tr('account.profile.cancel')}
                    </button>
                </div>
            </form>
        `;
        
        // Add real-time validation
        this.setupFormValidation();
    };

    Panel.setupFormValidation = function() {
        const form = document.getElementById('profileEditForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    };

    Panel.validateField = function(field) {
        const value = field.value.trim();
        const name = field.name;
        let error = '';

        // Clear previous error
        field.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
        }

        // Validation rules
        if (field.required && !value) {
            error = this.tr('validation.required');
        } else if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = this.tr('validation.email_invalid');
            }
        } else if (name === 'phone' && value) {
            const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
            if (!phoneRegex.test(value)) {
                error = this.tr('validation.phone_invalid');
            }
        } else if ((name === 'firstName' || name === 'lastName') && value && value.length < 2) {
            error = this.tr('validation.min_length', { min: 2 });
        } else if (name === 'address' && value && value.length < 5) {
            error = this.tr('validation.min_length', { min: 5 });
        }

        if (error) {
            field.classList.add('error');
            if (errorMsg) {
                errorMsg.textContent = error;
                errorMsg.style.display = 'block';
            }
            return false;
        }

        return true;
    };

    Panel.enableEditMode = function() {
        this.editMode = true;
        this.loadProfile();
    };

    Panel.cancelEdit = function() {
        this.editMode = false;
        this.loadProfile();
    };

    Panel.saveProfile = async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const updatedData = {};
        
        // Validate all fields
        let isValid = true;
        form.querySelectorAll('input, textarea, select').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification(this.tr('account.msg.profile_error'), 'error');
            return;
        }

        formData.forEach((value, key) => {
            updatedData[key] = value;
        });
        
        try {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Call API
            if (window.API && window.API.updateProfile) {
                const response = await window.API.updateProfile(updatedData);
                if (!response.success) {
                    throw new Error(response.message || 'Update failed');
                }
            }
            
            // Update local storage
            this.userData = { ...this.userData, ...updatedData };
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.editMode = false;
            this.loadUserData();
            this.loadProfile();
            
            this.showNotification(this.tr('account.msg.profile_updated'), 'success');
        } catch (error) {
            console.error('Profile update error:', error);
            this.showNotification(this.tr('account.msg.profile_error'), 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    };

    // Avatar Upload
    Panel.uploadAvatar = function() {
        document.getElementById('avatarFileInput').click();
    };

    Panel.handleAvatarUpload = async function(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            this.showNotification(this.tr('validation.max_size', { max: '5MB' }), 'error');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            this.showNotification(this.tr('account.msg.image_error'), 'error');
            return;
        }

        try {
            // Show loading
            this.showNotification('Uploading...', 'info');

            // Create FormData
            const formData = new FormData();
            formData.append('avatar', file);

            // Upload to server
            const response = await fetch('/api/profile/upload-avatar', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const data = await response.json();

            if (data.success) {
                // Update user data
                this.userData.avatar_url = data.data.avatar_url;
                localStorage.setItem('currentUser', JSON.stringify(this.userData));
                
                // Update UI
                this.loadUserData();
                if (this.currentTab === 'profile') {
                    this.loadProfile();
                }
                
                this.showNotification(this.tr('account.msg.image_uploaded'), 'success');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Avatar upload error:', error);
            this.showNotification(this.tr('account.msg.image_error'), 'error');
        }

        // Reset input
        event.target.value = '';
    };

    // Notification System
    Panel.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification-final';
        notification.textContent = message;
        
        // Add to dark mode if needed
        if (document.documentElement.classList.contains('dark')) {
            notification.classList.add('dark');
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

})();
