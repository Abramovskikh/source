let Render = {
    init: function(data){
        Render.helpers.drawIntitiy(data.entities.background, data.canvas.bCtx);
    },

    update: function(data) {
        let c = data.canvas.fCtx;
        c.clearRect(0, 0, data.canvas.w, data.canvas.h);
        Render.helpers.drawIntitiy(data.entities.jack, c);

        data.entities.coinsArray.forEach(coin => {
            Render.helpers.drawIntitiy(coin, c)
        });
    },

    helpers: {
        drawIntitiy: function(entity, ctx) {
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y,
                entity.w, entity.h);
        }
    }
};