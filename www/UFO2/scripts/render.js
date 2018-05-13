// Объект реализации отображения картинки на экране
let Render = {
    // Инициализация объектов
    init: function(data) {
        Render.helpers.draw(data.entities.background, data.canvas.bCtx);
    },
    
    // Различные вспомогательные инструменты
    helpers: {
        // Метод как отрисовать изображение
        draw: function(entitie, context) {
            context.drawImage(entitie.sprite.img,           // Выбор изображения
                entitie.sprite.srcX, entitie.sprite.srcY,   // Положения маркера на изображении
                entitie.sprite.srcW, entitie.sprite.srcH,   // Размер рамки выделения на изображении
                entitie.x, entitie.y,                       // Положение на холсте
                entitie.w, entitie.h);                      // Размер на холсте
        }
    }
};