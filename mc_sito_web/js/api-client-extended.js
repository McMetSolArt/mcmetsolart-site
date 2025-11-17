/**
 * API CLIENT EXTENDED - MC MetSolArt
 * Extensii pentru funcționalități complete
 */

// Extinde API Client cu funcționalități noi
if (window.API) {
    // ============================================
    // COMENZI COMPLETE
    // ============================================
    
    window.API.createOrder = async function(orderData) {
        return this.request('/orders/create', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    };
    
    window.API.getOrderDetails = async function(orderId) {
        return this.request(`/orders/${orderId}`);
    };
    
    // ============================================
    // NOTIFICĂRI
    // ============================================
    
    window.API.getNotifications = async function() {
        return this.request('/notifications');
    };
    
    window.API.markNotificationRead = async function(notificationId) {
        return this.request(`/notifications/${notificationId}/read`, {
            method: 'PUT'
        });
    };
    
    window.API.getUnreadNotificationsCount = async function() {
        try {
            const response = await this.getNotifications();
            if (response.success) {
                const unread = response.data.notifications.filter(n => !n.read);
                return unread.length;
            }
            return 0;
        } catch (error) {
            console.error('Error getting unread count:', error);
            return 0;
        }
    };
    
    // ============================================
    // ADRESE LIVRARE
    // ============================================
    
    window.API.getShippingAddresses = async function() {
        return this.request('/shipping-addresses');
    };
    
    window.API.addShippingAddress = async function(addressData) {
        return this.request('/shipping-addresses', {
            method: 'POST',
            body: JSON.stringify(addressData)
        });
    };
    
    window.API.updateShippingAddress = async function(addressId, addressData) {
        return this.request(`/shipping-addresses/${addressId}`, {
            method: 'PUT',
            body: JSON.stringify(addressData)
        });
    };
    
    window.API.deleteShippingAddress = async function(addressId) {
        return this.request(`/shipping-addresses/${addressId}`, {
            method: 'DELETE'
        });
    };
    
    // ============================================
    // ADMIN - GESTIONARE COMENZI
    // ============================================
    
    window.API.admin = {
        getAllOrders: async function() {
            return window.API.request('/admin/orders');
        },
        
        confirmOrder: async function(orderId, adminNotes = '') {
            return window.API.request(`/admin/orders/${orderId}/confirm`, {
                method: 'PUT',
                body: JSON.stringify({ admin_notes: adminNotes })
            });
        },
        
        updateOrderStatus: async function(orderId, status, trackingNumber = null) {
            return window.API.request(`/admin/orders/${orderId}/status`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    status, 
                    tracking_number: trackingNumber 
                })
            });
        },
        
        getOrderDetails: async function(orderId) {
            return window.API.request(`/admin/orders/${orderId}`);
        }
    };
    
    console.log('✅ API Client Extended loaded!');
} else {
    console.error('❌ API Client not found! Load api-client.js first.');
}
