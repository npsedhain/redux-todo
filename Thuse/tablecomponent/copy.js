import {LitElement,html} from "lit-element";
import {data} from './dataObject.js';

class RowElement extends LitElement
{
     static get properties(){
        return {row:Array,
        maxInnerRow: Number}
    }

    render()
    {
        let range = new Array(this.maxInnerRow - 1).fill(0);
        
        let arrayCols = [];
        return html`<tr>${this.row.map(col => {
            //console.log(col);
            if(Array.isArray(col)){
                arrayCols.push(col);
                return html`<td>${col[0].innerValue}</td>`;
            }else{
                return html`<td rowspan="${this.maxInnerRow}">${col}</td>`;
            }
        })}</tr>
        ${
            range.map((val, index) => {
                
                return html `<tr>${arrayCols.map(col => {
                    return html`<td>${col[index + 1] ? col[index + 1].innerValue : "-"}</td>`;
                })}</tr>`
            })
        }
        `;

         
        
    }

}

customElements.define('row-elm',RowElement);

// for(var i = 0; i < data[0].TestArticle.length; i++){
//     <tr>
//     var multipleDataCols = [];
//     for(var j = 0; j < nCols; j++){
//         if(Array.isArray(data[j][i]) && !firstMultipleData){
//             nMultipleDataCols.push(j);
//             <td>data[j][i][0]</td>   
//         }else{
//             <td rowspan=4>data[j][i]</td>
//         }
//     }
//     </tr>
//     for(var l = 1; l < 4; l++){
//         <tr>
//         for(var k = 1; k < multipleDataCols.length; k++){
//             <td>data[k][i][l]</td>
//         }
//         </tr>
//     }
// }



{/* <tr>
        <td>
        ${data.map(data=>{
            
            let value=Object.values(data)[0];
            return html`${
            value.map(innerValue=>{
                let anotherValue=Object.values(innerValue)[0];
                console.log(anotherValue);
                if(Array.isArray(anotherValue)!=true){
                    return html`<tr>
                        <td>${Object.values(innerValue)}</td>
                    </tr>`
                }
                if(Array.isArray(anotherValue)==true){
                    return html`
                    ${anotherValue.map(finalContent=>{
                        console.log(Object.values(finalContent)[0]);
                        return html`<tr><td>
                        ${Object.values(finalContent)[0]}
                    </td></tr>`
                    })}`
                }
            })}`

        })}
        </td>
        </tr> */}