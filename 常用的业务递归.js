function getRoad(){
    let length = 5;
    let arr = [
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
    ];
    let recordArr = new Array(5);

    console.log(recordArr )
    for(var i = 0;i < recordArr.length; i++){
        recordArr[i] = new Array(5); 
    }
    let path = [];
    debugger
    let findARoad =function( row, column, arr=[], path, recordArr){
        if (row > arr.length-1 ||  column > arr.length-1 || column<0 || row <0  || arr[row][column] == 1 || recordArr[row][column] == 1) {
            return;
        }
        path.push([row,column]);
        // console.log( path)
        recordArr[row][column] = 1;
        if(row == arr.length -1 && column == arr.length -1){
            return;
        }
       
        findARoad(row, column+1, arr, path, recordArr)
        findARoad(row+1, column, arr, path, recordArr)
        findARoad(row-1, column, arr, path, recordArr)
        findARoad(row, column-1, arr, path, recordArr)

        path.pop()
        recordArr[row][column] = 0;
        console.log( path )
    }
    findARoad(0, 0, arr, path, recordArr)
    console.log( path )
}


// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                     // 结果 ,,,
//                 ]
//             }
//         ]
//     }
// ]

  
// let arr = [
//     {id: 1, name: '部门1', pid: 0},
//     {id: 2, name: '部门2', pid: 1},
//     {id: 3, name: '部门3', pid: 1},
//     {id: 4, name: '部门4', pid: 3},
//     {id: 5, name: '部门5', pid: 4},
// ]


// function arrayToTrees( arr ){
//     let arrMap = new Map();
//     let result = [];
//     for (item of arr) {
//         debugger
//         const { id, pid } = item;
//         if ( arrMap.get(id) ) {
//             arrMap.set(id, {...item, children: arrMap.get(id).children})
//         }else{
//             arrMap.set(id, {...item, children: []})
//         }
//         if( pid ==0 ) {
//             result.push( arrMap.get(id))
//         } else {

//             let parent = arrMap.get( pid ) ;
//             if( !parent ){
//                 arrMap.set(pid, { children: []})
//             }
//             arrMap.get( pid ).children.push(  arrMap.get( id ) )
//         }
//     }
  
// }



// let arrayToTree = function(items) {
//     const result = [];   // 存放结果集
//     const itemMap = {};  // 
//     for (const item of items) {
//         debugger
//         const id = item.id;
//         const pid = item.pid;
//         if (!itemMap[id]) {
//             itemMap[id] = {
//             children: [],
//             }
//         }
//         itemMap[id] = {
//             ...item,
//             children: itemMap[id]['children']
//         }
//         const treeItem =  itemMap[id];
//         if (pid === 0) {
//             result.push(treeItem);
//         } else {
//             if (!itemMap[pid]) {
//                 itemMap[pid] = {
//                     children: [],
//                 }
//             }
//             itemMap[pid].children.push(treeItem)
//         }
//     }
//     return result;
// }
  






// package com.company;

// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;

// public class FindRoad {

//     static List<List<Integer>>  res=new ArrayList();

//     public static void findARoad(int row, int column, int[][] maze, List<List<Integer>> path,int[][] index){
//         if(row<0||row>=maze.length||column<0||column>=maze[0].length||maze[row][column]==1||index[row][column]==1){
//             return;
//         }

//         path.add(Arrays.asList(row,column));
//         index[row][column]=1;
//         if(row==maze.length-1&&column==maze[0].length-1){
//             res.addAll(path);
//             return;
//         }
//         findARoad(row+1,column,maze,path,index);
//         findARoad(row-1,column,maze,path,index);
//         findARoad(row,column+1,maze,path,index);
//         findARoad(row,column+1,maze,path,index);
//         path.remove(path.size()-1);
//         index[row][column]=0;
//     }

//     public static void main(String[] args) {

//         List<List<Integer>> path=new ArrayList<>();
//         findARoad(0,0,new int[][]{{0, 1, 0, 0, 0},{0, 1, 1, 1, 0},{0, 0, 0, 0, 0},{0, 1, 1, 1, 0},{0, 0, 0, 1, 0}},path,new int[5][5]);
//     }
// }

//https://juejin.cn/post/6983904373508145189
let arr = [
    { id: "1", name: "zs", age: 18, children: [
      {
        id: "2", name: "lisi", age: 18,children:[
          { id: "3", name: "lisi", age: 18 }
        ]
      }
    ]}
  ];
 
  
  let flatArr = ( arr )=>{
    let result = [];
    let  repeat = ( arr )=>{
      arr.map( item=>{
        result.push( item);
        if ( Array.isArray( item.children ) ) {
          repeat( item.children )
        }
      } )
    }
    repeat( arr );
    return result;
  }


   
  // let flatArr = ( arr )=>{
  //   return arr.reduce(( result, item )=>{
  //       result.push( item);
  //       result = result.concat(  Array.isArray(item.children) ?  flatArr( item.children ) : [] ) 
  //       return result
  //   }, [])
  // }