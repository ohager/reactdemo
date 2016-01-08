define(function(){

    function Position(x,y) {
        this.x = x;
        this.y = y;
        this.copy = function(){
            return new Position(this.x, this.y);
        }
    }

    function MouseListener(){

        var clickPosition = new Position(0,0);

        window.addEventListener('mousedown', function(e){
            clickPosition = new Position(e.pageX, e.pageY);
        });

        this.getClickPosition = function(){
            return clickPosition.copy();
        }
    }

    window.MouseListener = window.MouseListener || new MouseListener();

    return window.MouseListener;

});
