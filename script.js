function initLightningOut() {
    $Lightning.use(
        'c:flowOutApp',  // your Lightning Out app name
        function() {
            $Lightning.createComponent(
                'c:flowContainer',
                { flowName: 'Lightning_Out_Contact_Form' },
                'flowContent',
                function(cmp) {
                    console.log('Flow component created');
                }
            );
        },
        'https://icevonline--full.sandbox.my.site.com/s'  // Experience site endpoint
    );
}
