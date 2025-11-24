// ==========================================
// AD CONFIGURATION - Replace with YOUR ad IDs
// ==========================================

const AD_CONFIG = {
    // Google AdSense Configuration
    ADSENSE: {
        enabled: true,
        publisher_id: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense Publisher ID

        // Native Ad Units
        native_ads: [
            {
                slot_id: '1234567890', // Replace with your ad slot ID
                location: 'header-native-ad',
                format: 'auto'
            },
            {
                slot_id: '0987654321', // Replace with your ad slot ID
                location: 'sidebar-native-ad',
                format: 'rectangle'
            },
            {
                slot_id: '1122334455', // Replace with your ad slot ID
                location: 'footer-native-ad',
                format: 'horizontal'
            },
            {
                slot_id: '5544332211', // Replace with your ad slot ID
                location: 'result-native-ad',
                format: 'auto'
            }
        ],

        // Rewarded Ad Unit
        rewarded_ad: {
            slot_id: '9988776655', // Replace with your rewarded ad slot ID
            enabled: true
        }
    },

    // Google AdMob (Alternative - Better for mobile)
    ADMOB: {
        enabled: false, // Set to true if using AdMob instead
        app_id: 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY', // Replace with your AdMob App ID

        rewarded_ad: {
            unit_id: 'ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ' // Replace with your rewarded ad unit ID
        },

        interstitial_ad: {
            unit_id: 'ca-app-pub-XXXXXXXXXXXXXXXX/AAAAAAAAAA' // Replace with your interstitial ad unit ID
        }
    },

    // Fallback Settings (for testing)
    TESTING_MODE: true, // Set to false in production
    SIMULATION_DURATION: 15 // Seconds for ad simulation (used only if real ads fail to load)
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AD_CONFIG;
}
