const X = 0;
const O = 1;

let xo = X;

function flipflop()
{
    xo == X ? xo = O : xo = X;
}

function _getAttribute()
{
    return (xo == X ? 'data-x' : 'data-o');
}
function toText()
{
    return (xo == X ? "X" : "O");
}

function addListeners()
{
    document.querySelectorAll('div.card').forEach(function(/**@type {HTMLDivElement}*/el){
        el.addEventListener('mouseenter', function(e) {
            if(!this.children[0].hasAttribute('data-put'))
            {
                this.children[0].innerText = toText();
                this.children[0].setAttribute(_getAttribute(), '');
                this.children[0].setAttribute('data-hover', '');
            }
        });
        el.addEventListener('mouseleave', function(e) {
            if(this.children[0].hasAttribute('data-hover'))
            {
                this.children[0].innerText = '';
                this.children[0].removeAttribute('data-hover');

                if(this.children[0].hasAttribute('data-x'))
                {
                    this.children[0].removeAttribute('data-x');
                }
                if(this.children[0].hasAttribute('data-o'))
                {
                    this.children[0].removeAttribute('data-o');
                }
            }
        });
        el.addEventListener('click', function(e){
            this.children[0].innerText = toText();
            this.children[0].setAttribute(_getAttribute(), '');
            this.children[0].setAttribute('data-put', '');
            flipflop();

            if(this.children[0].hasAttribute('data-hover'))
            {
                this.children[0].removeAttribute('data-hover');
            }

            this.replaceWith(this.cloneNode(true));
        }, {once:true});
    })
}
addListeners();

document.querySelector('button').addEventListener('click', function(){
    document.querySelectorAll('div.card').forEach(function(el){
        el.children[0].innerText = '';
        let attrs = Object.values(el.children[0].attributes);
        for(let i=0; i<attrs.length; i++)
        {
            console.log(attrs[i].name);
            el.children[0].removeAttribute(attrs[i].name);
        }
        xo=X;
        addListeners();
    });
});