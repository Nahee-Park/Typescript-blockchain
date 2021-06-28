import * as CryptoJS from "crypto-js";
class Block{
  // 암호화된 해쉬 계산
  static calculateBlockHash = (    
    index: number,
    previousHash: string,
    timestamp: number,
    data: string):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  // 블록 하나가 유효한 타입들을 가지는지 체크 
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";  

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  constructor(   
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number){
       this.index = index;
       this.hash = hash;
       this.previousHash = previousHash;
       this.data = data;
       this.timestamp = timestamp;
     }
}

// block 하나의 값을 생성
const genesisBlock:Block = new Block(0, "234243242", "", "Hello", 123456)

// Block 타입을 넣은 블록체인 배열 
let blockchain: Block[] = [genesisBlock];

// 블록체인 반환 함수 
const getBlockchain = (): Block[] => blockchain;

// 가장 최근의 블록 반환 함수
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// 현재시간 반환 함수 
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string): Block =>{
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index+1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  )
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
}

// 특정 블럭의 해쉬값을 구하는 함수 static 함수로 되어 있어서 Block.calculateBlockHash에 접근 가능 
const getHashBlock = (aBlock: Block): string => Block.calculateBlockHash(
  aBlock.index,
  aBlock.previousHash,
  aBlock.timestamp,
  aBlock.data
)

const isBlockValid = (candidateBlock: Block, previousBlock: Block) :Boolean =>{
  // 그 블럭 자체가 유효한 꼴인지
  if(!Block.validateStructure(candidateBlock)){
    return false;
    // 이전 블럭와 현재 블럭의 인덱스 올바른지 
  }else if(previousBlock.index+1 !== candidateBlock.index){
    return false;
    //이전 블럭 해쉬가 현재 블럭의 이전 해쉬와 같은지
  }else if(previousBlock.hash !== candidateBlock.previousHash){
    return false;
    //해쉬 계산값 맞나 검증 
  }else if(getHashBlock(candidateBlock)!=candidateBlock.hash){
    return false;
  }else{
    return true;
  }
}

//현재 블럭이 조건에 맞는다면 push함 
const addBlock = (candidateBlock: Block):void => {
  if(isBlockValid(candidateBlock, getLatestBlock())){
    blockchain.push(candidateBlock);
  }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};