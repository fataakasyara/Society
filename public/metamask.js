// MetaMask Connection Handler
class MetaMaskConnector {
    constructor() {
        this.isConnected = false;
        this.currentAccount = null;
        this.provider = null;
        this.init();
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
            this.provider.on('chainChanged', (chainId) => {
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
            this.showAlert('Please install MetaMask to connect your wallet.', 'warning');
            return;
        }

        try {
            // Request account access
            const accounts = await this.provider.request({ 
                method: 'eth_requestAccounts' 
            });

            if (accounts.length > 0) {
                this.handleAccountsChanged(accounts);
                this.showAlert('Successfully connected to MetaMask!', 'success');
            }
        } catch (error) {
            console.error('Connection error:', error);
            
            if (error.code === 4001) {
                this.showAlert('Connection rejected by user.', 'info');
            } else {
                this.showAlert('Failed to connect to MetaMask.', 'error');
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
        this.showAlert('Disconnected from MetaMask.', 'info');
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
                    
                    // Update button text
                    button.textContent = 'Connected';
                    button.classList.add('connected');
                    button.disabled = false;
                    
                    // Update address display
                    addressEl.textContent = truncatedAddress;
                    addressEl.title = address; // Show full address on hover
                    addressEl.classList.add('connected');
                } else {
                    // Reset to disconnected state
                    button.textContent = 'Connect MetaMask';
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
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
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
}

// Initialize MetaMask connector when DOM is loaded
let metaMaskConnector;

document.addEventListener('DOMContentLoaded', () => {
    metaMaskConnector = new MetaMaskConnector();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetaMaskConnector;
}
