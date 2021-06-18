import React, { useState }                 from 'react';
import { saveAs }                          from 'file-saver';
import UploadFiles                         from './UploadFiles';
import { DownloadIcon,  TriangleDownIcon } from '@primer/octicons-react';
import { replaceMultipleJSONs }            from '../CLI/utils';

const MultipleReplaces = () => {
    
    const [jsonfiles,    setJsonfiles]    = useState([]);
    const [numReplaces,  setNumReplaces]  = useState(null);
    const [operation,    setOperation]    = useState('equal');
    const [path,         setPath]         = useState('');
    const [replaceValue, setReplaceValue] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    
    const replace = () => {

        let res = replaceMultipleJSONs(path, currentValue, replaceValue, jsonfiles, operation);

        setJsonfiles(res[0]);
        setNumReplaces(res[1]);
        
    }

    const download = () => {

        jsonfiles.forEach(({name, json}) => {
    
            let fileName = name;
    
            let fileToSave = new Blob([JSON.stringify(json, null, 2)], {
                type: 'application/json',
                name: fileName
            });
            
            saveAs(fileToSave, fileName);
    
        });       
    
    }

    return(
        <div className = 'Multiple'>
            <h2>Replace multiple properties in JSON files at once</h2>
            <p>Select your files (they won't be uploaded to any server), they remain in your browser.</p>
            <UploadFiles
                jsonfiles    = {jsonfiles}
                setJsonfiles = {setJsonfiles}
            />
            { jsonfiles.length > 0
            ? <React.Fragment>
                <h2>Rules</h2>
                <div className = 'Replace'>
                    <span>If</span>
                    <input placeholder = 'property.subproperty' onChange = {e => setPath(e.target.value)} value = {path}/>
                    <div className = 'Selector'>
                        <select value = {operation} onChange = {(e) => setOperation(e.target.value)}>
                            <option value = 'equal'>is equal to</option>
                            <option value = 'greater'>is greater than</option>
                            <option value = 'greater'>is lesser than</option>
                        </select>
                        <TriangleDownIcon/>
                    </div>
                    <input placeholder = 'value' onChange = {e => setCurrentValue(e.target.value)} value = {currentValue}/>
                    <span>replace with</span>
                    <input placeholder = 'new value' onChange = {e => setReplaceValue(e.target.value)} value = {replaceValue}/>
                </div>
                <div className = 'Actions'>
                    <button onClick = {replace}  disabled = {!path || !currentValue || !replaceValue}>Replace</button>
                    <button onClick = {download} disabled = {false}><DownloadIcon/>Download all files</button>  
                </div>
                <div className = 'Alerts'>
                    <div>{numReplaces !== null ? `${numReplaces} fields replaced` : null}</div>                                      
                </div>
              </React.Fragment>
            : null
            }
        </div>
    );
    
}

export default MultipleReplaces;