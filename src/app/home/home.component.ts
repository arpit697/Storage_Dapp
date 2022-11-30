import { Component, OnInit, ViewChild } from '@angular/core';
import { CONTRACT_ADDRESS } from '../constants/contract.info';
import { ABI } from '../constants/contract.info';
import { BYTE_CODE } from '../constants/contract.info';
import Web3 from 'web3';
import { ALCHEMY_URL_API_KEY } from '../constants/api.end.points';

declare let window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  Storage:any;
  Accounts!:any;
  Result :any;

  
  Deployed = false;
  Balance:any;
  @ViewChild('input') input:any ;
  @ViewChild('gasLimit') gasLimit:any ;
  
  newAccount:any;

  constructor(private web3:Web3) { }

 async ngOnInit() {
    this.web3 = new Web3(window.ethereum);
    this.Storage = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  }

  async Store(){
    if(!(this.Accounts == undefined)){
      let value = await this.Storage.methods.store(this.input.nativeElement.value)
      .send({from: this.Accounts , gas:parseInt(this.gasLimit.nativeElement.value)});
      console.log(value , "Store");
    }
  }
  
  async Retrieve(){
    this.Storage.methods.retrieve().call().then((data:any) =>{
      this.Result = data;
      console.log(data);
    });
  }
  async onConnect(){
    this.web3 = await new Web3(window.ethereum);
    this.Storage = await new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    let account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.Accounts = account[0]
    this.Deployed = true;
  }


  createAccount(){
    let web3Provider = new Web3.providers.HttpProvider(ALCHEMY_URL_API_KEY)
    this.web3 = new Web3(web3Provider)
    let account = this.web3.eth.accounts.create()
    this.web3.eth.accounts.wallet.add(account)
    this.web3.eth.defaultAccount = account.address;
    this.Accounts = account.address;
  }

  getBal(){
    this.web3.eth.getBalance(this.Accounts).then((data:any) =>{
      this.Balance = this.web3.utils.fromWei(data, "ether") + " ETH"
    })
  }

  selectedAccount(event:any){
    this.Accounts = event
  }

  deploy(){
    let contract = new this.web3.eth.Contract(ABI);
    console.log(contract);
    contract.deploy({data:BYTE_CODE})
    .send({from:this.Accounts, gas:parseInt(this.gasLimit.nativeElement.value)})
    .on("receipt" , (receipt:any)=>{
      console.log(receipt);
      this.Deployed = true
      this.Storage = new this.web3.eth.Contract(ABI,CONTRACT_ADDRESS)
    })
  }
}
