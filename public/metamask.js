// MetaMask Connection Handler
class MetaMaskConnector {
    constructor() {
        this.isConnected = false;
        this.currentAccount = null;
        this.provider = null;
        this.init();
        this.injectCustomCSS();
    }

    // Function to truncate Ethereum address
    truncateAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Initialize MetaMask connection
    async init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.provider = window.ethereum;
            
            // Check if already connected
            try {
                const accounts = await this.provider.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.handleAccountsChanged(accounts);
                }
            } catch (error) {
                console.error('Error checking existing connection:', error);
            }

            // Listen for account changes
            this.provider.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });

            // Listen for chain changes
            this.provider.on('chainChanged', () => {
                window.location.reload();
            });
        }

        this.setupEventListeners();
    }

    // Setup event listeners for connect buttons
    setupEventListeners() {
        // Desktop connect button
        const connectBtn = document.getElementById('connect');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connect());
        }

        // Mobile connect button
        const connectBtn2 = document.getElementById('connect2');
        if (connectBtn2) {
            connectBtn2.addEventListener('click', () => this.connect());
        }

        // Disconnect buttons (if any)
        const disconnectBtns = document.querySelectorAll('.disconnect-btn');
        disconnectBtns.forEach(btn => {
            btn.addEventListener('click', () => this.disconnect());
        });
    }

    // Connect to MetaMask
    async connect() {
        if (!window.ethereum) {
            this.showAlert('MetaMask wallet not detected. Please install MetaMask extension to connect your wallet and access Web3 features.', 'warning');
            return;
        }

        try {
            // Request account access
            const accounts = await this.provider.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length > 0) {
                this.handleAccountsChanged(accounts);
                this.showAlert('🎉 Successfully connected to MetaMask! Your wallet is now linked to Nolyx Society.', 'success');
            }
        } catch (error) {
            console.error('Connection error:', error);

            if (error.code === 4001) {
                this.showAlert('Connection request was rejected. Please try again and approve the connection to continue.', 'info');
            } else if (error.code === -32002) {
                this.showAlert('Connection request is already pending. Please check your MetaMask extension.', 'info');
            } else {
                this.showAlert('Failed to connect to MetaMask. Please make sure your wallet is unlocked and try again.', 'error');
            }

            this.updateUI(false, null);
        }
    }

    // Handle account changes
    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected
            this.isConnected = false;
            this.currentAccount = null;
            this.updateUI(false, null);
        } else {
            // User connected or switched accounts
            this.isConnected = true;
            this.currentAccount = accounts[0];
            this.updateUI(true, accounts[0]);
        }
    }

    // Disconnect from MetaMask
    async disconnect() {
        this.isConnected = false;
        this.currentAccount = null;
        this.updateUI(false, null);
        this.showAlert('👋 Successfully disconnected from MetaMask. Your wallet is no longer connected to this site.', 'info');
    }

    // Update UI elements
    updateUI(connected, address) {
        const elements = {
            desktop: {
                button: document.getElementById('connect'),
                address: document.getElementById('address')
            },
            mobile: {
                button: document.getElementById('connect2'),
                address: document.getElementById('address2')
            }
        };

        Object.values(elements).forEach(({ button, address: addressEl }) => {
            if (button && addressEl) {
                if (connected && address) {
                    const truncatedAddress = this.truncateAddress(address);

                    // Update button with checkmark animation
                    button.innerHTML = `
                        <div class="metamask-connected-container">
                            <div class="metamask-checkmark">
                                <div class="metamask-checkmark-circle">
                                    <div class="metamask-checkmark-stem"></div>
                                    <div class="metamask-checkmark-kick"></div>
                                </div>
                            </div>
                            <span class="metamask-connected-text">Connected</span>
                        </div>
                    `;
                    button.classList.add('connected');
                    button.disabled = false;

                    // Trigger checkmark animation
                    setTimeout(() => {
                        const checkmark = button.querySelector('.metamask-checkmark');
                        if (checkmark) {
                            checkmark.classList.add('animate');
                        }
                    }, 100);

                    // Trigger celebration effect
                    setTimeout(() => {
                        button.classList.add('celebrate');
                        this.createConfettiEffect(button);
                        setTimeout(() => {
                            button.classList.remove('celebrate');
                        }, 600);
                    }, 800);

                    // Update address display
                    addressEl.textContent = truncatedAddress;
                    addressEl.title = address; // Show full address on hover
                    addressEl.classList.add('connected');
                } else {
                    // Reset to disconnected state
                    button.innerHTML = 'Connect MetaMask';
                    button.classList.remove('connected');
                    button.disabled = false;

                    addressEl.textContent = 'Not connected';
                    addressEl.title = '';
                    addressEl.classList.remove('connected');
                }
            }
        });
    }

    // Show alert messages
    showAlert(message, type = 'info') {
        // Check if SweetAlert2 is available
        if (typeof Swal !== 'undefined') {
            const config = {
                title: this.getAlertTitle(type),
                text: message,
                icon: type,
                timer: 4000,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                toast: false,
                position: 'center',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showClass: {
                    popup: 'swal2-show',
                    backdrop: 'swal2-backdrop-show',
                    icon: 'swal2-icon-show'
                },
                hideClass: {
                    popup: 'swal2-hide',
                    backdrop: 'swal2-backdrop-hide',
                    icon: 'swal2-icon-hide'
                },
                customClass: {
                    popup: 'metamask-alert-popup',
                    title: 'metamask-alert-title',
                    content: 'metamask-alert-content',
                    confirmButton: 'metamask-alert-button',
                    icon: 'metamask-alert-icon'
                }
            };

            Swal.fire(config);
        } else {
            // Fallback to regular alert
            alert(message);
        }
    }

    // Get alert title based on type
    getAlertTitle(type) {
        const titles = {
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Info'
        };
        return titles[type] || 'Notification';
    }

    // Get current connection status
    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            account: this.currentAccount,
            truncatedAccount: this.currentAccount ? this.truncateAddress(this.currentAccount) : null
        };
    }

    // Create confetti effect for successful connection
    createConfettiEffect(button) {
        const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'];
        const confettiCount = 15;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'metamask-confetti';
                confetti.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                `;

                // Position relative to button
                const buttonRect = button.getBoundingClientRect();
                confetti.style.left = (buttonRect.left + buttonRect.width / 2) + 'px';
                confetti.style.top = (buttonRect.top + buttonRect.height / 2) + 'px';

                document.body.appendChild(confetti);

                // Animate confetti
                const angle = (Math.PI * 2 * i) / confettiCount;
                const velocity = 100 + Math.random() * 50;
                const gravity = 300;
                const life = 1000 + Math.random() * 500;

                let startTime = Date.now();
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / life;

                    if (progress >= 1) {
                        confetti.remove();
                        return;
                    }

                    const x = Math.cos(angle) * velocity * (elapsed / 1000);
                    const y = Math.sin(angle) * velocity * (elapsed / 1000) + 0.5 * gravity * Math.pow(elapsed / 1000, 2);

                    confetti.style.transform = `translate(${x}px, ${y}px) scale(${1 - progress})`;
                    confetti.style.opacity = 1 - progress;

                    requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
            }, i * 50);
        }
    }

    // Get network information
    async getNetworkInfo() {
        if (!this.provider) return null;

        try {
            const chainId = await this.provider.request({ method: 'eth_chainId' });
            return {
                chainId: chainId,
                chainIdDecimal: parseInt(chainId, 16)
            };
        } catch (error) {
            console.error('Error getting network info:', error);
            return null;
        }
    }

    // Get balance
    async getBalance() {
        if (!this.provider || !this.currentAccount) return null;

        try {
            const balance = await this.provider.request({
                method: 'eth_getBalance',
                params: [this.currentAccount, 'latest']
            });

            // Convert from wei to ether
            const balanceInEther = parseInt(balance, 16) / Math.pow(10, 18);
            return balanceInEther.toFixed(4);
        } catch (error) {
            console.error('Error getting balance:', error);
            return null;
        }
    }

    // Inject custom CSS for MetaMask alerts
    injectCustomCSS() {
        // Check if CSS is already injected
        if (document.querySelector('#metamask-alert-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'metamask-alert-styles';
        style.textContent = `
            /* MetaMask Alert Custom Styles */
            .metamask-alert-popup {
                border-radius: 16px !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
                border: 2px solid #10b981 !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            .metamask-alert-title {
                color: #1f2937 !important;
                font-size: 1.5rem !important;
                font-weight: 700 !important;
                margin-bottom: 0.5rem !important;
            }

            .metamask-alert-content {
                color: #4b5563 !important;
                font-size: 1rem !important;
                line-height: 1.5 !important;
                margin-bottom: 1rem !important;
            }

            .metamask-alert-button {
                background: linear-gradient(135deg, #10b981, #059669) !important;
                border: none !important;
                border-radius: 8px !important;
                padding: 12px 24px !important;
                font-weight: 600 !important;
                font-size: 0.95rem !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
            }

            .metamask-alert-button:hover {
                background: linear-gradient(135deg, #059669, #047857) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4) !important;
            }

            .metamask-alert-button:focus {
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3) !important;
            }

            /* Success alert styling */
            .swal2-success .swal2-icon {
                border-color: #10b981 !important;
                color: #10b981 !important;
            }

            .swal2-success .swal2-success-ring {
                border-color: #10b981 !important;
            }

            .swal2-success .swal2-success-fix {
                background-color: #10b981 !important;
            }

            .swal2-success [class^='swal2-success-line'] {
                background-color: #10b981 !important;
            }

            .swal2-success .swal2-success-line-tip {
                background-color: #10b981 !important;
            }

            .swal2-success .swal2-success-line-long {
                background-color: #10b981 !important;
            }

            /* Fix success checkmark animation */
            .swal2-success::before,
            .swal2-success::after {
                background: #10b981 !important;
            }

            .swal2-success .swal2-success-circular-line-left {
                background-color: #10b981 !important;
            }

            .swal2-success .swal2-success-circular-line-right {
                background-color: #10b981 !important;
            }

            /* Error alert styling */
            .swal2-error .swal2-icon {
                border-color: #ef4444 !important;
            }

            .swal2-error .swal2-x-mark {
                color: #ef4444 !important;
            }

            /* Warning alert styling */
            .swal2-warning .swal2-icon {
                border-color: #f59e0b !important;
                color: #f59e0b !important;
            }

            /* Info alert styling */
            .swal2-info .swal2-icon {
                border-color: #3b82f6 !important;
                color: #3b82f6 !important;
            }

            /* Backdrop styling */
            .swal2-backdrop-show {
                background: rgba(0, 0, 0, 0.4) !important;
                backdrop-filter: blur(4px) !important;
            }

            /* Icon styling improvements */
            .metamask-alert-icon {
                border: 3px solid #10b981 !important;
            }

            /* Success icon specific fixes */
            .swal2-success .swal2-icon::before {
                background-color: #10b981 !important;
            }

            .swal2-success .swal2-icon::after {
                background-color: #10b981 !important;
            }

            /* Ensure success checkmark is visible and animated */
            .swal2-success .swal2-success-line {
                background-color: #10b981 !important;
                height: 5px !important;
                border-radius: 2px !important;
            }

            .swal2-success .swal2-success-line.swal2-success-line-tip {
                left: 28px !important;
                top: 46px !important;
                width: 25px !important;
                transform: rotate(45deg) !important;
                animation: swal2-animate-success-line-tip 0.75s !important;
            }

            .swal2-success .swal2-success-line.swal2-success-line-long {
                right: 8px !important;
                top: 38px !important;
                width: 47px !important;
                transform: rotate(-45deg) !important;
                animation: swal2-animate-success-line-long 0.75s !important;
            }

            /* Success checkmark animation keyframes */
            @keyframes swal2-animate-success-line-tip {
                0% {
                    width: 0;
                    left: 1px;
                    top: 19px;
                }
                54% {
                    width: 0;
                    left: 1px;
                    top: 19px;
                }
                70% {
                    width: 50px;
                    left: -8px;
                    top: 37px;
                }
                84% {
                    width: 17px;
                    left: 21px;
                    top: 48px;
                }
                100% {
                    width: 25px;
                    left: 14px;
                    top: 45px;
                }
            }

            @keyframes swal2-animate-success-line-long {
                0% {
                    width: 0;
                    right: 46px;
                    top: 54px;
                }
                65% {
                    width: 0;
                    right: 46px;
                    top: 54px;
                }
                84% {
                    width: 55px;
                    right: 0px;
                    top: 35px;
                }
                100% {
                    width: 47px;
                    right: 8px;
                    top: 38px;
                }
            }

            /* MetaMask Connected Button Checkmark Animation */
            .metamask-connected-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .metamask-checkmark {
                width: 20px;
                height: 20px;
                position: relative;
                transform: scale(0);
                transition: transform 0.3s ease-in-out;
            }

            .metamask-checkmark.animate {
                transform: scale(1);
            }

            .metamask-checkmark-circle {
                width: 20px;
                height: 20px;
                border: 2px solid #10b981;
                border-radius: 50%;
                position: relative;
                background: #10b981;
                animation: metamask-checkmark-circle 0.6s ease-in-out;
            }

            .metamask-checkmark-stem,
            .metamask-checkmark-kick {
                position: absolute;
                background: white;
                border-radius: 2px;
            }

            .metamask-checkmark-stem {
                width: 3px;
                height: 9px;
                left: 11px;
                top: 6px;
                transform: rotate(45deg);
                animation: metamask-checkmark-stem 0.4s ease-in-out 0.2s both;
            }

            .metamask-checkmark-kick {
                width: 5px;
                height: 3px;
                left: 8px;
                top: 12px;
                transform: rotate(-45deg);
                animation: metamask-checkmark-kick 0.2s ease-in-out 0.3s both;
            }

            .metamask-connected-text {
                font-weight: 600;
                color: white;
                animation: metamask-text-appear 0.3s ease-in-out 0.4s both;
                opacity: 0;
            }

            /* Keyframes for checkmark animation */
            @keyframes metamask-checkmark-circle {
                0% {
                    transform: scale(0) rotate(45deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.2) rotate(45deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(1) rotate(45deg);
                    opacity: 1;
                }
            }

            @keyframes metamask-checkmark-stem {
                0% {
                    height: 0;
                    opacity: 0;
                }
                100% {
                    height: 9px;
                    opacity: 1;
                }
            }

            @keyframes metamask-checkmark-kick {
                0% {
                    width: 0;
                    opacity: 0;
                }
                100% {
                    width: 5px;
                    opacity: 1;
                }
            }

            @keyframes metamask-text-appear {
                0% {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            /* Enhanced connected button styling */
            .metamask-alert-button.connected {
                background: linear-gradient(135deg, #10b981, #059669) !important;
                border: none !important;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important;
                transform: scale(1.02);
                transition: all 0.3s ease !important;
                position: relative;
                overflow: hidden;
            }

            .metamask-alert-button.connected::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                animation: metamask-pulse 2s ease-in-out infinite;
                pointer-events: none;
            }

            .metamask-alert-button.connected:hover {
                background: linear-gradient(135deg, #059669, #047857) !important;
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4) !important;
                transform: scale(1.05);
            }

            @keyframes metamask-pulse {
                0% {
                    opacity: 0;
                    transform: scale(0.8);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: scale(1.4);
                }
            }

            /* Success celebration effect */
            .metamask-alert-button.connected.celebrate {
                animation: metamask-celebrate 0.6s ease-in-out;
            }

            @keyframes metamask-celebrate {
                0% { transform: scale(1.02); }
                25% { transform: scale(1.1) rotate(2deg); }
                50% { transform: scale(1.05) rotate(-1deg); }
                75% { transform: scale(1.08) rotate(1deg); }
                100% { transform: scale(1.02) rotate(0deg); }
            }

            /* Animation improvements */
            .swal2-show {
                animation: swal2-show 0.3s ease-out !important;
            }

            .swal2-hide {
                animation: swal2-hide 0.15s ease-in !important;
            }

            @keyframes swal2-show {
                0% {
                    transform: scale(0.7) translateY(-20px);
                    opacity: 0;
                }
                100% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }

            @keyframes swal2-hide {
                0% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(0.5) translateY(-20px);
                    opacity: 0;
                }
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .metamask-alert-popup {
                    margin: 1rem !important;
                    max-width: calc(100% - 2rem) !important;
                }

                .metamask-alert-title {
                    font-size: 1.25rem !important;
                }

                .metamask-alert-content {
                    font-size: 0.9rem !important;
                }

                .metamask-alert-button {
                    padding: 10px 20px !important;
                    font-size: 0.9rem !important;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize MetaMask connector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.metaMaskConnector = new MetaMaskConnector();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetaMaskConnector;
}
