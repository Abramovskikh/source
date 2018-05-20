let Physics = {
    update: function(data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
    },

    collisionDetection: function(data) {

        let jack = data.entities.jack;
        let entityColisionCheck = function(entity) {
            if(jack.x < entity.x + entity.w && jack.x + jack.w > entity.x &&
            jack.y < entity.y + entity.h && jack.y + jack.h > entity.y) {
                Physics.handleCollision(data, entity);
            }
        };

        data.entities.wallArray.forEach(wall => entityColisionCheck(wall));
    },

    handleCollision: function(data, entity) {
        let jack = data.entities.jack;
        if(entity.type === "wall") {
            if(jack.x < entity.x && jack.y >= entity.y) {
                jack.x = entity.x - jack.w;
            }
            if(jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }
            if(jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
            jack.x < (entity.x + entity.w) - 10 && jack.velY >= 10) {
                // jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
    },

    helpers: {
        gravity: function(entity) {
            entity.velY += 1.2;
            entity.y += entity.velY;
        }
    }
};