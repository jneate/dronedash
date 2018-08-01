/**
 * animation module
 */
define(['ojs/ojcore', 'knockout', 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js'
], function (oj, ko, Sketchfab) {
    /**
     * The view model for the animation view template
     */

    function AnimationViewModel() {

        var self = this;

        var version = '1.0.0';
        var urlid = '6e7dccf233db40b7921f1c6fc5a6e36d';
        var iFrame;
        var client;
        var model;

        self.onClick = function() {

            oj.Logger.error(model.getCameraLookAt());

            model.getCameraLookAt(function( err, camera ) {
                oj.Logger.error(err);
                oj.Logger.error(camera);
            });

            // var position = [ -6.783908948299954, -10.287285049700003, 3.8544928129000118 ];
            var position = [ 0, 16, 3 ]; // Lower Y value moves camera further away from model
            var position2 = [ 0, -20.287285049700003, 3 ]; // Lower Y value moves camera further away from model
            var position3 = [ 0, -20.287285049700003, 3 ]; // Lower Y value moves camera further away from model
            var target = [ -1.3566789564, -2.0016137854, -1.79409073 ];

            model.setCameraLookAt(position, target);

        };

        self.handleAttached = function(info) {
            
            var iframe = document.getElementById('api-frame');

            var client = new Sketchfab(version, iframe);

            client.init(urlid, {
                success: function onSuccess(api) {
                    model = api;
                    oj.Logger.error("Success");
                    oj.Logger.error(api);
                    model.start();
                    model.setCameraLookAt([16,-2,3],  [ -1.3566789564, -2.0016137854, -1.79409073 ]);
                },
                error: function onError() {
                    oj.Logger.error("ERROR");
                }
            });

        };

    }
    
    return new AnimationViewModel();

});
