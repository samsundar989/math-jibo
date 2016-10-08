"use strict";

let jibo = require ('jibo');
let Status = jibo.bt.Status;

jibo.init('face', function(err) {
    if (err) {
        return console.error(err);
    }
    // We need to require any custom behaviors so that they can
    // register themselves with the behavior factory.


    // Load and create the behavior tree
    let root = jibo.bt.create('../behaviors/21-take-photo');
    root.start();

    // Listen for frame update for change in status
    jibo.timer.on('update', function(elapsed){
        if (root.status !== Status.IN_PROGRESS) {
            console.log('Behavior tree finished with status: %s', root.status);
            jibo.timer.stop();
        } else {
            root.update();
        }
    });
});
