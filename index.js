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


return output;

}



const templateOverview =  fs.readFileSync(`${__dirname}/templates/overview.html`);
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');

const data =  fs.readFileSync('./dev-data/data.json','utf-8');

let dataObjc = JSON.parse(data)

// console.log(dataObjc)


const server = http.createServer((request,response)=>{
   const pathName = request.url
   if(pathName === '/' || pathName === '/overview'){

        let el = dataObjc.map(item => item)

       let x = replaceTemplate(templateCard,el)

       console.log(x)

    let  output = templateOverview.replace(`{%CARD%}`, templateCard);
    console.log(output)

    response.writeHead(200,{
        "Content-type" : "text-html",
    })

    response.end(templateOverview)


   }else if (pathName === '/product'){
    response.writeHead(200,{
        "Content-type" : "type-json"
    })

    response.end(templateProduct)


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