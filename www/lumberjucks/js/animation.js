let Animation = {
    init: function(data) {

    },
    update: function(data) {
        Animation.coins(data);
    },
    coins: function(data) {
        data.entities.coinsArray.forEach(coin => {
            coin.currentState.animation(data);
        });
    }
};