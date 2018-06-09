const API = 'ajax/data.json';

new Vue({
    el: "#app",
    data: {
        input: '',
        lists: [],
    },
    methods: {
        sendList(){
            this.lists.push( this.input );
            this.input = '';
        },
        removeTodo(ind){
            this.lists.splice(ind, 1);
        },
        // submit(){
        //     this.loading = true;
        //     this.isActive = false;
        //     this.result = {};

        //     window.scrollTo(0,document.body.scrollHeight);

        //     axios.post(API, {
        //         email: this.mail,
        //     }).then( response => {
        //         this.loading = false;
        //         this.isActive = true;

        //         this.result = response.data;
        //         this.result.mail = this.mail;
        //     });
        // }
    },
    computed: {
        // time(){
        //     const date = new Date( this.result.timeStamp );
        //     const timeTxt = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        //     return timeTxt;
        // }
    },
    mounted() {
        axios.get(API).then( res => this.lists = res.data );
    }
});