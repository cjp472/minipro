Component({
    properties: {
        innerText: {
            type: String,
            value: "default value"
        }
    },
    data: {
        someData: {}
    },
    methods: {
        customMethod: function() {
            var t = this.data.goods;
            console.log("课程列表页可以获取到 goods_id : " + t);
        }
    }
});