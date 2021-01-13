"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("\n    <div>\n        <form method=\"POST\">\n            <input name=\"email\" placeholder=\"email\"/>\n            <input name=\"password\" placeholder=\"password\"/>\n            <input name=\"passwordConfirmation\" placeholder=\"password confirmation\"/>\n            <button>Sign Up</button>\n        </form>\n    </div>\n    ");
});
//Manual middleware
/* const bodyParser=(req:any,res:any,next:any)=>{
    if(req.method==='POST'){
    req.on('data', (data:any)=>{
        const parsed:[String]=data.toString('utf8').split('&');
        const formData:{[key:string]:string}={}
        for (const pair of parsed) {
            const [key ,value]:string[]=pair.split('=')
            formData[key]=value;
        }
        req.body=formData
        next()
    })}else{
        next()
    }
    
} */
app.post('/', function (req, res) {
    console.log(req.body);
    res.send('Fartwhisle');
});
app.listen(3000, function () {
    console.log('J\'técoute');
});
