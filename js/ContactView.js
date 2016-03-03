
(function(win){
    win.ContactView = function(){
    };
    jQuery.extend(ContactView.prototype, {
        nodeHtml:   '<div class="item">' +
                        '<img>'+
                        '<span/>' +
                    '</div>',
        init: function(parent){
            this.node = $(this.nodeHtml).appendTo(parent);
            this.imgNode = $('img', this.node);
            this.valueNode = $('span', this.node);
        },
        show: function(value){
            this.valueNode.text(value);
            this.imgNode.attr('src', 'images/' + parseInt(5*Math.random()) + '.jpg');
        }
    })
})(window);