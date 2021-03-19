import React              from 'react';
import { ArrowRightIcon } from '@primer/octicons-react';

const TransformButton = ({csv, json, setJson}) => {
    
    const transformToJSON = async () => {
        
        let json = {};
        
        setJson({'Generating JSON': 'Wait a few seconds...'});
        
        csv.forEach((row, i) => {
            csv[i].forEach((column, j) => {
                
                if(i > 0 && j === 0){
                    
                    let key = csv[i][j];
                    
                    json[key] = {};
                    
                }
                
                if(i > 0 && j > 0){
                    
                    let properties = csv[0][j];
                    let value = csv[i][j];
                    
                    let lastKey = Object.keys(json).pop();
                    let ref = json[lastKey];
                    
                    let arrayProperties = properties.split('.');
                    
                    let last = arrayProperties.pop();
                    
                    arrayProperties.forEach(property => {
                        
                        ref[property] = ref[property] || {};
                        ref = ref[property];
                        
                    });
                    
                    let stringOrNumber = isNaN(value) ? value : parseFloat(value);
                    
                    ref[last] = stringOrNumber || '';
                    
                }
            })
        });
        
        let duplicateKeys = Object.keys(json).length !== csv.length - 1;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if(duplicateKeys){
            
            setJson({'Error': 'JSON has duplicate keys'});
            
        }
        else{
            
            setJson(json);
            
        }
        
    }
    
    return(
        <button onClick = {transformToJSON}>
            <ArrowRightIcon/>Generate JSON
        </button>
    );
    
}

export default TransformButton;