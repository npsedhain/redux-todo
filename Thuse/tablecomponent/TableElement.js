import {LitElement,html} from "lit-element";
import {data} from './dataObject.js';



class TableElement extends LitElement
{
    constructor(){
        super();
        this.mainRows=[];
        this.insideRows=[];
    }
    maxRows()
    {
        for(var k=0;k<data.length;k++)
        {
            let rows=Object.values(data[k])[0].length;
            this.mainRows.push(rows);
            let content=Object.values(data[k])[0]
            //console.log(content);
            let insideRow=content[0].value;
            if(Array.isArray(insideRow)){
                this.insideRows.push(insideRow.length)
            }
            else
            {
                this.insideRows.push(1);
            }
            
            }
    }
    
    render(){
        let uni = html`<tr>${"Nadim"}</tr>`;
        let x;
        let y;
        let content;
        let containerArray=[];
        let rowArray=[];
        this.maxRows();
        console.log(this.mainRows);
        console.log(this.insideRows)

 
        for(let i=0;i<Math.max(...this.mainRows);i++){
            rowArray=[];
             for(var k=0;k<data.length;k++){
                let check= Object.values(data[k])[0];
                if(check[i]!=undefined){
                    content=Object.values(check[i])[0];
                    if(!Array.isArray(content)){
                        x= html`<tr rowspan=${Math.max(...this.insideRows)}><td>${content}</td></tr>`
                        rowArray.push(content);
                        console.log(content);
                    }
                    else{
                            rowArray.push(content);
                            // if(content[l]!=undefined){
                            //     y=html`<tr rowspan=1><td>${content[l].innerValue}</td></tr>`
                            //     console.log(content[l].innerValue);
                            // }
                        
                    }
                    
                    
                }
             }
             
        
             //console.log(rowArray)
             containerArray.push(rowArray);
             

         }
        // console.log(containerArray);

        return html` 
        <style>
        :host{
            display:block;
        }
        table
        {
        border: 1px;
        background-color: black;
        border-spacing: 1px;
        margin: 0 auto 0 auto;
        }
        table thead th
        {
            background-color: white;
            border: #000 0px solid;
            padding: 5px;
            margin: 1px;
        }
         table tbody td
        {
        background-color: #fff;
        border: #000 0px solid;
        padding: 2px;
        }

        th{
            width:200px;
            line-height:60px;
            
        }
        td{
            width:200px;
            
            
        }
        *{
            margin:0;
            padding:0;
        }
        </style>
        
        
        <table>
        <thead>
        <tr>
        
            ${data.map(data=>{
                
                return html`<th>${Object.keys(data)[0]}</th>`;
                
            })}
        </tr>
        </thead>
        <tbody>
            ${containerArray.map(array=>{
        
                let range = new Array(Math.max(...this.insideRows) - 1).fill(0);
        
                let arrayCols = [];
                return html`
                <tr>${array.map(col => {
                    //console.log(col);
                    if(Array.isArray(col)){
                        arrayCols.push(col);
                        return html`<td>${col[0].innerValue}</td>`;
                    }else{
                        return html`<td rowspan="${Math.max(...this.insideRows)}">${col}</td>`;
                    }
                })}</tr>
                ${
                    range.map((val, index) => {
                        
                        return html `<tr>${arrayCols.map(col => {
                            return html`<td>${col[index + 1] ? col[index + 1].innerValue : "-"}</td>`;
                        })}</tr>`
                    })

                }`
            })}
           </tbody>
         </table>
        `
    }

}

customElements.define('table-element',TableElement);


// ${array.map(innerArray=>{
//     if(!Array.isArray(innerArray))
//     {
//         return html`<tr rowspan="${Math.max(...this.insideRows)}"><td>${innerArray}</td></tr>`
//     }
//     else{
//         if(innerArray!=undefined){
//             return html`${innerArray.map(innerContent=>{
//                 return html`<tr rowspan="${Math.min(...this.insideRows)}"><td>${innerContent.innerValue}<td></tr>`
//             })
//         }`
//         }
//     }
// })}