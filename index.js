//setup of cdn testing

/*
const include = () => {
    var tags, elem, temp, file 

    tags = document.querySelectorAll("*[include]").forEach( elem => {
        file = elem.getAttribute('include')
        fetch('/Email%20Components/' + file + '.html')
        .then( res => { return res.text() })
        .then( html => {
            temp = document.createElement('template');
            temp.innerHTML = html.trim();
            temp = temp.content.firstChild
           // elem.removeAttribute('include')

            elem.parentNode.replaceChild(temp,elem)
        })
    })

}


const menu = document.createElement('div')
menu.style= 'width:100%; height:20px;background-color:#444;text-align:center;color:white'
menu.innerHTML = 'Download'
menu.addEventListener('click', evt => {
    
    document.querySelectorAll('script').forEach( s => {document.body.removeChild(s)})
    document.body.removeChild(menu);
    const x = new XMLSerializer().serializeToString(document)
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    const a = document.createElement('a')
    a.setAttribute('download', filename )
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(x))
    document.body.appendChild(a)

     a.click();

})
document.body.prepend(menu, document.body.firstChild)

//initiate
include()

*/

/////////////////////

document.querySelectorAll("template").forEach( t => {
    customElements.define(t.id, 
        class extends HTMLElement{
            constructor(){
                super()
                let inner = this.innerHTML

                let template = t
                let content = t.content.cloneNode(true)
               
              
                content.querySelectorAll('[name=slot]').forEach( s=> {
                    s.innerHTML = inner;
                    s.removeAttribute('name')
                })
                        
                let data = Array.from(this.attributes)
                    .map(a => [a.name, a.value])
                    .reduce((acc, attr) => {
                        
                        acc[attr[0]] = attr[1]
                        return acc
                    },{})
                  
               
                data.slot = inner

                content.querySelectorAll('*').forEach( n => {
                    n.innerHTML = n.innerHTML.replace(/{{(.*?)}}/g, (match)=> {
                       return data[match.split(/{{|}}/).filter(Boolean)[0]] 
                    })

                    Object.keys(data).forEach( k => {
                        if(n.getAttribute(k)){
                        n.setAttribute(k ,  n.getAttribute(k).replace(/{{(.*?)}}/gi, (match)=> {
                            console.log(match)
                            return data[match.split(/{{|}}/).filter(Boolean)[0]] })
                        )
                        n.removeAttribute(k)
                        }
                    })
                })

                
               let c = this.parentElement.replaceChild(content, this)
            }
        }
    )
    t.parentNode.removeChild(t)
})


document.querySelectorAll("script").forEach( s => { 
    s.parentNode.removeChild(s)
})
