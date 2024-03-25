import fs from 'fs'

async function main(){
    const packageJsonBuffer = fs.readFileSync('./package.json')
    const packageJson = JSON.parse(packageJsonBuffer.toString())
    packageJson.version = packageJson.version.split('.').map((element: any, index: number)=>{
        element = Number.parseInt(element)
        let newElement = element
        if (index === 1){
            return newElement = element + 1
        }
        return newElement.toString()
    }).reduce((accumulator: any, currentValue: any)=>{
        if (accumulator === ''){
            return currentValue
        }
        return accumulator + '.' + currentValue
    }, '')
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
}

main()