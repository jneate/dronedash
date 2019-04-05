/**
 * messages module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojbutton', 'factories/WebsocketFactory',
        'viewModels/animation', 'ojs/ojinputtext', 'ojs/ojformlayout'
], function (oj, ko, io, WebsocketFactory, Animation) {
    /**
     * The view model for the messages view template
     */

    function MessagesViewModel() {

        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.messageArray = ko.observableArray();
        self.yawAmount = ko.observable("0");
        self.rollAmount = ko.observable("0");
        self.pitchAmount = ko.observable("0");
        self.gazAmount = ko.observable("0");

        var i = 0;
        var websocket = WebsocketFactory.getWebsocket();

        self.addMessage = function (message) {

            var array = self.messageArray();
            
            i = i + 1;
            array.push({
                "id": i,
                "yaw": message.movement.yaw,
                "roll": message.movement.roll,
                "pitch": message.movement.pitch,
                "gaz": message.movement.gaz
            });

            self.messageArray(array);

        };

        websocket.onmessage = function (event) {

            oj.Logger.error(event);

            if (event.data) {

                console.log(event.data);

                var message = JSON.parse(event.data);

                rootViewModel.onTakeOff(false);
                rootViewModel.onLand(false);

                if (message.Action) {
                    if (message.Action === 'takeoff') {
                        rootViewModel.onTakeOff(true);
                        $("#takeoffImg").fadeOut(2500, function () {
                            rootViewModel.onTakeOff(false);
                        });
                    } else if (message.Action === 'land') {
                        rootViewModel.onLand(true);
                        $("#landImg").fadeOut(2500, function () {
                            rootViewModel.onLand(false);
                        });
                    }
                } else {
                    self.addMessage(message);
                    Animation.onMessage(message.movement.pitch, message.movement.yaw, message.movement.roll, message.movement.gaz);
                }

            }

        };

        self.emitMessage = function() {

            var command = {
                "movement": {
                    "yaw": self.yawAmount(),
                    "roll": self.rollAmount(),
                    "pitch": self.pitchAmount(),
                    "gaz": self.gazAmount()
                }
            };

            //Comment out for LIVE API
            // self.addMessage(command);
            // Animation.onMessage(command.movement.pitch, command.movement.yaw, command.movement.roll);

            websocket.send(JSON.stringify(command));

        };

    };
    
    return new MessagesViewModel();

});
