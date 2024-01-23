const fs = require("fs");

const http = require("http");

const url = require("url")

const port = 4600

const replaceTemplate = (template,item) =>{

    let output = template.replace(/{%PRODUCTNAME%}/g,item.productName)

            output = output.replace(/{%IMAGE%}/g, item.image);
            output = output.replace(/{%QUANTITY%}/g, item.quantity);
            output = output.replace(/{%PRICE%}/g, item.price);
            output = output.replace(/{%FROM%}/g, item.from);
            output = output.replace(/{%NUTRIENTS%}/g, item.nutrients);
            output = output.replace(/{%DESCRIPTION%}/g, item.description);
            output = output.replace(/{%ID%}/g, item.id);
            
            if(!item.organic){
                
                output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
        }


return output;

}



const templateOverview =  fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');

const data =  fs.readFileSync('./dev-data/data.json','utf-8');

let dataObjc = JSON.parse(data)

// console.log(dataObjc)


const server = http.createServer((request,response)=>{

        const {query,pathname} = url.parse(request.url,true)

   
   if(pathname === '/' || pathname === '/overview'){
    response.writeHead(200,{
        "Content-type" : "text-html",
    })
        let cardHtml = dataObjc.map(item => replaceTemplate(templateCard,item)).join('')

        // console.log(cardHtml)

   

    let  output = templateOverview.replace('{%CARD%}', cardHtml);

    // console.log(output)

   

    response.end(output)


   }else if (pathname === '/product'){
    console.log(query);
    response.writeHead(200,{
        "Content-type" : "type-json"
    })
    const myProduct = dataObjc[query.id]
    const output = replaceTemplate(templateProduct,myProduct)

    console.log(myProduct);
    response.end(output)


   }else{
    response.writeHead(404,{
        "Content-type" : "text-html"
    })
    response.end("<h1>Page not Found!!</h1>")
   }
})
server.listen(port,()=>{
    console.log(`server is listening in port : ${port} !`)
})