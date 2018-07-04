{
    let view = {
        el:'#main',
        template:`
        <div>
            <span class="key">__key__</span>
            <img src="#">
            <span class="editor"></span>
        </div>`,
        init(){
            this.$el = $(this.el);
        },
        render(data){
            console.log(data)
            for(let r =0;r<data.key.length;r++){
                let div = document.createElement('div');
                let $div = $(div).addClass('row');
                this.$el.append($div);
                for(let i=0;i<data.key[r].length;i++){
                    let button = this.template;
                    let $button = $(button).addClass(data.key[r][i]);
                    $button.find('.key').html(data.key[r][i]);
                    $div.append($button);
                    $button.find('.editor').attr('id',data.key[r][i])
                    let key = data.key[r][i];
                    let url = data.url[key]; 
                    this.getIcon($button,url);
                }
            }
        },
        getIcon(target,url){
            if(url){
                target.find('img').attr('src','http://' + url + '/favicon.ico');
            }else{
                target.find('img').attr('src','./img/noicon.png');
            }
            target.find('img').get(0).onerror = function(e){
                e.target.src = './img/noicon.png';
            }
        }
    }

    let model = {
         key:[
           ['1','2','3','4','5','6','7','8','9','0'],
           ['q','w','e','r','t','y','u','i','o','p'],
           ['a','s','d','f','g','h','j','k','l'],
           ['z','x','c','v','b','n','m']
        ],
        url:{
            q:'qq.com',
            w:'weibo.com'
        },
        data:{
    
        },
        getData(name){
            return JSON.parse(localStorage.getItem(name) || 'null');
        },
        setData(){
            localStorage.setItem('database',JSON.stringify(this.data));
        },
        init(){
            var data = this.getData('database');
            if(data){
                this.data = data;
            }else{
                this.setData()
                this.data = {
                    key:this.key,
                    url:this.url
                }
            }
        },
    }

    let controller = {
        init(view,model){
            this.model = model;
            this.view = view;
            this.model.init();
            this.view.init();           
            this.view.render(this.model.data);
            this.bindEvents();
        },
        bindEvents(){
            $(document).on('keypress',(e)=>{
                let key = e['key'];
                let url = this.model.data.url[key];
                window.open('http://' + url, '_blank');
            })
            $('.editor').on('click',(e)=>{
               let key =  e.target.id;
               let url = this.model.url[key];
               let newUrl = prompt('请输入网址');
               this.model.data.url[key] = newUrl;
               this.model.setData();
            })
        }
    }

    controller.init(view,model)
}