/**
 * 与时间有关
 */

const date = new Date('2023-12-20')

const dateFormat = (dateInput, format)=>{
    var day = dateInput.getDate() 
    var month = dateInput.getMonth() + 1  
    var year = dateInput.getFullYear()   
    format = format.replace(/yyyy/, String(year).padStart(4,'0'))
    format = format.replace(/MM/,String(month).padStart(2,'0'))
    format = format.replace(/dd/,String(day).padStart(2, '0'))
    return format
}

// console.log(dateFormat(date, 'yyyy/MM/dd'))


