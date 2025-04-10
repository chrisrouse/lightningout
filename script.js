document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openFlowBtn');
    const closeBtn = document.getElementById('closeFlowBtn');
    const widgetContainer = document.getElementById('flowWidgetContainer');
    const flowContent = document.getElementById('flowContent');
    
    // Configuration for Experience Site with Guest Access
    const sfConfig = {
        lightning: {
            endpoint: 'https://icevonline--full.sandbox.my.site.com/s/lightning/lightning.out.js',
            componentName: 'c:flowContainer',
            appName: 'c:flowOutApp'
            // No authParams needed for guest access through Experience Site
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
            lightning.endpoint
            // No auth parameters for guest access
        );
    }
    
    function createFlowComponent() {
        const lightning = sfConfig.lightning;
        
        $Lightning.createComponent(
            lightning.componentName,
            {
                flowName: 'Lightning_Out_Contact_Form' // Your actual Flow API name
            },
            flowContent,
            function(cmp) {
                console.log('Flow component created');
            }
        );
    }
});
