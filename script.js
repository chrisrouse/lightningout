document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openFlowBtn');
    const closeBtn = document.getElementById('closeFlowBtn');
    const widgetContainer = document.getElementById('flowWidgetContainer');
    const flowContent = document.getElementById('flowContent');
    
    // Configuration
    const sfConfig = {
        lightning: {
            endpoint: 'https://YOUR_SALESFORCE_DOMAIN.my.salesforce.com',
            componentName: 'c:flowContainer',
            appName: 'c:flowOutApp',
            authParams: {
                client_id: 'YOUR_CONNECTED_APP_CONSUMER_KEY',
                redirect_uri: window.location.origin,
                scope: 'api'
            }
        }
    };
    
    // Event listeners
    openBtn.addEventListener('click', openFlowWidget);
    closeBtn.addEventListener('click', closeFlowWidget);
    
    // Listen for messages from the Flow
    window.addEventListener('message', function(event) {
        try {
            const message = JSON.parse(event.data);
            if (message.status === 'FINISHED') {
                // Handle flow completion as needed
                setTimeout(closeFlowWidget, 1000); // Auto close after flow completes
            }
        } catch (e) {
            // Not our message or not JSON
        }
    });
    
    function openFlowWidget() {
        widgetContainer.classList.remove('hidden');
        
        // Initialize Lightning Out if not already done
        if (!window.$Lightning) {
            initLightningOut();
        } else {
            // If already initialized, just create component
            createFlowComponent();
        }
    }
    
    function closeFlowWidget() {
        widgetContainer.classList.add('hidden');
        // Optionally clear the content to reset the flow
        flowContent.innerHTML = '';
    }
    
    function initLightningOut() {
        const lightning = sfConfig.lightning;
        
        $Lightning.use(
            lightning.appName,
            function() {
                createFlowComponent();
            },
            lightning.endpoint,
            lightning.authParams
        );
    }
    
    function createFlowComponent() {
        const lightning = sfConfig.lightning;
        
        $Lightning.createComponent(
            lightning.componentName,
            {
                flowName: 'Your_Flow_API_Name' // Replace with your actual flow API name
            },
            flowContent,
            function(cmp) {
                console.log('Flow component created');
            }
        );
    }
});
