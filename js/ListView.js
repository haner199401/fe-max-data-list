(function(win){
    var _this = null;
    win.ListView = function(){
        _this = this;
        this.container = $('#container');
        this.header = $('#header');
        this.list = $('#list');
        this.footer = $('#footer');
        this.containerHeight = this.container.height();
        this.viewHeight = 40;
        this.itemHeight = 0;
        this.totalHeight = 0;        
        this.itemCountPerPage = 10;
        this.viewCount = 30;
        this.beginPosition = 0;
        this.endPosition = 0;
        this.listAdapter = new ListAdapter();
        this.contactViewArray = [];
    };
    jQuery.extend(ListView.prototype, {
        init: function(){
            this.listAdapter.init();
            this.initListView();
            this.initContactView();
            this.showContactView(0);
            this.container.on('scroll', function(){
                _this.onScroll();
            })
        },
        initListView: function(){
            this.contactCount = this.listAdapter.getCount();
            this.itemHeight = this.viewHeight * this.viewCount;
            this.totalHeight = this.contactCount * this.viewHeight;
            this.beginPosition = 0;
            this.endPosition = this.itemHeight;
            this.header.height(0);
            this.list.height(this.itemHeight);
            this.footer.height(this.totalHeight - this.itemHeight);
        },
        initContactView: function(){
            var contactView;
            for(var i = 0; i < this.viewCount; i++){
                contactView = new ContactView();
                this.contactViewArray.push(contactView);
                contactView.init(this.list);
            }
        },
        showContactView: function(startIndex){
            var contactView;
            for(var i = 0; i < this.viewCount; i++){
                contactView = this.contactViewArray[i];
                contactView.show(this.listAdapter.getValue(startIndex + i));
            }
        },
        onScroll: function(){       
            var scrollTop = this.container[0].scrollTop;
            var beginIndex = Math.floor(scrollTop / this.viewHeight);
            var firstShownItemOffset = scrollTop % this.viewHeight;
            //need to reload data
            if(scrollTop <= this.beginPosition || scrollTop + this.containerHeight >= this.endPosition){
                this.beginPosition = scrollTop - this.containerHeight - firstShownItemOffset;
                if(this.beginPosition < 0){
                    this.beginPosition = 0;
                }
                this.endPosition = this.beginPosition + this.itemHeight;
                if(this.endPosition > this.totalHeight){
                    this.endPosition = this.totalHeight;
                    this.beginPosition = this.totalHeight - this.itemHeight;
                }
                this.header.height(this.beginPosition);
                this.footer.height(this.totalHeight - this.endPosition);
                var startIndex = beginIndex - this.itemCountPerPage;
                var endIndex = beginIndex + this.itemCountPerPage;
                if(startIndex <= 0){
                    startIndex = 0;
                }
                if(endIndex >= this.contactCount - 1 || startIndex + this.viewCount > this.contactCount){
                    startIndex = this.contactCount - this.viewCount;
                }
                this.showContactView(startIndex);
            }
        }
    });
    $(document).ready(function(){
        new ListView().init();
    })
})(window);