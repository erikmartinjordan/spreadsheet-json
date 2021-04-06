import React, { useEffect, useState } from 'react';

const Table = ({csv, setCsv, select, setSelect}) => {
    
    const [drag, setDrag] = useState(false);
    const [OS, setOS]     = useState(null);
    
    useEffect(() => {
        
        let macOS = ['iPhone', 'iPad', 'Mac', 'iPod'];
        
        let currentOS = navigator.platform;
        
        let isMac = macOS.some(device => currentOS.includes(device));
        
        if(isMac) 
            setOS('Mac');
        
    }, []);
    
    useEffect(() => {
        
        const onClick = async (e) => {
            
            if(!document.getElementById('Table').contains(e.target))
                setSelect(['', '', '', '']);
            
        }
        
        window.addEventListener('click', onClick);
        
        return () => window.removeEventListener('click', onClick);
      
    }, [select]);
    
    const selectBox = (row, col) => {
        
        setSelect([row, col, row, col]);
        
    }
    
    const handleMouseDown = (e, row, col) => {
        
        setDrag(true);
        setSelect([row, col, row, col]);
        
    }
    
    const handleMouseUp = () => {
        
        setDrag(false);
        
    }
    
    const handleMultipleSel = (e, row, col) => {
        
        e.preventDefault();
        
        if(drag){
            
            let [iniRow, iniCol, endRow, endCol] = select;
            
            if(iniRow <= row && iniCol <= col)
                setSelect([iniRow, iniCol, row, col]);
            
            if(iniRow >= row && iniCol >= col)
                setSelect([row, col, endRow, endCol])
            
        }
        
    }
    
    const editValue = (e, row, col) => {
        
        const copyCsv = [...csv];
        
        copyCsv[row][col] = e.target.value;
        
        setCsv(copyCsv);
        
    }
    
    const getClassName = (row, col) => {
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        if(select.every(el => el === ''))                                             
            return '';
        
        if(row >= iniRow && row <= endRow && col >= iniCol && col <= endCol) 
            return 'Selected';
        
    }
    
    return(
        <div className = 'Table' id = 'Table'>
            <table>
                <tbody>
                    {csv.map((row, i) => 
                        <tr key = {i}>{csv[i].map((column, j) => 
                            <td key           = {j}
                                id            = {i, j}
                                onClick       = {()  => selectBox(i, j)} 
                                onContextMenu = {()  => selectBox(i, j)}
                                onMouseDown   = {(e) => handleMouseDown(e, i, j)}
                                onMouseUp     = {(e) => handleMouseUp(e, i, j)}
                                onMouseMove   = {(e) => handleMultipleSel(e, i, j)}
                                className     = {getClassName(i, j)}>
                                    <input value = {csv[i][j]} onChange = {(e) => editValue(e, i, j)}></input>
                            </td>)}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className = 'Hint'>
                Press <kbd>{OS === 'Mac' ? 'cmd' : 'ctrl'}</kbd> + <kbd>v</kbd> to paste data from a spreadhseet into the table
            </div>
        </div>
    );
    
}

export default Table;