
(function(win){
    win.ListAdapter = function(){
        this.itemArray = [];
    };
    jQuery.extend(ListAdapter.prototype, {
        init: function(){
            for(var i = 0; i < 500000; i++){
                this.itemArray.push(i);
            }
        },
        getCount: function(){
            return this.itemArray.length;
        },
        getValue: function(index){
            return this.itemArray[index];
        }
    })
})(window);