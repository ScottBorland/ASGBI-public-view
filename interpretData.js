roomsRow = 'null'
rooms = []
speakers = []

speakerSignifierStart = '<'
speakerSignifierEnd = '>'

const findRoomRow = (rows) => {
    rows.forEach((row, index) => {
        if(row[0] == 'Room:'){
            roomsRow = index;
        }    
    })
}

const listRooms = ((rows) => {
    roomsArray = rows[roomsRow]
    roomsArray.forEach((item) => {
        if(item !== 'null' && item !== 'Room:'){
            rooms.push(item)
        }
    })
})

const checkIfRowsLoaded = (rows) => {
    console.log(rows)
}

const createPage = (rows) => {
    console.log(rows)
    retrieveDate(rows)
    findRoomRow(rows)
    listRooms(rows)
    listSpeakers(rows)
    handleEmptyCells(rows)
    convertDatesToInt(rows)
    replaceStringCharacter(rows, '<', '')
    replaceStringCharacter(rows, '>', '')
    createTable(rows)
}

const retrieveDate = (rows) => {
    var date = document.createElement('header')
    var dateAsString = rows[0][1]
    date.innerHTML = dateAsString
    rows = rows.splice(0, 1)
    document.body.appendChild(date)
}

const listSpeakers = ((rows) => {
    rows.forEach((row, index) => {
        row.forEach((item, index) => {
            if(checkStringForCharacter(item, speakerSignifierStart)){
                extractSpeakers(item)
            }
        })
    })
})

function createTable(tableData) {
    var table = document.createElement('table');
    table.id = "programme-table"
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData, index) {
        if(index == 0){return}else{
            var row = document.createElement('tr')
        }
      
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        if(cellData !== null){
            cellData = setCellColor(cell, cellData);
            cell.appendChild(document.createTextNode(cellData));
        }
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

const setCellColor = (cell, cellData) => {
    if(checkStringForCharacter(cellData, '[s]')){
        cell.style.backgroundColor = 'lightgreen'
        cellData = replaceCellCharacter(cellData, '[s]', '')
    }else if (checkStringForCharacter(cellData, '[p]')){
        cell.style.backgroundColor = 'lightblue'
        cellData = replaceCellCharacter(cellData, '[p]', '')
    }else if (checkStringForCharacter(cellData, '[e]')){
        cell.style.backgroundColor = 'tan'
        cellData = replaceCellCharacter(cellData, '[e]', '')
    }else if (checkStringForCharacter(cellData, '[b]')){
        cell.style.backgroundColor = 'plum'
        cell.style.border = '0px solid blue'
        cellData = replaceCellCharacter(cellData, '[b]', '')
    }else if (checkStringForCharacter(cellData, '[v]')){
        cell.style.backgroundColor = 'indianred'
        cellData = replaceCellCharacter(cellData, '[v]', '')
    }else if (checkStringForCharacter(cellData, '[r]')){
        cell.style.backgroundColor = 'slateblue'
        cellData = replaceCellCharacter(cellData, '[r]', '')
    }else if(checkStringForCharacter(cellData, '[n]')){
        cellData = replaceCellCharacter(cellData, '[n]', '')
    }
    return cellData
}

const findCellType = (cell) => {
    var cellType
    if(checkStringForCharacter(cell, '[s]')){
        cellType = '[s]'
    } else if(checkStringForCharacter(cell, '[b]')){
        cellType = ''
    } else if(checkStringForCharacter(cell, '[e]')){
        cellType = '[e]'
    } else if(checkStringForCharacter(cell, '[r]')){
        cellType = '[r]'
    } else if(checkStringForCharacter(cell, '[v]')){
        cellType = '[v]'
    } else if(checkStringForCharacter(cell, '[p]')){
        cellType = '[p]'
    }else if(checkStringForCharacter(cell, '[r]')){
        cellType = '[r]'
    }  
    else{
        cellType = ''
    }
    return cellType
}

const handleGlobalRows = (rows) => {
    rows.forEach((row, index) => {
        var rowsIndex = index
        row.forEach((item, index) => {
            if(checkStringForCharacter(item, '[b]')){
                if(index == 1){
                    moveToMiddleCell(item, rows, rowsIndex)
                    rows[rowsIndex][index] = '[b]'
                }              
                for (var i=1; index+i < row.length; i++)
                if(rows[rowsIndex][index+i] == null){
                    rows[rowsIndex][index+i] = '[b]'
                }
            }
        })
    })
}

const moveToMiddleCell = (item, rows, rowsIndex) => {
    var middleIndex = Math.floor(rows[rowsIndex].length/2);
    rows[rowsIndex][middleIndex] = item
}

const handleEmptyCells = (rows) => {
    rows.forEach((row, index) => {
        var rowsIndex = index
        row.forEach((item, index) => {
            if(item === null){
                if(rowsIndex != 0){
                    var cellType = findCellType(rows[rowsIndex-1][index])
                    rows[rowsIndex][index] = cellType
                }
            }
        })
    })
}


const extractSpeakers = (item) => {
    const startIndex = item.indexOf(speakerSignifierStart) + 1
    const endIndex = item.indexOf(speakerSignifierEnd) 
    let speaker = item.slice(startIndex, endIndex)
    speakers.push(speaker)
    const newItem = item.slice(endIndex+1)
    if(checkStringForCharacter(newItem, speakerSignifierStart)){
        extractSpeakers(newItem)
    }
}

const printRooms = (rooms) => {
    
    ul = document.createElement('ul');
    title = document.createElement('header')
    
    document.getElementById('speakerlistholder').appendChild(title);
    document.getElementById('speakerlistholder').appendChild(ul);
    
    rooms.forEach(room => {
    let li = document.createElement('li');
    ul.appendChild(li);
    title.innerHTML += 'Speakers: '
    li.innerHTML += room;
    });
}

const printSpeakers = (speakers) => {

    title = document.createElement('header')
    
    document.body.appendChild(title);
    
    ul = document.createElement('ul');
    
    document.body.appendChild(ul);
    
    speakers.forEach(speaker => {
    let li = document.createElement('li');
    ul.appendChild(li);
    title.innerHTML = 'Speakers: '
    li.innerHTML += speaker;
    });
}









