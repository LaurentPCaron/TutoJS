import {accessSync, writeFileSync} from "fs"

class UsersRepository{
    filename: string
    constructor(filename:string){
        this.filename=filename
        try {
           accessSync(this.filename) 
        } catch (error) {
            writeFileSync(this.filename,'[]')
        }
        

    }
}

const repo= new UsersRepository('user.json')
